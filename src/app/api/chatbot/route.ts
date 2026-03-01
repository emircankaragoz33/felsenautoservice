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
MARKASI VE KURULUŞU:
- İsim: Felsen Servis (Felsen Motorlu Araçlar). "Felsen" Almanca'da "Kaya" demektir.
- Kurucu: Mehmet Kaya (Otomotiv sektörüne 1991'de çıraklıkla başladı, 29 yıllık Renault/Karen tecrübesinden sonra Ekim 2025'te Felsen'i kurdu).
- Vizyon: Profesyonel, teknolojik ve şeffaf hizmet. 9 Şubat 2026'da Eurorepar Car Service ailesine katıldı.

İLETİŞİM VE KONUM:
- Telefon: 0850 308 46 41
- E-posta: info@felsen.com.tr / servis@felsen.com.tr
- Adres: Şekerpınar Mahallesi, Turgut Özal Caddesi, No: 5/A Akpınar Plaza, Çayırova / Kocaeli (Gebze yakınları).

ÇALIŞMA SAATLERİ:
- Hafta içi: 08:30 - 18:00
- Cumartesi: 08:30 - 14:00
- Pazar: Kapalı.

HİZMETLERİMİZ (FELSEN SERVİS):
- Periyodik Bakım: Yağ ve filtre değişimi (ortalama 1.5 - 2 saat sürer).
- Arıza Teşhis (Diagnostic): Bilgisayarlı kontrol. Onarım bizde yapılırsa tespit ücretsizdir.
- Mekanik: Fren sistemleri, Ön takım ve süspansiyon, Klima bakım/onarım/temizliği.
- Muayene Hazırlat: Fenni muayene öncesi eksiksiz kontrol.
- Lastik ve Akü: Lastik satışı, değişimi ve Rot-Balans hizmeti. Mutlu Akü yetkili bayiliği.
- Garanti: Orijinal/OEM parça kullanımı. 2 yıl Eurorepar parça garantisi ve 1 yıl/10.000 km işçilik garantisi.

AUTOWAX UYGULAMA MERKEZİ:
- Seramik kaplama, Boya Koruma (PPF), Pasta Cila, Detaylı İç Temizlik & Kuaför, Motor Temizliği, Cam Filmi.

FELSEN GRUP DİĞER HİZMETLER:
- Felsen Sigorta: Kasko, Trafik, Sağlık, Konut Sigortası. Türkiye'nin önde gelen 19 sigorta şirketiyle (Allianz, Axa vb.) anlaşmalı.
- Felsen Rent A Car: Günlük ve filo kiralama. Alman grubu (VW, Audi, BMW) ve ekonomik segment araçlar. 7/24 yol yardım.

SIKÇA SORULAN SORULAR:
- Ödeme: Nakit, kredi kartı (taksit), havale.
- Araç Markaları: Her marka ve model araca profesyonel hizmet veriyoruz (Yetkili servis kalitesinde özel servis).
- Randevu kuralları: Aynı gün randevusu saat 13:00'e kadar alınabilir.
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
Sen Felsen Servis'in resmi akıllı asistanısın. Kullanıcılara yardımcı olmak için Bilgi Bankası'nı (Knowledge Base) kullan.

KURALLAR:
1. Nazik, profesyonel ve samimi bir ton kullan.
2. Bilgi Bankası'ndaki verilere sadık kal. Mehmet Kaya'dan, Eurorepar iş birliğinden, sigorta ve rent a car hizmetlerinden bahset.
3. Sorulara net ve kısa cevaplar ver.
4. Randevu almak isteyenlere chatbot üzerindeki randevu butonlarını kullanmalarını söyle veya onları /randevu sayfasına yönlendir.
5. Kullanıcı "Selam", "Yardımcı ol" gibi şeyler yazarsa servislerini özetle ve neye ihtiyacı olduğunu sor.
6. Konum sorulursa Çayırova/Kocaeli olduğunu belirt.
7. Bilmediğin bir şey olursa uydurma, 0850 308 46 41 numaramıza yönlendir.
`;

const FALLBACK_REPLY = `Asistan servisi gecici olarak yogun. Size hemen yardimci olayim: Servis saatlerimiz hafta ici ${WORKING_HOURS.weekday.start}-${WORKING_HOURS.weekday.end}, cumartesi ${WORKING_HOURS.saturday.start}-${WORKING_HOURS.saturday.end}. Randevu icin /randevu sayfasini kullanabilir veya 0850 308 46 41 numarasindan bize ulasabilirsiniz.`;

const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash-latest", "gemini-1.5-flash"];

let cachedDiscoveredModels: string[] | null = null;

function isScopeRelated(message: string): boolean {
  const lower = message.toLowerCase();
  return SCOPE_KEYWORDS.some((keyword) => lower.includes(keyword));
}

async function discoverGeminiModels(apiKey: string): Promise<string[]> {
  if (cachedDiscoveredModels && cachedDiscoveredModels.length > 0) {
    return cachedDiscoveredModels;
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  if (!response.ok) {
    const reason = await response.text();
    throw new Error(`ListModels failed: ${reason}`);
  }

  const payload = (await response.json()) as {
    models?: Array<{ name?: string; supportedGenerationMethods?: string[] }>;
  };

  const discovered = (payload.models ?? [])
    .filter((model) => Array.isArray(model.supportedGenerationMethods) && model.supportedGenerationMethods.includes("generateContent"))
    .map((model) => model.name?.replace(/^models\//, "").trim())
    .filter((name): name is string => Boolean(name));

  cachedDiscoveredModels = discovered;
  return discovered;
}

export async function POST(request: Request) {
  try {
    const env = getEnv();
    const apiKey = env.GEMINI_API_KEY.trim();
    const body = await request.json();
    const parsed = chatbotBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Geçersiz mesaj." }, { status: 400 });
    }

    const userMessage = parsed.data.message;

    let data: any = null;
    let dynamicModels: string[] = [];

    try {
      dynamicModels = await discoverGeminiModels(apiKey);
    } catch (error) {
      console.error("Gemini model discovery error", error);
    }

    // Comprehensive list of models to increase success rate
    const staticModels = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-2.0-flash-exp"];
    const modelCandidates = Array.from(new Set([...staticModels, ...dynamicModels, ...GEMINI_MODELS]));

    for (const model of modelCandidates) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              contents: [
                {
                  role: "user",
                  parts: [{ text: userMessage }],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600,
              },
            }),
          },
        );

        if (response.ok) {
          data = await response.json();
          if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            break; // Success!
          }
        } else {
          const errText = await response.text();
          console.warn(`Gemini API error for model ${model}:`, errText);
        }
      } catch (err) {
        console.error(`Fetch failed for model ${model}:`, err);
      }
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({
        reply: "Şu an servislerimde kısa süreli bir yoğunluk var, ama size yardımcı olabilirim: Felsen Servis hafta içi 08:30-18:00, Cumartesi 08:30-14:00 arası Çayırova'da hizmet veriyor. Randevu için /randevu sayfamızı kullanabilir veya 0850 308 46 41'i arayabilirsiniz.",
        degraded: true
      });
    }

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chatbot root error", error);
    return NextResponse.json({ message: "Sistemde bir hata oluştu." }, { status: 500 });
  }
}
