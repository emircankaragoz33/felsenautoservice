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
                        {/* Service Item: Arıza Teşhis ve Onarımı */}
                        <div className="card-glass reveal">
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

                        {/* Service Item: Ön Takım ve Süspansiyon */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.1s' }}>
                            <img
                                src="/images/service_suspension.png"
                                alt="Ön Takım ve Süspansiyon"
                                className="service-img"
                            />
                            <h3>Ön Takım ve Süspansiyon</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Aracınızın yol tutuşunu ve sürüş konforunu etkileyen alt takım, amortisör ve diğer süspansiyon parçalarının
                                bakımını uzmanlıkla yapıyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Alt Takım Kontrolü
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Amortisör & Yay Değişimi
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Salıncak & Rotil Kontrolü
                                </li>
                            </ul>
                        </div>

                        {/* Service Item: Fren Sistemleri Bakım ve Onarımı */}
                        <div className="card-glass reveal" style={{ animationDelay: '0.2s' }}>
                            <img
                                src="/images/service_brakes.png"
                                alt="Fren Sistemleri Bakım ve Onarımı"
                                className="service-img"
                            />
                            <h3>Fren Sistemleri Bakım ve Onarımı</h3>
                            <p style={{ color: '#aaa', margin: '15px 0' }}>
                                Sürüş güvenliğiniz için fren balata, disk ve hidrolik sistemlerinin kontrolünü ve değişimini
                                orijinal parçalarla yapıyoruz.
                            </p>
                            <h4 className="text-primary mt-3">Kapsam:</h4>
                            <ul style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '10px', lineHeight: '1.8' }}>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Fren Balata & Disk Değişimi
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> ABS Sistem Kontrolü
                                </li>
                                <li>
                                    <i className="fas fa-check text-primary"></i> Fren Hidroliği Testi
                                </li>
                            </ul>
                        </div>

                        {/* Service Item: Klima Bakım ve Onarım */}
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

                        {/* Service Item: Fenni Muayene Öncesi Hazırlık */}
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

                        {/* Service Item: Rot Balans */}
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

                        {/* Service Item: Akü */}
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
                                    <i className="fas fa-check text-primary"></i> Akü Değişimi
                                </li>
                            </ul>
                        </div>

                        {/* Service Item: Lastik */}
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
                                    <i className="fas fa-check text-primary"></i> Lastik Balans Ayarı
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
