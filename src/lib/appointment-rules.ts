import {
  ISTANBUL_TIMEZONE,
  SAME_DAY_CUTOFF_HOUR,
  SLOT_INTERVAL_MINUTES,
  WORKING_HOURS,
} from "@/lib/appointment-config";

export type SlotState = "available" | "full";

export type Slot = {
  time: string;
  state: SlotState;
};

export function formatDateToTr(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ISTANBUL_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function nowInIstanbulParts(baseDate = new Date()) {
  const parts = new Intl.DateTimeFormat("tr-TR", {
    timeZone: ISTANBUL_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(baseDate);

  const toNumber = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);

  return {
    year: toNumber("year"),
    month: toNumber("month"),
    day: toNumber("day"),
    hour: toNumber("hour"),
    minute: toNumber("minute"),
    weekdayLabel: parts.find((p) => p.type === "weekday")?.value?.toLowerCase() ?? "",
  };
}

export function parseTimeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export function toDateAtUtcMidnight(dateString: string): Date {
  return new Date(`${dateString}T00:00:00.000Z`);
}

export function isSunday(dateString: string): boolean {
  const day = new Date(`${dateString}T12:00:00.000Z`).getUTCDay();
  return day === 0;
}

export function getWorkingRange(dateString: string): { start: string; end: string } | null {
  if (isSunday(dateString)) {
    return null;
  }

  const day = new Date(`${dateString}T12:00:00.000Z`).getUTCDay();
  if (day === 6) {
    return WORKING_HOURS.saturday;
  }

  return WORKING_HOURS.weekday;
}

export function generateSlotsForDate(dateString: string): string[] {
  const range = getWorkingRange(dateString);
  if (!range) {
    return [];
  }

  const slots: string[] = [];
  let current = parseTimeToMinutes(range.start);
  const end = parseTimeToMinutes(range.end);

  while (current < end) {
    const hour = Math.floor(current / 60)
      .toString()
      .padStart(2, "0");
    const minute = (current % 60).toString().padStart(2, "0");
    slots.push(`${hour}:${minute}`);
    current += SLOT_INTERVAL_MINUTES;
  }

  return slots;
}

export function validateAppointmentDateAndTime(dateString: string, time: string, nowDate = new Date()) {
  const now = nowInIstanbulParts(nowDate);
  const todayString = `${now.year}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`;

  if (isSunday(dateString)) {
    return { valid: false, message: "Pazar günü randevu alınmamaktadır." };
  }

  if (dateString < todayString) {
    return { valid: false, message: "Geçmiş tarih için randevu oluşturulamaz." };
  }

  if (dateString === todayString && now.hour >= SAME_DAY_CUTOFF_HOUR) {
    return {
      valid: false,
      message: "Saat 13:00 sonrası aynı gün randevusu kapalı. En erken yarın için alabilirsiniz.",
    };
  }

  const slots = generateSlotsForDate(dateString);
  if (!slots.includes(time)) {
    return { valid: false, message: "Seçilen saat çalışma saatleri dışında." };
  }

  if (dateString === todayString) {
    const selectedMinutes = parseTimeToMinutes(time);
    const nowMinutes = now.hour * 60 + now.minute;
    if (selectedMinutes <= nowMinutes) {
      return { valid: false, message: "Geçmiş saat için randevu oluşturulamaz." };
    }
  }

  return { valid: true, message: "OK" };
}
