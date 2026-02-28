type AppointmentEmailTemplateProps = {
  name: string;
  plate: string;
  carModel: string;
  serviceType: string;
  date: string;
  time: string;
  logoUrl: string;
};

export function appointmentConfirmationTemplate({
  name,
  plate,
  carModel,
  serviceType,
  date,
  time,
  logoUrl,
}: AppointmentEmailTemplateProps) {
  return `
    <!DOCTYPE html>
    <html lang="tr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Randevunuz Alındı</title>
      </head>
      <body style="margin:0;padding:0;background:#06080f;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:34px 0;background:radial-gradient(circle at 15% 0%, #1a2236 0, #06080f 60%);">
          <tr>
            <td align="center">
              <table width="700" cellpadding="0" cellspacing="0" style="background:#0e1424;border-radius:20px;overflow:hidden;box-shadow:0 22px 50px rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.14);max-width:95%;">
                <tr>
                  <td style="background:linear-gradient(135deg,#151d31,#4a1015);padding:30px 34px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1);">
                    <img src="${logoUrl}" alt="Felsen Servis" style="max-height:80px;width:auto;display:block;margin:0 auto 14px;" />
                    <p style="margin:0;color:#ffffff;font-size:30px;font-weight:800;letter-spacing:0.02em;">Felsen Servis</p>
                    <p style="margin:10px 0 0;color:#e2e8f0;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;">Randevu Onay Bilgilendirmesi</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:34px 34px 28px;">
                    <p style="margin:0 0 12px;color:#f8fafc;font-size:24px;font-weight:700;line-height:1.35;">Sayın ${name},</p>
                    <p style="margin:0 0 22px;color:#d1d9e8;font-size:16px;line-height:1.8;">
                      Randevu talebiniz başarıyla alınmıştır. Servis planlamanız aşağıdaki bilgilerle oluşturulmuştur.
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.16);border-radius:14px;overflow:hidden;background:rgba(255,255,255,0.03);">
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;width:40%;font-size:14px;font-weight:600;">Tarih</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${date}</td>
                      </tr>
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;font-size:14px;font-weight:600;">Saat</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${time}</td>
                      </tr>
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;font-size:14px;font-weight:600;">Araç Plakası</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${plate}</td>
                      </tr>
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;font-size:14px;font-weight:600;">Araç Modeli</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${carModel}</td>
                      </tr>
                      <tr>
                        <td style="padding:13px 16px;background:rgba(255,255,255,0.06);color:#9fb0c9;font-size:14px;font-weight:600;">Hizmet Türü</td>
                        <td style="padding:13px 16px;color:#f8fafc;font-size:15px;line-height:1.5;">${serviceType}</td>
                      </tr>
                    </table>

                    <p style="margin:22px 0 0;color:#cbd5e1;font-size:15px;line-height:1.8;">
                      Değişiklik talepleriniz için bu e-postaya yanıt verebilir veya
                      <a href="mailto:servis@felsen.com.tr" style="color:#fca5a5;text-decoration:none;font-weight:700;">servis@felsen.com.tr</a>
                      adresinden bize ulaşabilirsiniz.
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
