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
        <h2>Yeni Randevu Talebi</h2>
        <p><strong>Ad Soyad:</strong> ${CustomerName}</p>
        <p><strong>Telefon:</strong> ${CustomerPhone}</p>
        <p><strong>E-Posta:</strong> ${CustomerEmail}</p>
        <p><strong>Hizmet Türü:</strong> ${ServiceType}</p>
        <p><strong>Araç:</strong> ${CarModel}</p>
        <p><strong>Tarih:</strong> ${new Date(AppointmentDate).toLocaleString('tr-TR')}</p>
        <p><strong>Not:</strong> ${Notes}</p>
        <br />
        <hr />
        <p>Bu mesaj Felsen Auto web sitesinden gönderilmiştir.</p>
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
