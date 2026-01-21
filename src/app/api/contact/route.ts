import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { CustomerName, CustomerPhone, CustomerEmail, ServiceType, CarModel, AppointmentDate, Notes } = body

        // 1. Configure the Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
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

        // 3. Send Email
        await transporter.sendMail(mailOptions)

        return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } catch (error) {
        console.error('Email error:', error)
        return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 })
    }
}
