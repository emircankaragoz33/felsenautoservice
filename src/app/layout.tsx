import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Ticker from '@/components/Ticker'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Felsen Oto Servis - Kocaeli Çayırova Profesyonel Araç Bakımı ve Kiralama',
  description: 'Felsen Oto Servis; Kocaeli Çayırova bölgesinde BMW, Mercedes, Audi gibi premium markalara mekanik bakım, onarım, yedek parça, sigorta ve rent a car hizmeti sunan profesyonel tek adres.',
  keywords: "felsen, felsen auto, felsen oto servis, kocaeli oto servis, çayırova oto servis, gebze oto servis, oto tamir kocaeli, bmw servisi kocaeli, mercedes servisi kocaeli, audi servisi kocaeli, felsen rent a car, felsen sigorta, araç kiralama kocaeli",
  authors: [{ name: "Felsen Auto" }],
  openGraph: {
    type: 'website',
    url: 'https://felsen.com.tr',
    title: 'Felsen Oto Servis - Felsen Auto',
    description: 'Profesyonel kadromuz ve son teknoloji ekipmanlarımızla aracınızın tüm bakım ve onarım ihtiyaçları için yanınızdayız.',
    images: ['https://felsen.com.tr/images/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={outfit.className}>
        <Ticker />
        <Header />
        <main role="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
