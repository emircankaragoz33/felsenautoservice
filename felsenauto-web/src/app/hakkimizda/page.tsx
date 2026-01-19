export default function About() {
    return (
        <>
            <div
                className="page-header"
                style={{
                    background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/mehmet_kaya.jpg') center/cover",
                    padding: '150px 0 80px',
                    textAlign: 'center',
                }}
            >
                <div className="container">
                    <h1 className="reveal">Hakkımızda</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Tutkumuz: Mükemmeliyet
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div className="founder-section">
                        <div className="founder-img reveal">
                            <img src="/images/mehmet_kaya.jpg" alt="Kurucu Mehmet Kaya" />
                        </div>
                        <div className="founder-text reveal">
                            <h5 className="text-primary">KURUCUMUZ</h5>
                            <h2>Mehmet Kaya</h2>
                            <div style={{ color: '#ccc', marginBottom: '20px', lineHeight: '1.8', fontSize: '0.95rem' }}>
                                <p style={{ marginBottom: '15px' }}>
                                    1979 yılında Kahramanmaraş Elbistan’da doğan Mehmet Kaya, ilköğrenimini memleketinde tamamladıktan sonra
                                    1991 yılında İstanbul’a gelerek çalışma hayatına adım attı. Otomotiv tutkusu,{' '}
                                    <strong>Temmuz 1991</strong>’de Bostancı Oto Sanayi Sitesi&apos;nde bir BMW özel servisinde çıraklıkla
                                    başladı.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>25 Haziran 1995</strong>&apos;te Renault markasıyla tanıştı ve Küçükyalı’daki yetkili serviste
                                    mesleki yolculuğuna devam etti. Girişimcilik ruhuyla, <strong>1 Temmuz 1997</strong>’de Kadosan Oto
                                    Sanayi Sitesi&apos;nde kardeşleriyle birlikte &quot;Kardeşler Renault&quot; özel servisini, ardından
                                    1999 yılında &quot;Karen Renault&quot;yu kurdu. Mart 2001&apos;de ise Karen Renault&apos;yu yetkili
                                    servis statüsüne taşıyarak kurumsallaşma yolunda büyük bir adım attı.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    2001 yılında vatani görevini ifa eden Kaya, 2002&apos;de dönüşüyle birlikte çıraklıktan ustalığa
                                    uzanan tecrübesini servis yönetimi eğitimleriyle taçlandırarak Servis Müdürü oldu. 2005 yılında evlenen
                                    ve iki erkek çocuk babası olan Mehmet Kaya, 2007&apos;de Kocaeli Çayırova’da Karen Servis&apos;i aile
                                    şirketi olarak büyüttü.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    Yaklaşık 29 yıllık Karen Renault deneyiminin ardından Temmuz 2025&apos;te ayrılarak,{' '}
                                    <strong>Ekim 2025</strong>&apos;te soyadının Almanca karşılığı olan &quot;Felsen&quot; (Kaya) ismini
                                    verdiği <strong>Felsen Motorlu Araçlar</strong>&apos;ı kurdu. Gelecekte çocuklarına miras bırakma
                                    vizyonuyla kurduğu Felsen, <strong>9 Şubat 2026</strong> tarihinde Eurorepar markasıyla anlaşarak yeni
                                    nesil teknolojiyle donatılmış, güvenilir bir otomobil onarım merkezi olarak hizmet vermeye başlamıştır.
                                </p>
                            </div>

                            <div style={{ marginTop: '30px', borderLeft: '4px solid var(--primary)', paddingLeft: '20px' }}>
                                <p style={{ fontStyle: 'italic', color: '#fff', fontSize: '1.1rem' }}>
                                    &quot;Kaliteyi yaşamak kaliteyi satın almakla başlar.&quot;
                                </p>
                                <p style={{ fontWeight: 700, marginTop: '10px' }}>- Mehmet KAYA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-darker">
                <div className="container reveal">
                    <h2 className="text-center mb-5">Değerlerimiz</h2>
                    <div
                        className="row"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '30px',
                        }}
                    >
                        <div className="card-glass text-center">
                            <i className="fas fa-hand-holding-heart text-primary" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                            <h4>Güven & Şeffaflık</h4>
                            <p style={{ color: '#999' }}>
                                Yapılan her işlemden haberdar olur, sürpriz faturalarla karşılaşmazsınız.
                            </p>
                        </div>
                        <div className="card-glass text-center">
                            <i className="fas fa-microchip text-primary" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                            <h4>İnovasyon</h4>
                            <p style={{ color: '#999' }}>
                                Otomotiv dünyasındaki son teknolojileri yakından takip eder ve uygularız.
                            </p>
                        </div>
                        <div className="card-glass text-center">
                            <i className="fas fa-users text-primary" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                            <h4>Müşteri Odaklılık</h4>
                            <p style={{ color: '#999' }}>Sizin ihtiyaçlarınız ve beklentileriniz bizim önceliğimizdir.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
