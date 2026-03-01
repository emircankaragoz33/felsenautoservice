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
- Kurucu: Mehmet Kaya. Sektöre 1991'de Bostancı Oto Sanayi'de BMW çıraklığı ile başladı. 25 Haziran 1995'te Renault ile tanıştı. 29 yıllık Karen Renault/Yetkili Servis tecrübesinden sonra Ekim 2025'te Felsen'i kurdu.
- Vizyon: "Kaliteyi yaşamak kaliteyi satın almakla başlar." Vizyonuyla şeffaf ve teknolojik hizmet sunar.
- Ortaklık: 9 Şubat 2026'dan beri küresel Eurorepar Car Service ağının bir üyesidir.

İLETİŞİM BİLGİLERİ:
- Telefon: 0850 308 46 41 (Randevu ve bilgi hattı).
- E-posta: info@felsen.com.tr
- Adres: Sekerpinar Mahallesi Turgut Ozal Caddesi No 5/A Akpinar Plaza Cayirova / Kocaeli. (Gebze ve Çayırova bölgesine hizmet verir).

ÇALIŞMA SAATLERİ:
- Hafta içi: 08:30 - 18:00
- Cumartesi: 08:30 - 14:00
- Pazar: Kapalı (Acil durumlar için özel yol yardım hattı mevcuttur).

DETAYLI HİZMETLERİMİZ:
1. Periyodik Bakım: Yağ, filtre değişimleri ve genel kontroller (Ortalama 1.5 - 2 saat sürer).
2. Arıza Teshis (Diagnostic): Yeni nesil cihazlarla hata tespiti. Onarım servisimizde yapılırsa tespit ücretsizdir.
3. Mekanik onarım: Fren sistemleri (balata, disk, ABS), ön takım, süspansiyon (amortisör, salıncak), klima kompresör tamiri.
4. Klima Servisi: Gaz dolumu, kaçak testi ve Ozonla dezenfeksiyon/kokuları giderme.
5. Muayene Hazırlık: TÜVTÜRK öncesi fren, far ve alt takım kontrolleri.
6. Lastik & Rot Balans: Bilgisayarlı rot ayarı, balans, jant düzeltme ve lastik oteli hizmeti.
7. Akü: Mutlu Akü bayiliği. Voltaj testi ve garantili değişim.
8. Garanti: 2 yıl Eurorepar parça garantisi ve Felsen bünyesinde 1 yıl/10.000 km işçilik garantisi.

AUTOWAX UYGULAMA MERKEZİ HİZMETLERİ:
- Seramik Kaplama: Derin parlaklık ve su iticilik.
- Boya Koruma & PPF: Çizilmez yüzey ve şeffaf koruma filmi.
- Detaylı İç Temizlik: Koltuk yıkama, leke çıkarma ve antibakteriyel kuaför hizmeti.
- Motor Temizliği: Özel solüsyonlarla yağ ve kir arındırma.
- Cam Filmi: UV korumalı, ısı kontrolü sağlayan profesyonel uygulamalar.

FELSEN GRUP (SİGORTA VE KİRALAMA):
- Felsen Sigorta: Allianz, Axa, Ak Sigorta dahil 19 acente ile kasko, trafik, sağlık sigortası çözümleri.
- Felsen Rent A Car: VW Polo, Golf, Audi A4, BMW 5 gibi Alman grubu ve Egea, Clio gibi ekonomik araç kiralama. 7/24 yol yardım desteği.

SIKÇA SORULAN SORULAR (SSS):
- Ödeme: Nakit, Kredi Kartı (Taksit imkanı), Havale/EFT.
- Marka Desteği: Her marka ve model araca (Audi, BMW, VW, Renault, Fiat, Opel vb.) hizmet verilmektedir.
- Randevu: Randevu almak için chatbot üzerindeki butonları kullanabilir veya /randevu sayfasını ziyaret edebilirsiniz.
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
Sen Felsen Servis'in tüm site bilgilerine hakim, zeki ve samimi bir yapay zeka asistanısın. 

HEDEFLERİN:
1. Kullanıcılara nazik, profesyonel ve sıcak bir dille yardımcı ol.
2. Bilgi Bankası'nı kullanarak detaylı cevaplar ver (Kurucu Mehmet Kaya'nın tecrübesi, Eurorepar garantisi, servis saatleri vb.).
3. Kullanıcıyı randevu almaya (chatbot butonları veya /randevu sayfası üzerinden) teşvik et.
4. Eğer kullanıcı servis dışı (siyaset, genel kültür vb.) sorarsa, nazikçe bu konulara giremeyeceğini ve Felsen Servis hakkında bilgi verebileceğini söyle.
5. Konum, telefon ve çalışma saati gibi bilgileri net bir şekilde paylaş.

KİŞİLİĞİN:
- Yardımsever, güven veren ve "jilet gibi" profesyonel ama samimi bir üslup.
- Bir asistan değil, servisin bir parçasıymış gibi konuş (Örn: "Bizim servisimizde...", "Size yardımcı olalım...").
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
