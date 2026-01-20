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
                        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
                                <img src="/images/felsen-sigorta.png" alt="Felsen Sigorta Hizmetleri" style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }} />
                            </div>
                            <div style={{ flex: 1.5, minWidth: '300px' }}>
                                <h2 className="mb-4 text-gradient">Felsen Sigorta</h2>
                                <p style={{ fontSize: '1.1rem', color: '#bbb', marginBottom: '20px' }}>
                                    Değer verdiklerinizi koruma altına alıyoruz. Felsen Sigorta olarak, Türkiye'nin önde gelen sigorta şirketleriyle çalışarak size en kapsamlı ve en uygun fiyatlı poliçeleri sunuyoruz.
                                </p>
                                <ul style={{ marginBottom: '30px', color: '#aaa' }}>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Zorunlu Trafik Sigortası</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Genişletilmiş Kasko</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Konut ve İşyeri Sigortası</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> DASK ve Sağlık Sigortası</li>
                                </ul>
                                <a href="tel:08503084641" className="btn-custom">
                                    <i className="fas fa-phone-alt me-2"></i> Teklif Al: 0850 308 4641
                                </a>
                            </div>
                        </div>

                        {/* Rent A Car Bölümü */}
                        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '40px', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ flex: 1.5, minWidth: '300px' }}>
                                <h2 className="mb-4 text-gradient">Felsen Rent A Car</h2>
                                <p style={{ fontSize: '1.1rem', color: '#bbb', marginBottom: '20px' }}>
                                    Yolculuklarınız keyfe dönüşsün. Geniş araç filomuz, esnek kiralama seçeneklerimiz ve bakımlı araçlarımızla Felsen Rent A Car her zaman yanınızda.
                                </p>
                                <ul style={{ marginBottom: '30px', color: '#aaa' }}>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Günlük, Haftalık, Aylık Kiralama</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Son Model Lüks ve Ekonomik Araçlar</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> Kurumsal Filo Kiralama</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle text-primary me-2"></i> 7/24 Yol Yardım Desteği</li>
                                </ul>
                                <a href="tel:08503084641" className="btn-custom">
                                    <i className="fas fa-car me-2"></i> Rezervasyon Yap: 0850 308 4641
                                </a>
                            </div>
                            <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
                                <img src="/images/felsen-rentacar.png" alt="Felsen Rent A Car Araç Kiralama" style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
