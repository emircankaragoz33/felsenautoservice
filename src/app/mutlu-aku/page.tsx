'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function MutluAkuPage() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero" style={{
                minHeight: '60vh',
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(/images/battery-service.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                <div className="container hero-content">
                    <div className="reveal">
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', backdropFilter: 'blur(10px)', display: 'inline-block', marginBottom: '30px' }}>
                            <Image
                                src="/images/mutlu-aku-logo.png"
                                alt="Mutlu Akü Logo"
                                width={300}
                                height={100}
                                style={{ height: 'auto', maxWidth: '100%' }}
                            />
                        </div>
                        <h1 className="hero-title">
                            <span className="text-primary">Mutlu Akü</span> Yetkili Bayii
                        </h1>
                        <p className="hero-subtitle">
                            Aracınızın kalbi emin ellerde. Yeni nesil Mutlu Akü ürünleri ve profesyonel montaj hizmeti Felsen Servis'te.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="#contact" className="btn-custom">
                                Hemen Randevu Al
                            </Link>
                            <Link href="tel:08503084641" className="btn-custom btn-outline">
                                <i className="fas fa-phone-alt" style={{ marginRight: '8px' }}></i>
                                Bizi Ara
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 className="reveal"><span className="text-primary">Güçlü</span> Başlangıçlar İçin</h2>
                        <p className="reveal" style={{ maxWidth: '700px', margin: '0 auto', color: '#ccc' }}>
                            Felsen Servis güvencesiyle, Türkiye'nin lider akü markası Mutlu Akü'nün üstün performanslı ürünlerine ulaşın.
                            Yerinde değişim, ücretsiz test ve garantili satış hizmetimizle yanınızdayız.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {/* Card 1: Shop */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.1s' }}>
                            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '8px', marginBottom: '20px', background: 'rgba(255,255,255,0.05)' }}>
                                <Image
                                    src="/images/mutlu-aku-logo.png"
                                    alt="Mutlu Akü Yetkili Satış Noktası"
                                    width={400}
                                    height={300}
                                    style={{ width: '90%', height: 'auto', objectFit: 'contain' }}
                                    className="hover-zoom"
                                />
                            </div>
                            <h3>Yetkili Satış Noktası</h3>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '10px' }}>
                                Orijinal ürün garantisi ve yetkili bayi güvencesiyle aracınıza en uygun aküyü buluyoruz.
                            </p>
                        </div>

                        {/* Card 2: SFB Product */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.2s' }}>
                            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '8px', marginBottom: '20px', background: 'rgba(255,255,255,0.05)' }}>
                                <Image
                                    src="/images/mutlu-sfb-1.png"
                                    alt="Mutlu Akü SFB Serisi"
                                    width={400}
                                    height={300}
                                    style={{ width: 'auto', height: '90%', objectFit: 'contain' }}
                                    className="hover-zoom"
                                />
                            </div>
                            <h3>SFB Teknolojisi</h3>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '10px' }}>
                                Standart araçlar için üstün performans, yüksek çevrim ömrü ve güvenilir marş basma gücü.
                            </p>
                        </div>

                        {/* Card 3: EFB Product */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.3s' }}>
                            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '8px', marginBottom: '20px', background: 'rgba(255,255,255,0.05)' }}>
                                <Image
                                    src="/images/mutlu-efb.png"
                                    alt="Mutlu Akü EFB Start-Stop"
                                    width={400}
                                    height={300}
                                    style={{ width: 'auto', height: '90%', objectFit: 'contain' }}
                                    className="hover-zoom"
                                />
                            </div>
                            <h3>EFB Start-Stop</h3>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '10px' }}>
                                Start-Stop teknolojisine sahip araçlar için özel olarak geliştirilmiş güçlendirilmiş iç yapı.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Mutlu Aku Section */}
            <section className="section-padding bg-darker">
                <div className="container">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '50px',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: '1', minWidth: '300px' }} className="reveal">
                            <h2>Neden <span className="text-primary">Mutlu Akü?</span></h2>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <i className="fas fa-check-circle text-primary" style={{ fontSize: '1.2rem' }}></i>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Uzun Ömürlü</h4>
                                        <p style={{ color: '#888', fontSize: '0.9rem' }}>Zorlu hava koşullarına dayanıklı, uzun kullanım ömrü.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <i className="fas fa-bolt text-primary" style={{ fontSize: '1.2rem' }}></i>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Yüksek Marş Gücü</h4>
                                        <p style={{ color: '#888', fontSize: '0.9rem' }}>Her türlü yol şartında maksimum performans.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <i className="fas fa-shield-alt text-primary" style={{ fontSize: '1.2rem' }}></i>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Tam Bakımsız</h4>
                                        <p style={{ color: '#888', fontSize: '0.9rem' }}>Su ekleme gerektirmeyen gelişmiş kapak teknolojisi.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* Contact Preview Section */}
            <section id="contact" className="section-padding" style={{ background: 'linear-gradient(to top, #000, var(--dark))' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="reveal">Bize Ulaşın</h2>
                    <p className="reveal" style={{ color: '#ccc', marginBottom: '40px' }}>
                        Felsen Servis Mutlu Akü Yetkili Satış Noktası
                    </p>

                    <div className="card-glass reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                            <i className="fas fa-map-marker-alt text-primary" style={{ marginRight: '10px' }}></i>
                            Şekerpınar Mahallesi Turgut Özal Caddesi No 5/A Akpınar Plaza Şekerpınar Çayırova Kocaeli. (Yapıteknik Yanı)
                        </p>
                        <p style={{ fontSize: '1.2rem' }}>
                            <i className="fas fa-phone text-primary" style={{ marginRight: '10px' }}></i>
                            0850 308 4641
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
