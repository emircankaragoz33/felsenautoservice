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
3. Kullanıcıyı randevu almaya teşvik et. Eğer kullanıcı randevu almak istediğini belirtirse, ona butonları kullanabileceğini veya "Randevu Almak İstiyorum" demesini söyle.
4. Eğer kullanıcı servis dışı (siyaset, genel kültür vb.) sorarsa, nazikçe bu konulara giremeyeceğini ve Felsen Servis hakkında bilgi verebileceğini söyle.
5. Konum, telefon ve çalışma saati gibi bilgileri net bir şekilde paylaş.

ÖNEMLİ:
- Eğer kullanıcı "randevu", "kayıt", "bakım yaptırmak istiyorum" gibi şeyler derse, mutlaka ona randevu akışını başlatabileceğini hatırlat.
- Cevapların kısa, öz ve ikna edici olsun.
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

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

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
