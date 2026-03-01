import { NextResponse } from "next/server";
import { z } from "zod";

import { getEnv } from "@/lib/env";
import { APPOINTMENT_SERVICE_TYPES } from "@/lib/appointment-service-types";
import { WORKING_HOURS } from "@/lib/appointment-config";

const chatbotBodySchema = z.object({
  message: z.string().min(1).max(1500),
});

export const runtime = "nodejs";

const SITE_KNOWLEDGE_BASE = `
FELSEN SERVİS (FELSEN MOTORLU ARAÇLAR) KURUMSAL:
- İsim: Felsen Servis. "Felsen" Almanca'da "Kaya" anlamına gelir.
- Kurucu: Mehmet Kaya. Sektöre 1991'de Bostancı Oto Sanayi'de BMW çıraklığı ile başladı. 25 Haziran 1995'te Renault ile tanıştı. 29 yıllık Karen Renault/Yetkili Servis (Servis Müdürü) tecrübesinden sonra Ekim 2025'te Felsen'i kurdu.
- Vizyon: "Kaliteyi yaşamak kaliteyi satın almakla başlar." Vizyonuyla şeffaf ve teknolojik hizmet sunar.
- Ortaklık: 9 Şubat 2026'dan beri küresel Eurorepar Car Service ağının bir üyesidir.

İLETİŞİM BİLGİLERİ:
- Telefon: 0850 308 46 41 (Randevu ve bilgi hattı).
- E-posta: info@felsen.com.tr
- Adres: Sekerpinar Mahallesi Turgut Ozal Caddesi No 5/A Akpinar Plaza (Yapiteknik Yanı) Cayirova / Kocaeli. (Gebze ve Çayırova bölgesine hizmet verir).

ÇALIŞMA SAATLERİ:
- Hafta içi: 08:30 - 18:00
- Cumartesi: 08:30 - 14:00
- Pazar: Kapalı.

DETAYLI HİZMETLERİMİZ:
1. Periyodik Bakım: Yağ, filtre değişimleri ve genel kontroller (Ortalama 1.5 - 2 saat sürer).
2. Arıza Teshis (Diagnostic): Yeni nesil cihazlarla hata tespiti.
3. Mekanik onarım: Fren, ön takım, süspansiyon, klima kompresör tamiri.
4. Klima Servisi: Gaz dolumu, kaçak testi ve dezenfeksiyon.
5. Lastik & Rot Balans: Bilgisayarlı rot ayarı ve balans.
6. Garanti: 2 yıl Eurorepar parça garantisi.

AUTOWAX UYGULAMA MERKEZİ: Seramik Kaplama, Boya Koruma, PPF, Detaylı İç Temizlik, Cam Filmi.
FELSEN GRUP: Felsen Sigorta (19 acente) ve Felsen Rent A Car (Araç Kiralama).
`;

const SCOPE_KEYWORDS = [
  "felsen",
  "servis",
  "randevu",
  "saat",
  "adres",
  "telefon",
  "mail",
  "fiyat",
  "ucret",
  "bakim",
  "onarim",
  "ariza",
  "lastik",
  "aku",
  "fren",
  "klima",
  "sigorta",
  "kiralama",
  "muayene",
  "rot",
  "balans",
  "cam filmi",
  "seramik",
  "ppf",
  "folyo",
  "detayli ic temizlik",
  "motor temizligi",
  "kocaeli",
  "cayirova",
  "gebze",
];

const OUT_OF_SCOPE_REPLY =
  "Ben yalnizca Felsen Servis'in hizmetleri, randevu sureci ve iletisim bilgileri konusunda yardimci olabilirim. Bu konu disinda bilgi veremiyorum.";

const systemPrompt = `
Sen Felsen Servis'in zeki, samimi ve jilet gibi profesyonel asistanısın. 

KURALLARIN:
1. Adresimiz: Sekerpinar Mahallesi Turgut Ozal Caddesi No 5/A Akpinar Plaza (Yapiteknik Yanı) Cayirova / Kocaeli.
2. Telefonumuz: 0850 308 46 41. (Numarayı her zaman boşluklu yaz: 0850 308 46 41)
3. ÜSLUP: Çok samimi ama profesyonel ol. Her mesajın sonunda aynı basmakalıp cümleleri ("Mehmet Kaya 30 yıllık tecrübe..." vb.) tekrarlama! Sadece sorulan soruya odaklan ve gerektiğinde doğal bir şekilde randevu alabileceğini hatırlat.
4. BİLGİ: Mehmet Kaya'nın tecrübesini ve Eurorepar güvencesini sadece konu oraya gelirse veya ilk selamlaşmada doğal bir şekilde kullan. Robot gibi her mesajın altına yapıştırma.
5. Randevu için kullanıcıyı "Randevu Almak İstiyorum" butonuna basmaya veya direkt bana bilgilerini vermeye yönlendir.
6. Mesajların kısa, öz ve insan gibi olsun.
`;

const FALLBACK_REPLY = `Asistan servisi gecici olarak yogun. Size hemen yardimci olayim: Servis saatlerimiz hafta ici ${WORKING_HOURS.weekday.start}-${WORKING_HOURS.weekday.end}, cumartesi ${WORKING_HOURS.saturday.start}-${WORKING_HOURS.saturday.end}. Randevu icin /randevu sayfasini kullanabilir veya 0850 308 46 41 numarasindan bize ulasabilirsiniz.`;

const GEMINI_MODELS = ["gemini-1.5-flash"];

export async function POST(request: Request) {
  try {
    const env = getEnv();
    const apiKey = env.GEMINI_API_KEY.trim();
    const body = await request.json();
    const parsed = chatbotBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Geçersiz mesaj." }, { status: 400 });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: parsed.data.message }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    console.log("Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error Detail:", JSON.stringify(errorData, null, 2));
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Gemini Response Structure:", JSON.stringify(data, null, 2));
      throw new Error("Empty response or wrong structure");
    }

    console.log("✅ Success! Response generated.");
    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chatbot Fatal Error:", error);
    return NextResponse.json({
      reply: "Şu an bağlantıda bir sorun yaşıyorum ama size 0850 308 46 41 numaramızdan veya /randevu sayfamızdan her zaman yardımcı olabiliriz."
    });
  }
}
