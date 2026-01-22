import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Kariyer Fırsatları - Felsen Servis',
    description: 'Felsen Servis ailesine katılmak ve kariyerinizde yeni bir sayfa açmak için açık pozisyonlarımızı inceleyin.',
}

export default function Career() {
    return (
        <>
            <div
                className="page-header"
                style={{
                    background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/hero-bg.png') center/cover",
                    padding: '150px 0 80px',
                    textAlign: 'center',
                }}
            >
                <div className="container">
                    <h1 className="reveal">Kariyer Fırsatları</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Uzman ekibimizin bir parçası olmak ister misiniz?
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div className="row reveal" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '30px',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <div className="card-glass" style={{ padding: '40px', width: '100%' }}>
                            <i className="fas fa-users text-primary" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                            <h2 style={{ marginBottom: '20px' }}>Aramıza Katılın</h2>
                            <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6' }}>
                                Felsen Servis olarak sürekli büyüyen ve güçlenen kadromuzda yer almak, uluslararası standartlarda hizmet veren bir ekibin parçası olmak isterseniz başvurularınızı bekliyoruz.
                            </p>

                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                                <h4 style={{ marginBottom: '15px' }}>Değerlerimiz</h4>
                                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', display: 'inline-block' }}>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check text-primary" style={{ marginRight: '10px' }}></i> Sürekli Gelişim ve Eğitim</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check text-primary" style={{ marginRight: '10px' }}></i> Takım Çalışması</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check text-primary" style={{ marginRight: '10px' }}></i> Müşteri Odaklılık</li>
                                    <li style={{ marginBottom: '10px' }}><i className="fas fa-check text-primary" style={{ marginRight: '10px' }}></i> Profesyonellik</li>
                                </ul>
                            </div>

                            <p style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px' }}>
                                CV'nizi bize iletin:
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                                <a
                                    href="mailto:info@felsen.com.tr"
                                    className="btn-custom"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}
                                >
                                    <i className="fas fa-envelope"></i> info@felsen.com.tr
                                </a>
                            </div>
                            <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#888' }}>
                                *Başvurunuz İnsan Kaynakları departmanımız tarafından titizlikle incelenecektir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
