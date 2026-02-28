import { NextResponse } from "next/server";

import { formatDateToTr, toDateAtUtcMidnight } from "@/lib/appointment-rules";
import { sendAppointmentReminderEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ReminderCandidate = {
  id: string;
  name: string;
  email: string;
  plate: string;
  carModel: string;
  serviceType?: string;
  date: Date;
  time: string;
  reminderSentAt: Date | null;
};

function getIstanbulDateString(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getAppointmentDateTime(date: Date, time: string): Date {
  const dateString = getIstanbulDateString(date);
  return new Date(`${dateString}T${time}:00+03:00`);
}

function isAuthorized(request: Request): boolean {
  const secret = process.env.APPOINTMENT_REMINDER_SECRET ?? process.env.CRON_SECRET;
  if (!secret) {
    return false;
  }

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

async function runReminderJob(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Yetkisiz istek." }, { status: 401 });
  }

  const now = new Date();
  const targetWindowStart = new Date(now.getTime() + 6 * 60 * 60 * 1000);
  const targetWindowEnd = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  const startDate = toDateAtUtcMidnight(getIstanbulDateString(targetWindowStart));
  const endDate = toDateAtUtcMidnight(getIstanbulDateString(targetWindowEnd));

  const candidates = (await prisma.appointment.findMany({
    where: {
      status: {
        in: ["pending", "approved"],
      },
      reminderSentAt: null,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: [{ date: "asc" }, { time: "asc" }],
  })) as ReminderCandidate[];

  let sent = 0;
  let failed = 0;

  for (const appointment of candidates) {
    const appointmentDateTime = getAppointmentDateTime(appointment.date, appointment.time);
    if (appointmentDateTime < targetWindowStart || appointmentDateTime >= targetWindowEnd) {
      continue;
    }

    try {
      await sendAppointmentReminderEmail({
        to: appointment.email,
        name: appointment.name,
        date: formatDateToTr(appointment.date),
        time: appointment.time,
        plate: appointment.plate,
        carModel: appointment.carModel,
        serviceType: appointment.serviceType ?? "Belirtilmedi",
      });

      await prisma.appointment.update({
        where: { id: appointment.id },
        data: { reminderSentAt: new Date() },
      });

      sent += 1;
    } catch (error) {
      failed += 1;
      console.error("Appointment reminder email error", {
        appointmentId: appointment.id,
        error,
      });
    }
  }

  return NextResponse.json({
    message: "Hatırlatma kontrolü tamamlandı.",
    windowStart: targetWindowStart.toISOString(),
    windowEnd: targetWindowEnd.toISOString(),
    candidates: candidates.length,
    sent,
    failed,
  });
}

export async function GET(request: Request) {
  return runReminderJob(request);
}

export async function POST(request: Request) {
  return runReminderJob(request);
}
