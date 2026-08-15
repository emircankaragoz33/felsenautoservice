<p align="center">
  <img src="public/images/logo.png" alt="Felsen Auto Service" width="360">
</p>

# Felsen Auto - Randevu ve Yonetim Sistemi

Next.js App Router tabanli, tek uygulamada (backend ayrica yok) calisan oto servis randevu + admin yonetim sistemidir.

## Teknoloji

- Next.js 16 (App Router)
- Route Handlers (`app/api`)
- Prisma ORM
- Postgres (Supabase uzerinden, ama herhangi bir Postgres de olur)
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

---

## Kurulum Kilavuzu (Sifirdan, Adim Adim)

Bu bolum projeyi hic gormemis biri icin yazildi. Sirayla takip edin.

### 0) Gereken Araclar

- **Node.js** 20 veya uzeri ([nodejs.org](https://nodejs.org) adresinden indirilir)
- **Git**
- Bir kod editoru (VS Code onerilir)

Kurulumu dogrulamak icin terminalde:

```bash
node -v
npm -v
git --version
```

### 1) Projeyi Indirin

```bash
git clone <repo-linki>
cd felsenautoservice
```

### 2) Paketleri Kurun

```bash
npm install
```

### 3) Veritabani Olusturun (Supabase - ucretsiz)

1. [supabase.com](https://supabase.com) adresinden hesap acin.
2. **New Project** deyin, bir isim + bolge secin, guclu bir **veritabani sifresi** belirleyin (bu sifreyi bir yere not edin).
3. Proje acildiktan sonra sol menuden **Project Settings > Database** kismina girin.
4. **Connection string** bolumunde iki adet baglanti stringi var:
   - **Transaction pooler** (port `6543`) → bu `DATABASE_URL` olacak.
   - **Session pooler / Direct connection** (port `5432`) → bu `DIRECT_URL` olacak.
5. Her ikisindeki `[YOUR-PASSWORD]` yazan yeri, 2. adimda belirledginiz sifreyle degistirin.

> Not: Supabase zorunlu degil, herhangi bir Postgres veritabani (Railway, Neon, kendi sunucunuz vb.) da calisir. Onemli olan Postgres baglanti stringini elde etmek.

### 4) E-posta Gonderimi Icin Resend Hesabi

1. [resend.com](https://resend.com) adresinden hesap acin (ucretsiz planla baslanabilir).
2. **API Keys** kismindan yeni bir key olusturun → `RESEND_API_KEY`.
3. Kendi domaininizi (ornegin `felsen.com.tr`) Resend'e ekleyip DNS kayitlarini (SPF/DKIM) domain saglayicinizda tanimlayin ki mailler spam'e dusmesin. Domain eklemeden de test amacli calisir ama gercek kullanimda domain dogrulamasi sart.

### 5) Chatbot Icin Gemini API Key

1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) adresine gidin, Google hesabinizla girin.
2. **Create API key** deyip olusan anahtari kopyalayin → `GEMINI_API_KEY`.

### 6) `.env` Dosyasini Olusturun

> **Onemli:** Repo'da ornek olarak duran `.env` dosyasi varsa **silin** ve asagidaki gibi kendi bilgilerinizle sifirdan bir tane olusturun. Baskasina ait eski/test bilgileri kullanmayin.

Proje ana klasorunde `.env` adinda bir dosya olusturun, icine:

```env
# 3. adimda aldiginiz Supabase baglanti stringleri
DATABASE_URL="postgresql://...pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://...pooler.supabase.com:5432/postgres?sslmode=require"

# 4. adimda aldiginiz Resend bilgileri
RESEND_API_KEY="re_xxx"
RESEND_FROM="Felsen Servis <servis@felsen.com.tr>"

# Hatirlatma cron endpoint'ini korumak icin rastgele bir metin (asagida uretme komutu var)
APPOINTMENT_REMINDER_SECRET="buraya-rastgele-uzun-bir-metin"

# Admin paneline giris bilgileri - kendiniz belirleyin
ADMIN_EMAIL="admin@felsen.com.tr"
ADMIN_PASSWORD="guclu-bir-sifre-belirleyin"

# Oturum guvenligi icin rastgele bir anahtar (asagida uretme komutu var)
AUTH_SECRET="buraya-rastgele-uzun-bir-metin"

# 5. adimda aldiginiz Gemini key
GEMINI_API_KEY="AIzaSy..."
```

`APPOINTMENT_REMINDER_SECRET` ve `AUTH_SECRET` icin rastgele guclu bir deger uretmek isterseniz terminalde:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

komutunu iki kere calistirip ciktilari sirayla bu iki degere yapistirin.

### 7) Veritabani Tablolarini Olusturun

`.env` dosyasi hazir oldugunda:

```bash
npx prisma migrate deploy
npm run prisma:generate
```

Bu komut Supabase'deki bos veritabaninda gerekli tablolari otomatik olusturur.

### 8) Yerelde Calistirip Test Edin

```bash
npm run dev
```

Tarayicida [http://localhost:3000](http://localhost:3000) acilir. Randevu formunu test edin, ardindan [http://localhost:3000/admin/login](http://localhost:3000/admin/login) adresinden `.env`'deki `ADMIN_EMAIL` / `ADMIN_PASSWORD` ile giris yapip paneli kontrol edin.

### 9) Canliya Alma (Kendi Sunucunuzda - Windows/IIS veya Linux/nginx)

Next.js uygulamasi Node.js calistirabilen her sunucuda ayaga kaldirilabilir, ozel bir platforma bagimlilik yok.

#### Linux + nginx

1. Sunucuya Node.js 20+ kurun.
2. Projeyi sunucuya `git clone` yapin, `npm install` ve `npm run build` calistirin.
3. `.env` dosyasini sunucuda olusturun (6. adimdaki gibi).
4. Uygulamayi surekli ayakta tutmak icin PM2 kullanin:
   ```bash
   npm install -g pm2
   pm2 start npm --name felsen-auto -- start
   pm2 save
   pm2 startup
   ```
   Uygulama varsayilan olarak `3000` portunda calisir.
5. nginx'i reverse proxy olarak ayarlayin (`/etc/nginx/sites-available/felsen`):
   ```nginx
   server {
       listen 80;
       server_name felsen.com.tr www.felsen.com.tr;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   ```bash
   sudo ln -s /etc/nginx/sites-available/felsen /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
6. HTTPS icin ucretsiz sertifika:
   ```bash
   sudo certbot --nginx -d felsen.com.tr -d www.felsen.com.tr
   ```

#### Windows + IIS

1. Sunucuya Node.js 20+ kurun.
2. IIS'e **URL Rewrite** ve **Application Request Routing (ARR)** modullerini kurun (reverse proxy icin gerekli).
3. Projeyi sunucuya kopyalayin, `npm install` ve `npm run build` calistirin.
4. `.env` dosyasini olusturun.
5. Uygulamayi arka planda calisir tutmak icin PM2 (yukaridaki gibi) veya NSSM (Node'u Windows servisi olarak calistirir) kullanin:
   ```powershell
   npm install -g pm2
   pm2 start npm --name felsen-auto -- start
   pm2 save
   ```
6. IIS'te yeni bir site olusturup, ARR ile gelen istekleri `http://localhost:3000` adresine yonlendiren bir reverse proxy kurali tanimlayin (**URL Rewrite > Add Rule(s) > Reverse Proxy**).
7. Domaini bu IIS sitesine baglayip, SSL sertifikasini IIS uzerinden (Win-ACME / Let's Encrypt) tanimlayin.

> Hangi sunucu olursa olsun mantik ayni: `npm run build` ile derlenen uygulama bir process olarak (PM2/NSSM) 3000 portunda calisir, nginx veya IIS bunun onune gecip 80/443'ten disariya acar.

### 10) Otomatik Hatirlatma Maili (Cron)

Hatirlatma endpoint'ini (`/api/appointments/reminders`) saatte bir tetiklemeniz gerekir.

**Linux (crontab):**

```bash
crontab -e
```

asagidaki satiri ekleyin (her saat basi calisir):

```
0 * * * * curl -s -X GET -H "Authorization: Bearer <APPOINTMENT_REMINDER_SECRET>" https://felsen.com.tr/api/appointments/reminders
```

**Windows (Task Scheduler):**

1. **Task Scheduler**'i acin, **Create Basic Task**.
2. Tetikleyici olarak **Daily**, tekrar araligini **1 saat** secin.
3. Eylem olarak `curl.exe` calistirin (Windows 10/11'de hazir gelir), argumanlar:
   ```
   -s -X GET -H "Authorization: Bearer <APPOINTMENT_REMINDER_SECRET>" https://felsen.com.tr/api/appointments/reminders
   ```

`APPOINTMENT_REMINDER_SECRET` degerini `.env`'e yazdiginiz degerle ayni tutun.

---

## Gelistirme Komutlari

```bash
npm run dev      # yerel gelistirme sunucusu
npm run build    # production build
npm run start    # build'i calistir
```

Veritabani semasinda degisiklik yaptiginizda (yeni alan/tablo vb.):

```bash
npx prisma migrate dev --name aciklayici-isim
```

Production'da (sunucuda `npm run build` oncesi) migration'lari uygulamak icin:

```bash
npm run prisma:migrate
```

> Not: Var olan sayfalarda eski lint hatalari bulunabilir; yeni randevu/admin/chatbot akislarinin build'i basarili sekilde calismaktadir.
