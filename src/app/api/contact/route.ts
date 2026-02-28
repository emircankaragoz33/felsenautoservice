import { NextResponse } from "next/server";

type ContactPayload = {
  CustomerName?: string;
  CustomerPhone?: string;
  CustomerEmail?: string;
  ServiceType?: string;
  CarModel?: string;
  AppointmentDate?: string;
  Notes?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const customerName = (body.CustomerName ?? "").trim();
    const customerPhone = (body.CustomerPhone ?? "").trim();
    const customerEmail = (body.CustomerEmail ?? "").trim();
    const serviceType = (body.ServiceType ?? "").trim();
    const carModel = (body.CarModel ?? "").trim();
    const appointmentDate = body.AppointmentDate ?? "";
    const notes = (body.Notes ?? "").trim();

    if (!customerName || !customerPhone || !customerEmail || !serviceType) {
      return NextResponse.json({ success: false, message: "Eksik form alanları var." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ success: false, message: "RESEND_API_KEY tanımlı değil." }, { status: 500 });
    }

    const fromAddress = process.env.RESEND_FROM ?? "Felsen Servis <servis@felsen.com.tr>";
    const targetAddress = process.env.RESEND_CONTACT_TO ?? "servis@felsen.com.tr";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://felsen.com.tr";
    const logoUrl = process.env.EMAIL_LOGO_URL ?? `${siteUrl.replace(/\/$/, "")}/images/logo.png`;

    const parsedDate = appointmentDate ? new Date(appointmentDate) : null;
    const appointmentDateText = parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleString("tr-TR", { dateStyle: "long", timeStyle: "short" })
      : "Belirtilmedi";

    const html = `
      <!DOCTYPE html>
      <html lang="tr">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Yeni Randevu Talebi</title>
        </head>
        <body style="margin:0;padding:0;background:#05070d;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:28px 0;background:radial-gradient(circle at 10% 0%, #131726 0, #05070d 58%);">
            <tr>
              <td align="center">
                <table width="640" cellpadding="0" cellspacing="0" style="max-width:95%;background:#0c111d;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.12);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#121827,#3b0b0f);padding:26px 30px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);">
                      <img src="${logoUrl}" alt="Felsen Servis" style="max-height:44px;width:auto;display:block;margin:0 auto 12px;" />
                      <p style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Felsen Servis</p>
                      <p style="margin:8px 0 0;color:#dbe2f1;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">Yeni Randevu Talebi</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px 30px;">
                      <p style="margin:0 0 12px;color:#f8fafc;font-size:18px;">Randevu talebi detayları</p>
                      <p style="margin:0 0 18px;color:#cbd5e1;font-size:14px;line-height:1.7;">
                        Aşağıdaki bilgilerle yeni bir iletişim/randevu talebi alınmıştır.
                      </p>

                      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.14);border-radius:12px;overflow:hidden;background:rgba(255,255,255,0.02);">
                        <tr>
                          <td style="padding:12px 14px;background:rgba(255,255,255,0.04);color:#94a3b8;width:42%;font-size:13px;">Müşteri Adı</td>
                          <td style="padding:12px 14px;color:#f8fafc;font-size:14px;">${customerName}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 14px;background:rgba(255,255,255,0.04);color:#94a3b8;font-size:13px;">Telefon</td>
                          <td style="padding:12px 14px;color:#f8fafc;font-size:14px;">${customerPhone}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 14px;background:rgba(255,255,255,0.04);color:#94a3b8;font-size:13px;">E-posta</td>
                          <td style="padding:12px 14px;color:#f8fafc;font-size:14px;"><a href="mailto:${customerEmail}" style="color:#fca5a5;text-decoration:none;">${customerEmail}</a></td>
                        </tr>
                        <tr>
                          <td style="padding:12px 14px;background:rgba(255,255,255,0.04);color:#94a3b8;font-size:13px;">Hizmet Türü</td>
                          <td style="padding:12px 14px;color:#f8fafc;font-size:14px;">${serviceType}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 14px;background:rgba(255,255,255,0.04);color:#94a3b8;font-size:13px;">Araç Bilgisi</td>
                          <td style="padding:12px 14px;color:#f8fafc;font-size:14px;">${carModel || "Belirtilmedi"}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 14px;background:rgba(255,255,255,0.04);color:#94a3b8;font-size:13px;">Talep Tarihi</td>
                          <td style="padding:12px 14px;color:#f8fafc;font-size:14px;">${appointmentDateText}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 14px;background:rgba(255,255,255,0.04);color:#94a3b8;font-size:13px;vertical-align:top;">Müşteri Notu</td>
                          <td style="padding:12px 14px;color:#f8fafc;font-size:14px;">${notes || "Belirtilmedi"}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 30px;background:#0a0f19;border-top:1px solid rgba(255,255,255,0.08);color:#94a3b8;font-size:12px;text-align:center;">
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

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [targetAddress],
        reply_to: customerEmail,
        subject: `Yeni Randevu Talebi: ${customerName} - ${serviceType}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ success: false, message: "Resend gönderimi başarısız.", error: errorText }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "E-posta başarıyla gönderildi." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Bilinmeyen hata";
    return NextResponse.json({ success: false, message: "E-posta gönderilemedi.", error: message }, { status: 500 });
  }
}
