# Felsen Auto - Randevu ve Yonetim Sistemi

Next.js App Router tabanli, tek uygulamada (backend ayrica yok) calisan oto servis randevu + admin yonetim sistemidir.

## Teknoloji

- Next.js 16 (App Router)
- Route Handlers (`app/api`)
- Prisma ORM
- Supabase Postgres
- TailwindCSS (v4)
- NextAuth Credentials (admin auth)
- Resend (e-posta)
- Gemini API (chatbot)

## Ozellikler

### Randevu Sistemi
- Slot bazli randevu (`/iletisim`)
- Kurallar:
  - Gecmis tarih secilemez
  - Pazar secilemez
  - Saat 13:00 sonrasi ayni gun randevu kapali
  - Ayni `date + time` icin sadece 1 kayit (DB unique)
- Slot renklendirme:
  - Dolu: kirmizi
  - Bos: yesil

### Mail Gonderimi
- `info@felsen.com.tr` gonderici kimligiyle kullaniciya onay maili
- Kurumsal HTML template
- Randevuya 6 saat kala otomatik hatirlatma e-postasi

### Admin Panel
- `/admin/login` ile giris (env'deki admin email/sifre)
- Middleware ile `/admin` korumasi
- `/admin` panelde:
  - Gune gore filtreli liste
  - Durum guncelleme (`pending`, `approved`, `cancelled`)
  - Kayit silme
  - Saat/kisi/arac bilgisi goruntuleme

### Chatbot
- Sag altta floating chat widget
- `/api/chatbot` route'u ile Gemini istekleri server-side yapilir
- API key frontend'e acilmaz

## Environment Variables

`.env.example` dosyasini `.env.local` olarak kopyalayin ve doldurun:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
RESEND_API_KEY="re_xxx"
RESEND_FROM="Felsen Servis <servis@felsen.com.tr>"
APPOINTMENT_REMINDER_SECRET="replace-with-random-secret"
ADMIN_EMAIL="admin@felsen.com.tr"
ADMIN_PASSWORD="replace-with-strong-password"
AUTH_SECRET="replace-with-long-random-secret"
GEMINI_API_KEY="your-gemini-api-key"
```

## Kurulum

```bash
npm install
```

## Prisma / Veritabani

1. Supabase projesi olusturun ve Postgres connection string alin.
2. `DATABASE_URL` degiskenine ekleyin.
3. Migration olusturun ve calistirin:

```bash
npx prisma migrate dev --name add-reminder-sent-at
npm run prisma:generate
```

Production'da:

```bash
npm run prisma:migrate
```

## Gelistirme

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Vercel Deploy

Vercel proje ayarlarina tum env degiskenlerini ekleyin.

`vercel.json` icinde saatlik cron tanimlidir:

```json
{
  "crons": [
    {
      "path": "/api/appointments/reminders",
      "schedule": "0 * * * *"
    }
  ]
}
```

Bu endpoint `Authorization: Bearer <APPOINTMENT_REMINDER_SECRET>` ile korunur.
Vercel cron kullanacaksaniz `CRON_SECRET` de ayni degerde tanimlanabilir.

Ek olarak Build Command sonrasi Prisma migration icin istege bagli komut:

```bash
npm run prisma:migrate && npm run build
```

> Not: Var olan sayfalarda eski lint hatalari bulunabilir; yeni randevu/admin/chatbot akislarinin build'i basarili sekilde calismaktadir.
