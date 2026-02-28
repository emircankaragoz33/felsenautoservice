import { NextResponse } from "next/server";

import { generateSlotsForDate, isSunday, validateAppointmentDateAndTime } from "@/lib/appointment-rules";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ message: "Geçerli bir tarih gerekli (YYYY-MM-DD)." }, { status: 400 });
  }

  if (isSunday(date)) {
    return NextResponse.json({ date, slots: [], message: "Pazar günleri servis kapalı." });
  }

  const baseSlots = generateSlotsForDate(date);

  const taken = await prisma.appointment.findMany({
    where: {
      date: new Date(`${date}T00:00:00.000Z`),
    },
    select: {
      time: true,
    },
  });

  const takenSet = new Set(taken.map((item: { time: string }) => item.time));

  const slots = baseSlots.map((time) => {
    const validation = validateAppointmentDateAndTime(date, time);
    if (!validation.valid || takenSet.has(time)) {
      return { time, state: "full" as const };
    }

    return { time, state: "available" as const };
  });

  return NextResponse.json({ date, slots });
}
