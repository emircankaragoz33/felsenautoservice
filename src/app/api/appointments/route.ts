import { AppointmentStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { sendAppointmentConfirmationEmail } from "@/lib/mailer";
import { APPOINTMENT_SERVICE_TYPES } from "@/lib/appointment-service-types";
import {
  formatDateToTr,
  toDateAtUtcMidnight,
  validateAppointmentDateAndTime,
} from "@/lib/appointment-rules";

const appointmentBodySchema = z.object({
  name: z.string().min(3).max(80),
  phone: z.string().min(10).max(20),
  email: z.string().email(),
  plate: z.string().min(5).max(16),
  carModel: z.string().min(2).max(80),
  serviceType: z.enum(APPOINTMENT_SERVICE_TYPES),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = appointmentBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Form verileri geçersiz.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const payload = {
      ...parsed.data,
      name: parsed.data.name.trim(),
      phone: parsed.data.phone.trim(),
      email: parsed.data.email.trim().toLowerCase(),
      plate: parsed.data.plate.trim().toUpperCase(),
      carModel: parsed.data.carModel.trim(),
      serviceType: parsed.data.serviceType,
    };

    const validation = validateAppointmentDateAndTime(payload.date, payload.time);
    if (!validation.valid) {
      return NextResponse.json({ message: validation.message }, { status: 400 });
    }

    const appointmentDate = toDateAtUtcMidnight(payload.date);

    const created = await prisma.appointment.create({
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        plate: payload.plate,
        carModel: payload.carModel,
        serviceType: payload.serviceType,
        date: appointmentDate,
        time: payload.time,
        status: AppointmentStatus.pending,
      } as any,
    });

    let emailSent = true;
    try {
      await sendAppointmentConfirmationEmail({
        to: payload.email,
        name: payload.name,
        date: formatDateToTr(created.date),
        time: created.time,
        plate: created.plate,
        carModel: created.carModel,
        serviceType: payload.serviceType,
      });
    } catch (emailError) {
      emailSent = false;
      console.error("Appointment confirmation email error", emailError);
    }

    return NextResponse.json(
      {
        message: emailSent
          ? "Randevunuz başarıyla oluşturuldu. Onay e-postası gönderildi."
          : "Randevunuz başarıyla oluşturuldu. E-posta gönderimi şu an yapılamadı.",
        appointmentId: created.id,
        emailSent,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ message: "Seçilen tarih ve saat dolu. Lütfen farklı bir slot seçin." }, { status: 409 });
    }

    console.error("Appointment create error", error);
    return NextResponse.json({ message: "Randevu oluşturulurken beklenmeyen bir hata oluştu." }, { status: 500 });
  }
}
