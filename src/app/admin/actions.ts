"use server";

import { AppointmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateAppointmentStatus(formData: FormData) {
  const appointmentId = String(formData.get("appointmentId") ?? "");
  const status = String(formData.get("status") ?? "") as AppointmentStatus;

  if (!appointmentId || !["pending", "approved", "cancelled"].includes(status)) {
    throw new Error("Gecersiz durum guncelleme istegi.");
  }

  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status },
  });

  revalidatePath("/admin");
}

export async function deleteAppointment(formData: FormData) {
  const appointmentId = String(formData.get("appointmentId") ?? "");

  if (!appointmentId) {
    throw new Error("Gecersiz silme istegi.");
  }

  await prisma.appointment.delete({
    where: { id: appointmentId },
  });

  revalidatePath("/admin");
}

export async function logoutAdmin() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function blockAppointmentSlot(formData: FormData) {
  const dateStr = String(formData.get("date") ?? "");
  const timeStr = String(formData.get("time") ?? "");

  if (!dateStr || !timeStr) {
    throw new Error("Tarih ve saat gerekli.");
  }

  // Ensure unique constraint check or catch it
  try {
    await prisma.appointment.create({
      data: {
        name: "Sistem Kaydı (Manuel Kapalı)",
        phone: "-",
        email: "-",
        plate: "KAPALI",
        carModel: "KAPALI",
        serviceType: "Manuel Kapatılan Randevu",
        date: new Date(`${dateStr}T00:00:00.000Z`),
        time: timeStr,
        status: "approved",
      },
    });
  } catch (error) {
    throw new Error("Bu saat dilimi zaten dolu veya kapatılmış.");
  }

  revalidatePath("/admin");
}
