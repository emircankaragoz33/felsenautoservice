import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { CustomerName, CustomerPhone, CustomerEmail, ServiceType, CarModel, AppointmentDate, Notes } = body

        console.log("SMTP Config:", {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.SMTP_USER,
            secure: Number(process.env.SMTP_PORT) === 465
        });

        // 1. Configure the Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            logger: true,
            debug: true
        })

        // 2. Define Email Data
        const mailOptions = {
            from: `"${CustomerName}" <${process.env.SMTP_FROM}>`, // Sender address
            to: process.env.SMTP_TO, // List of receivers
            replyTo: CustomerEmail,
            subject: `Yeni Randevu Talebi: ${CustomerName} - ${ServiceType}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Yeni Randevu Talebi</title>
                <style>
                    body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
                    .header { background-color: #1a1a1a; padding: 40px 20px; text-align: center; border-bottom: 4px solid #ff3e3e; }
                    .header h1 { color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
                    .content { padding: 40px 30px; }
                    .title { color: #333; font-size: 20px; font-weight: bold; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
                    .info-row { margin-bottom: 15px; display: flex; align-items: flex-start; }
                    .label { font-weight: bold; color: #555; width: 140px; min-width: 140px; }
                    .value { color: #333; flex: 1; }
                    .notes-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #ff3e3e; margin-top: 20px; }
                    .footer { background-color: #1a1a1a; padding: 20px; text-align: center; color: #888; font-size: 12px; }
                    .btn-link { display: inline-block; background-color: #ff3e3e; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <!-- Logo URL assumed valid based on domain -->
                        <img src="https://felsen.com.tr/images/logo.png" alt="Felsen Servis" style="max-height: 80px; width: auto; margin-bottom: 10px;">
                        <h1 style="color: #fff; margin-top: 10px;">Yeni Randevu</h1>
                    </div>
                    <div class="content">
                        <div class="title">Randevu Detayları</div>
                        
                        <div class="info-row">
                            <div class="label">Müşteri Adı:</div>
                            <div class="value">${CustomerName}</div>
                        </div>
                        <div class="info-row">
                            <div class="label">Telefon:</div>
                            <div class="value" style="font-weight: bold; color: #1a1a1a;">${CustomerPhone}</div>
                        </div>
                         <div class="info-row">
                            <div class="label">E-Posta:</div>
                            <div class="value"><a href="mailto:${CustomerEmail}" style="color: #ff3e3e; text-decoration: none;">${CustomerEmail}</a></div>
                        </div>
                        
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

                        <div class="info-row">
                            <div class="label">Hizmet Türü:</div>
                            <div class="value" style="color: #ff3e3e; font-weight: bold;">${ServiceType}</div>
                        </div>
                        <div class="info-row">
                            <div class="label">Araç Bilgisi:</div>
                            <div class="value">${CarModel}</div>
                        </div>
                        <div class="info-row">
                            <div class="label">Talep Tarihi:</div>
                            <div class="value">${new Date(AppointmentDate).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}</div>
                        </div>

                        ${Notes ? `
                        <div class="notes-box">
                            <div style="font-weight: bold; margin-bottom: 5px; color: #333;">Müşteri Notu:</div>
                            <div style="color: #555; line-height: 1.5;">${Notes}</div>
                        </div>
                        ` : ''}
                        
                         <div style="text-align: center; margin-top: 30px;">
                            <a href="mailto:${CustomerEmail}" class="btn-link" style="color: #ffffff;">Müşteriye Yanıtla</a>
                        </div>
                    </div>
                    <div class="footer">
                        &copy; ${new Date().getFullYear()} Felsen Servis. Tüm Hakları Saklıdır.<br>
                        Bu e-posta otomatik olarak web sitenizden gönderilmiştir.
                    </div>
                </div>
            </body>
            </html>
            `,
        }

        // Verify connection configuration
        try {
            await transporter.verify();
            console.log("Server is ready to take our messages");
        } catch (verifyError) {
            console.error("SMTP Connection Error:", verifyError);
            return NextResponse.json({ success: false, message: 'SMTP Connection Failed', error: verifyError }, { status: 500 });
        }

        // 3. Send Email
        const info = await transporter.sendMail(mailOptions)
        console.log("Message sent: %s", info.messageId);

        return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } catch (error: any) {
        console.error('Email error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            response: error.response
        });
        return NextResponse.json({ success: false, message: 'Failed to send email', error: error.message }, { status: 500 })
    }
}
