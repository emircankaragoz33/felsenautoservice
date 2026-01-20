import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Ticker from '@/components/Ticker'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Felsen Oto Servis - Kocaeli Çayırova Premium Araç Bakımı',
  description: 'Felsen Oto Servis, Kocaeli Çayırova\'da premium araç bakımı, motor onarımı, kaporta boya ve profesyonel servis hizmetleri sunar. BMW, Mercedes, Audi profesyonel servisi.',
  keywords: "felsen, felsen auto, felsen oto servis, oto servis çayırova, oto servis kocaeli, araç bakımı, motor onarımı, bmw servisi, mercedes servisi, audi servisi, kocaeli oto tamir, premium oto servis",
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
