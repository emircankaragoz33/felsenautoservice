import { appointmentConfirmationTemplate } from "@/lib/email-templates/appointment-confirmation";

type SendAppointmentConfirmationParams = {
  to: string;
  name: string;
  date: string;
  time: string;
  plate: string;
  carModel: string;
  serviceType: string;
};

type SendAppointmentReminderParams = {
  to: string;
  name: string;
  date: string;
  time: string;
  plate: string;
  carModel: string;
  serviceType: string;
};

function getMailConfig() {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY tanımlı değil.");
  }

  const fromAddress = process.env.RESEND_FROM ?? "Felsen Servis <servis@felsen.com.tr>";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://felsen.com.tr";
  const logoUrl = process.env.EMAIL_LOGO_URL ?? `${siteUrl.replace(/\/$/, "")}/images/logo.png`;

  return { resendApiKey, fromAddress, logoUrl };
}

function appointmentReminderTemplate(payload: {
  name: string;
  date: string;
  time: string;
  plate: string;
  carModel: string;
  serviceType: string;
  logoUrl: string;
}) {
  return `
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Randevu Hatırlatma</title>
      </head>
      <body style="margin:0;padding:0;background:#06080f;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:34px 0;background:radial-gradient(circle at 15% 0%, #1a2236 0, #06080f 60%);">
          <tr>
            <td align="center">
              <table width="700" cellpadding="0" cellspacing="0" style="background:#0e1424;border-radius:20px;overflow:hidden;box-shadow:0 22px 50px rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.14);max-width:95%;">
                <tr>
                  <td style="background:linear-gradient(135deg,#151d31,#4a1015);padding:30px 34px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1);">
                    <img src="${payload.logoUrl}" alt="Felsen Servis" style="max-height:80px;width:auto;display:block;margin:0 auto 14px;" />
                    <p style="margin:0;color:#ffffff;font-size:30px;font-weight:800;letter-spacing:0.02em;">Felsen Servis</p>
                    <p style="margin:10px 0 0;color:#e2e8f0;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;">Randevu Hatırlatma</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:34px 34px 28px;">
                    <p style="margin:0 0 12px;color:#f8fafc;font-size:24px;font-weight:700;line-height:1.35;">Sayın ${payload.name},</p>
                    <p style="margin:0 0 22px;color:#d1d9e8;font-size:16px;line-height:1.8;">
                      Randevunuza yaklaşık 6 saat kaldı. Planlanan servis bilginizi aşağıda tekrar paylaşıyoruz.
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.16);border-radius:14px;overflow:hidden;background:rgba(255,255,255,0.03);">
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;width:40%;font-size:14px;font-weight:600;">Tarih</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${payload.date}</td>
                      </tr>
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;font-size:14px;font-weight:600;">Saat</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${payload.time}</td>
                      </tr>
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;font-size:14px;font-weight:600;">Araç Plakası</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${payload.plate}</td>
                      </tr>
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;font-size:14px;font-weight:600;">Araç Modeli</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${payload.carModel}</td>
                      </tr>
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;font-size:14px;font-weight:600;">Hizmet Türü</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${payload.serviceType}</td>
                      </tr>
                    </table>

                    <p style="margin:22px 0 0;color:#cbd5e1;font-size:15px;line-height:1.8;">
                      Ulaşım veya saat değişikliği talepleriniz için
                      <a href="mailto:servis@felsen.com.tr" style="color:#fca5a5;text-decoration:none;font-weight:700;"> servis@felsen.com.tr </a>
                      adresinden bize yazabilirsiniz.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 30px;background:#0a0f1a;border-top:1px solid rgba(255,255,255,0.1);color:#9aa8bf;font-size:13px;text-align:center;line-height:1.6;">
                    Felsen Servis • Profesyonel Oto Servis Çözümleri
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function sendAppointmentConfirmationEmail(payload: SendAppointmentConfirmationParams) {
  const { resendApiKey, fromAddress, logoUrl } = getMailConfig();

  const html = appointmentConfirmationTemplate({
    name: payload.name,
    date: payload.date,
    time: payload.time,
    plate: payload.plate,
    carModel: payload.carModel,
    serviceType: payload.serviceType,
    logoUrl,
  });

  const recipients = Array.from(new Set([payload.to, "servis@felsen.com.tr"]));

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: recipients,
      subject: "Randevunuz Alındı",
      html,
      reply_to: payload.to,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend e-posta gönderim hatası: ${response.status} ${errorText}`);
  }
}

export async function sendAppointmentReminderEmail(payload: SendAppointmentReminderParams) {
  const { resendApiKey, fromAddress, logoUrl } = getMailConfig();

  const html = appointmentReminderTemplate({
    name: payload.name,
    date: payload.date,
    time: payload.time,
    plate: payload.plate,
    carModel: payload.carModel,
    serviceType: payload.serviceType,
    logoUrl,
  });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: payload.to,
      subject: "Randevu Hatırlatma - 6 Saat Kaldı",
      html,
      reply_to: "servis@felsen.com.tr",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend hatırlatma e-postası hatası: ${response.status} ${errorText}`);
  }
}
