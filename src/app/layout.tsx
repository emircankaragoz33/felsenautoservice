import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Ticker from '@/components/Ticker'
import ChatbotWidget from '@/components/ChatbotWidget'

const outfit = Outfit({ subsets: ['latin'] })
const siteUrl = 'https://felsen.com.tr'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Felsen Servis | Felsen Oto Servis Kocaeli Cayırova',
    template: '%s | Felsen Servis',
  },
  description: 'Felsen Servis; Kocaeli Çayırova bölgesinde BMW, Mercedes, Audi gibi premium markalara mekanik bakım, onarım, yedek parça, sigorta ve rent a car hizmeti sunan profesyonel tek adres.',
  applicationName: 'Felsen Servis',
  category: 'Automotive',
  keywords: ['felsen', 'felsen servis', 'felsen oto servis', 'felsen auto', 'kocaeli oto servis', 'çayırova oto servis', 'gebze oto servis', 'bmw servisi kocaeli', 'mercedes servisi kocaeli', 'audi servisi kocaeli', 'felsen rent a car', 'felsen sigorta'],
  authors: [{ name: "Felsen Servis" }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Felsen Servis',
    locale: 'tr_TR',
    title: 'Felsen Servis | Profesyonel Araç Bakım, Onarım, Sigorta ve Kiralama',
    description: 'Profesyonel kadromuz ve son teknoloji ekipmanlarımızla aracınızın tüm bakım ve onarım ihtiyaçları için yanınızdayız.',
    images: [
      {
        url: `${siteUrl}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Felsen Servis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felsen Servis',
    description: 'Kocaeli Çayırova bölgesinde profesyonel oto servis, sigorta ve araç kiralama hizmetleri.',
    images: [`${siteUrl}/images/logo.png`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Felsen Servis',
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      sameAs: [
        'https://www.instagram.com/felsenservis/',
      ],
    },
    {
      '@type': 'AutoRepair',
      '@id': `${siteUrl}/#autorepair`,
      name: 'Felsen Servis',
      image: `${siteUrl}/images/logo.png`,
      url: siteUrl,
      telephone: '+90-850-308-4641',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sekerpinar Mahallesi Turgut Ozal Caddesi No 5/A Akpinar Plaza',
        addressLocality: 'Cayirova',
        addressRegion: 'Kocaeli',
        addressCountry: 'TR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:30',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:30',
          closes: '14:00',
        },
      ],
      priceRange: '$$',
      areaServed: ['Kocaeli', 'Gebze', 'Cayirova'],
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={outfit.className}>
        <Ticker />
        <Header />
        <main role="main">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  )
}
