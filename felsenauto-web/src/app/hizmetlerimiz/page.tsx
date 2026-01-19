import Link from 'next/link'

export default function Services() {
    return (
        <>
            <div
                className="page-header"
                style={{
                    background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/service-maintenance.png') center/cover",
                    padding: '150px 0 80px',
                    textAlign: 'center',
                }}
            >
                <div className="container">
                    <h1 className="reveal">Hizmetlerimiz</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Aracınız için sunduğumuz profesyonel çözümler
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div
                        className="row"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '40px',
                        }}
                    >
                        {/* Service Item 1: Motor Mekanik Bakım ve Onarımı */}
                        <div className="card-glass reveal">
                            <img
                                src="/images/service_engine.png"
                                alt="Motor Mekanik Bakım ve Onarımı"
                                className="service-img"
                            />
                            <h3>Motor Mekanik Bakım ve Onarımı</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Aracınızın kalbi olan motorunuz için rektifiye, triger seti değişimi ve genel mekanik bakım işlemlerini
                                uzman ekibimizle garantili olarak gerçekleştiriyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Motor Yenileme & Rektifiye
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Şanzıman Onarımı
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Periyodik Bakım
                                </li>
                            </ul>
                        </div>

                        {/* Service Item 2: Arıza Teşhis ve Onarımı */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.1s' }}>
                            <img
                                src="/images/service_diagnostics.png"
                                alt="Arıza Teşhis ve Onarımı"
                                className="service-img"
                            />
                            <h3>Arıza Teşhis ve Onarımı</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Yeni nesil lisanslı diyagnostik cihazlarımızla aracınızdaki elektronik ve mekanik arızaları nokta atışı
                                tespit ediyor, gereksiz parça değişiminin önüne geçiyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Bilgisayarlı Arıza Tespiti
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Canlı Veri Analizi
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Sensör & Beyin Kontrolü
                                </li>
                            </ul>
                        </div>

                        {/* Service Item 3: Ön Takım Ve Fren Onarımı */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.2s' }}>
                            <img
                                src="/images/service_brakes.png"
                                alt="Ön Takım Ve Fren Onarımı"
                                className="service-img"
                            />
                            <h3>Ön Takım Ve Fren Onarımı</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Sürüş güvenliğiniz için ön takım, süspansiyon ve fren sistemlerinizin bakımını orijinal yedek parçalarla
                                titizlikle yapıyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Fren Balata & Disk Değişimi
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Amortisör & Yay Kontrolü
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Alt Takım Bakımı
                                </li>
                            </ul>
                        </div>

                        {/* Service Item 4: Klima Bakım ve Onarım */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.3s' }}>
                            <img src="/images/service_ac.png" alt="Klima Bakım ve Onarım" className="service-img" />
                            <h3>Klima Bakım ve Onarım</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Klima gazı dolumu, kompresör tamiri ve sistem temizliği ile aracınızın iklimlendirme performansını ilk
                                günkü haline getiriyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Gaz Dolumu & Kaçak Testi
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Kompresör Tamiri
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Ozonla Dezenfeksiyon
                                </li>
                            </ul>
                        </div>

                        {/* Service Item 5: Fenni Muayene Öncesi Hazırlık */}
                        <div className="card-glass reveal">
                            <img
                                src="/images/service_inspection.png"
                                alt="Fenni Muayene Öncesi Hazırlık"
                                className="service-img"
                            />
                            <h3>Fenni Muayene Öncesi Hazırlık</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Aracınızın TÜVTÜRK muayenesinden tek seferde geçebilmesi için gerekli tüm kontrolleri yapıyor,
                                eksiklikleri gideriyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Fren & Far Testi
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Alt Takım & Lastik Kontrolü
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Egzoz Emisyon Hazırlığı
                                </li>
                            </ul>
                        </div>

                        {/* Service Item 6: Rot Balans */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.1s' }}>
                            <img src="/images/service_alignment.png" alt="Rot Balans" className="service-img" />
                            <h3>Rot Balans</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Lastik ömrünü uzatmak, yakıt tasarrufu sağlamak ve sürüş konforunu artırmak için hassas rot ve balans
                                ayarlarınızı yapıyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Bilgisayarlı Rot Ayarı
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Lastik Balans Ayarı
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Jant Düzeltme
                                </li>
                            </ul>
                        </div>

                        {/* Service Item 7: Akü */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.2s' }}>
                            <img src="/images/service_battery.png" alt="Akü" className="service-img" />
                            <h3>Akü</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Aracınızın çalışmama riskini ortadan kaldırın. Akü durumunuzu ölçüyor, şarj ediyor veya garantili olarak
                                yenisiyle değiştiriyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Akü Voltaj Testi
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Şarj Dinamosu Kontrolü
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Mutlu/Varta/İnci Akü Değişimi
                                </li>
                            </ul>
                        </div>

                        {/* Service Item 8: Lastik */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.3s' }}>
                            <img src="/images/service_tires.png" alt="Lastik" className="service-img" />
                            <h3>Lastik</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Mevsime uygun lastik seçimi, değişimi ve tamiri ile yol tutuşunuzu en üst seviyeye çıkarıyoruz. Lastik
                                oteli hizmetimiz de mevcuttur.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Lastik Değişimi & Montaj
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Lastik Tamiri
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Lastik Oteli & Saklama
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-5 reveal">
                        <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '20px' }}>
                            Özel bir sorununuz mu var? Bize danışın, çözüm üretelim.
                        </p>
                        <Link href="/iletisim" className="btn-custom">
                            Hemen Randevu Al
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
