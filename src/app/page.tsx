'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const videos = [
    '/videos/felsen video 1.mp4',
    '/videos/felsen video 3.mp4'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [videos.length])

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-video-wrapper">
          {videos.map((src, index) => (
            <video
              key={index}
              className={`hero-video ${index === currentVideo ? 'active' : ''}`}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={src} type="video/mp4" />
            </video>
          ))}
        </div>
        <div className="hero-content reveal">
          <h1 className="hero-title">
            Mükemmellik Standarttır <span className="text-gradient">Hoşgeldiniz</span>
          </h1>
          <p className="hero-subtitle">
            Felsen Servis olarak, aracınız için üst düzey bakım ve güven sunuyoruz.
          </p>
          <div className="hero-btns">
            <Link href="/iletisim" className="btn-custom">
              Randevu Al
            </Link>
            <Link href="/hizmetlerimiz" className="btn-custom btn-outline">
              Hizmetleri İncele
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Intro Section */}
      <section className="section-padding bg-darker">
        <div className="container">
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
            <div className="col reveal" style={{ flex: 1, minWidth: '300px' }}>
              <h5 className="text-primary">NEDEN BİZ?</h5>
              <h2>
                Teknoloji ve Uzmanlığın <br />
                Buluşma Noktası
              </h2>
              <p style={{ color: '#aaa', margin: '20px 0' }}>
                Aracınız, en değerli yatırımlarınızdan biridir. Biz, bu yatırımı korumak için en son teknoloji diyagnostik
                cihazlar ve sürekli eğitim alan uzman bir kadro ile çalışıyoruz. Şeffaf hizmet anlayışımızla, aracınıza
                yapılan her işlemi adım adım takip edebilirsiniz.
              </p>
              <ul style={{ listStyle: 'none', marginBottom: '30px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <i className="fas fa-check-circle text-primary" style={{ marginRight: '10px' }}></i> Orijinal Parça Garantisi
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <i className="fas fa-check-circle text-primary" style={{ marginRight: '10px' }}></i> Sertifikalı Teknisyenler
                </li>
              </ul>
              <Link href="/hakkimizda" className="text-primary" style={{ fontWeight: 600 }}>
                Hakkımızda Daha Fazla <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="col reveal" style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                <div className="card-glass" style={{ textAlign: 'left', padding: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <i className="fas fa-box-open service-icon" style={{ fontSize: '2rem', marginBottom: 0 }}></i>
                    <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Orijinal Yedek Parça Garantisi</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#ccc' }}>
                    Kullanılan tüm yedek parçalar üretici standartlarında olup garanti kapsamındadır.
                  </p>
                  <ul style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '10px' }}>
                    <li>• 2 Yıl Üretici Parça Garantisi</li>
                    <li>• Orijinal / OEM Parça Sertifikası</li>
                    <li>• Hatalı üretimde birebir değişim</li>
                  </ul>
                </div>

                <div className="card-glass" style={{ textAlign: 'left', padding: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <i className="fas fa-certificate service-icon" style={{ fontSize: '2rem', marginBottom: 0 }}></i>
                    <h3 style={{ fontSize: '1.3rem', margin: 0 }}>İşçilik Garantisi</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#ccc' }}>
                    Uzman kadromuz tarafından yapılan tüm işlemler servisimiz güvencesi altındadır.
                  </p>
                  <ul style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '10px' }}>
                    <li>• 1 Yıl / 10.000 KM Servis Garantisi</li>
                    <li>• Yapılan işlemlerin resmi faturası</li>
                    <li>• Bakım sonrası ücretsiz kontrol seansı</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eurorepar Section */}
      <section className="section-padding" style={{ backgroundColor: '#fff', color: '#111' }}>
        <div className="container">
          <div className="row reveal" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px' }}>
            <div className="col" style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
              <img
                src="/images/eurorepar-logo.png"
                alt="Eurorepar Car Service"
                style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
              />
            </div>
            <div className="col" style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ color: '#D35400', marginBottom: '20px' }}>Küresel Güç: Eurorepar Car Service</h2>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: 600 }}>Avrupa'nın Güvenilir Servis Ağı Artık Felsen'de!</h3>
              <p style={{ color: '#333', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Şirketimiz, uluslararası standartlarda hizmet veren <strong>Eurorepar Car Service</strong> ailesine katıldı!
                Bu iş birliği sayesinde Felsen Servis, Eurorepar'ın küresel uzmanlığına, güçlü lojistik desteğine ve her marka araç için sunduğu geniş yedek parça ürün gamına erişim sağlıyor.
              </p>
              <p style={{ color: '#555', marginTop: '15px', lineHeight: '1.6' }}>
                <i className="fas fa-check-circle" style={{ color: '#D35400', marginRight: '5px' }}></i> <strong>2 Yıl Parça ve İşçilik Garantisi</strong><br />
                <i className="fas fa-check-circle" style={{ color: '#D35400', marginRight: '5px' }}></i> <strong>Her Marka ve Model İçin Uyumlu Parçalar</strong><br />
                <i className="fas fa-check-circle" style={{ color: '#D35400', marginRight: '5px' }}></i> <strong>Uluslararası Hizmet Standartları</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Services Teaser */}
      <section className="section-padding" style={{ background: 'var(--darker)' }}>
        <div className="container">
          <h2 className="text-center mb-5 reveal">Felsen Grup Hizmetleri</h2>
          <div className="row reveal" style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              <img src="/images/logo.png" alt="Felsen Oto Servis" style={{ height: '100px', marginBottom: '20px', objectFit: 'contain' }} />
              <h3 className="mb-3">Profesyonel Araç Servisi</h3>
              <p style={{ color: '#aaa' }}>Tüm marka ve modeller için uzman kadromuzla garantili bakım, onarım ve yedek parça hizmeti.</p>
            </div>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              <img src="/images/felsen-sigorta.png" alt="Sigorta" style={{ height: '100px', marginBottom: '20px', objectFit: 'contain' }} />
              <h3 className="mb-3">Sigorta Hizmetleri</h3>
              <p style={{ color: '#aaa' }}>Aracınızı ve sizi güvence altına alıyoruz. En uygun kasko ve sigorta teklifleri.</p>
            </div>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              <img src="/images/felsen-rentacar.png" alt="Rent A Car" style={{ height: '100px', marginBottom: '20px', objectFit: 'contain' }} />
              <h3 className="mb-3">Araç Kiralama</h3>
              <p style={{ color: '#aaa' }}>Geniş araç filomuzla, güvenli ve konforlu araç kiralama hizmeti.</p>
            </div>
          </div>
          <div className="text-center mt-5 reveal">
            <Link href="/felsen-grup" className="btn-custom btn-outline">
              Detaylı Bilgi
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="section-padding"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/service-repair.png') center/cover fixed",
        }}
      >
        <div className="container text-center reveal">
          <h2>Aracınızın Performansını Zirveye Taşıyın</h2>
          <p style={{ fontSize: '1.2rem', margin: '20px auto', maxWidth: '700px', color: '#ddd' }}>
            Motor bakımı, performans tuning ve daha fazlası için uzman ekibimiz sizi bekliyor. Hemen randevunuzu
            oluşturun.
          </p>
          <Link
            href="/iletisim"
            className="btn-custom"
            style={{ fontSize: '1.1rem', padding: '15px 40px' }}
          >
            Bize Ulaşın
          </Link>
        </div>
      </section>
    </>
  )
}
