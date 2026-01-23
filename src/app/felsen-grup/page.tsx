export default function FelsenGrup() {
    return (
        <>
            <div
                className="page-header"
                style={{
                    background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/hero-bg.png') center/cover",
                    padding: '150px 0 80px',
                    textAlign: 'center',
                }}
            >
                <div className="container">
                    <h1 className="reveal">Sigorta & Araç Kiralama</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Güven ve Kalite, Sadece Serviste Değil Her Alanda
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>

                        {/* Sigorta Bölümü */}
                        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ flex: 1, minWidth: '250px', textAlign: 'center' }}>
                                <img src="/images/felsen-sigorta.png" alt="Felsen Sigorta Hizmetleri" style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }} />
                            </div>
                            <div style={{ flex: 1.5, minWidth: '250px' }}>
                                <h2 className="mb-4 text-gradient">Felsen Sigorta</h2>
                                <p style={{ fontSize: '1.1rem', color: '#bbb', marginBottom: '20px' }}>
                                    Değer verdiklerinizi koruma altına alıyoruz. Felsen Sigorta olarak, Türkiye'nin önde gelen sigorta şirketleriyle çalışarak size en kapsamlı ve en uygun fiyatlı poliçeleri sunuyoruz.
                                </p>
                                <ul style={{ marginBottom: '30px', color: '#aaa' }}>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Zorunlu Trafik Sigortası</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Genişletilmiş Kasko</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Konut ve İşyeri Sigortası</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> DASK ve Sağlık Sigortası</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Tamamlayıcı Sağlık Sigortası</li>
                                </ul>
                                <a href="tel:08503084641" className="btn-custom">
                                    <i className="fas fa-phone-alt me-2"></i> Teklif Al: 0850 308 4641
                                </a>
                            </div>
                        </div>

                        {/* Rent A Car Bölümü */}
                        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '40px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ flex: 1.5, minWidth: '250px' }}>
                                <h2 className="mb-4 text-gradient">Felsen Rent A Car</h2>
                                <p style={{ fontSize: '1.1rem', color: '#bbb', marginBottom: '20px' }}>
                                    Yolculuklarınız keyfe dönüşsün. Geniş araç filomuz, esnek kiralama seçeneklerimiz ve bakımlı araçlarımızla Felsen Rent A Car her zaman yanınızda.
                                </p>
                                <ul style={{ marginBottom: '30px', color: '#aaa' }}>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Alman Grubu (Polo, Golf, A4, BMW vb.)</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Yeni Kasa Clio, Egea ve Ekonomik Araçlar</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Kurumsal Filo Kiralama</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> 7/24 Yol Yardım Desteği</li>
                                </ul>
                                <a href="tel:08503084641" className="btn-custom">
                                    <i className="fas fa-car me-2"></i> Rezervasyon Yap: 0850 308 4641
                                </a>
                            </div>
                            <div style={{ flex: 1, minWidth: '250px', textAlign: 'center' }}>
                                <img src="/images/felsen-rentacar.png" alt="Felsen Rent A Car Araç Kiralama" style={{ width: '100%', maxWidth: '400px', objectFit: 'contain', marginBottom: '20px' }} />
                                {/* Araç Galerisi */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '10px',
                                    marginTop: '20px'
                                }}>
                                    {['fiat_tipo.jpg', 'bmw_5.jpg', 'audi_q8.jpg', 'opel_mokka.jpg'].map((car, i) => (
                                        <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '5px', overflow: 'hidden' }}>
                                            <img src={`/images/rentacar/${car}`} alt="Kiralık Araç" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Anlaşmalı Kurumlar Bölümü */}
                    <div className="reveal" style={{ marginTop: '80px', textAlign: 'center' }}>
                        <h2 className="mb-4 text-gradient">Anlaşmalı Olduğumuz Sigorta Şirketleri</h2>
                        <p style={{ fontSize: '1.1rem', color: '#bbb', marginBottom: '40px' }}>
                            Türkiye'nin en güvenilir sigorta şirketleri ile çözüm ortağıyız.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                            gap: '30px',
                            alignItems: 'center',
                            justifyItems: 'center',
                            background: 'rgba(255,255,255,0.02)',
                            padding: '40px',
                            borderRadius: '15px',
                            border: '1px solid var(--glass-border)'
                        }}>
                            {[
                                '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png',
                                '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png'
                            ].map((logo, index) => (
                                <div key={index} style={{
                                    width: '100%',
                                    height: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#fff',
                                    borderRadius: '10px',
                                    padding: '10px'
                                }}>
                                    <img
                                        src={`/images/sigorta/${logo}`}
                                        alt={`Sigorta Şirketi ${index + 1}`}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            filter: 'grayscale(0%)',
                                            transition: 'filter 0.3s'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Grup Hizmetleri Navigasyon */}
                    <div className="reveal" style={{ marginTop: '100px', padding: '40px', background: 'var(--darker)', borderRadius: '20px', textAlign: 'center' }}>
                        <h3 className="mb-4 text-gradient">Felsen Grup Dünyası</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
                            <a href="/hizmetlerimiz" className="btn-custom btn-outline" style={{ minWidth: '200px' }}>
                                <i className="fas fa-tools me-2"></i> Felsen Servis
                            </a>
                            <a href="#" className="btn-custom btn-outline" style={{ minWidth: '200px' }}>
                                <i className="fas fa-shield-alt me-2"></i> Felsen Sigorta
                            </a>
                            <a href="#" className="btn-custom btn-outline" style={{ minWidth: '200px' }}>
                                <i className="fas fa-car me-2"></i> Felsen Rent A Car
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
