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
Marka: Felsen Servis
Telefon: 0850 308 46 41
Email: info@felsen.com.tr / servis@felsen.com.tr
Adres: Sekerpinar Mahallesi Turgut Ozal Caddesi No 5/A Akpinar Plaza Cayirova / Kocaeli
Calisma Saatleri: Hafta ici ${WORKING_HOURS.weekday.start}-${WORKING_HOURS.weekday.end}, Cumartesi ${WORKING_HOURS.saturday.start}-${WORKING_HOURS.saturday.end}, Pazar kapali
Randevu Kurallari: Pazar randevu kapali, gecmis tarih olmaz, 13:00 sonrasi ayni gun randevusu kapali
Randevu Sayfasi: /randevu
Hizmetler: ${APPOINTMENT_SERVICE_TYPES.join(", ")}
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
Sen Felsen Servis'in web asistanisin.

Bilgi Bankasi (tek kaynak):
${SITE_KNOWLEDGE_BASE}

Kurallar:
- SADECE yukaridaki Bilgi Bankasi'na gore cevap ver.
- Bilgi Bankasi disinda kalan bir soruysa cevap uydurma; net sekilde sadece kapsam disi oldugunu soyle.
- Marka disi genel kultur, siyaset, finans, yazilim, saglik gibi konulara cevap verme.
- Servis saatleri: Hafta ici ${WORKING_HOURS.weekday.start}-${WORKING_HOURS.weekday.end}, Cumartesi ${WORKING_HOURS.saturday.start}-${WORKING_HOURS.saturday.end}, Pazar kapali.
- Randevu kurali: Saat 13:00 sonrasinda ayni gun icin randevu olusturulamaz.
- Randevu alanlari: ad soyad, telefon, email, arac plakasi, arac modeli, tarih ve saat.
- Bilmedigin bir konuda tahmin yapma, nazikce "Bunun icin servis ile dogrudan iletisime gecmenizi oneririm" de.
- Cevaplari Turkce, kisa, net ve profesyonel ver.
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
    const body = await request.json();
    const parsed = chatbotBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Gecersiz mesaj." }, { status: 400 });
    }

    if (!isScopeRelated(parsed.data.message)) {
      return NextResponse.json({ reply: OUT_OF_SCOPE_REPLY, scoped: true });
    }

    let data: any = null;
    let dynamicModels: string[] = [];

    try {
      dynamicModels = await discoverGeminiModels(env.GEMINI_API_KEY);
    } catch (error) {
      console.error("Gemini model discovery error", error);
    }

    const modelCandidates = Array.from(new Set([...GEMINI_MODELS, ...dynamicModels]));

    for (const model of modelCandidates) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
              temperature: 0.4,
              maxOutputTokens: 350,
            },
          }),
        },
      );

      if (response.ok) {
        data = await response.json();
        break;
      }

      const reason = await response.text();
      console.error("Gemini API error", { model, reason });
    }

    if (!data) {
      return NextResponse.json({ reply: FALLBACK_REPLY, degraded: true });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ reply: FALLBACK_REPLY, degraded: true });
    }

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chatbot error", error);
    return NextResponse.json({ message: "Sunucu hatasi olustu." }, { status: 500 });
  }
}
