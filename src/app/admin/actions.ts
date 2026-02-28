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
