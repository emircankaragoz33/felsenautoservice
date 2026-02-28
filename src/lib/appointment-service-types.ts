export const APPOINTMENT_SERVICE_TYPES = [
  "Arıza Teşhis ve Onarımı",
  "Ön Takım ve Süspansiyon",
  "Fren Sistemleri Bakım ve Onarımı",
  "Klima Bakım ve Onarım",
  "Fenni Muayene Öncesi Hazırlık",
  "Rot Balans",
  "Akü",
  "Lastik",
  "Cam Filmi Uygulamaları",
  "Folyo Kaplama & PPF",
  "Seramik Kaplama",
  "Detaylı İç Temizlik & Kuaför",
  "Motor Temizliği ve Koruma",
  "Klima Temizliği",
] as const;

export type AppointmentServiceType = (typeof APPOINTMENT_SERVICE_TYPES)[number];
