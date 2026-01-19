import Link from 'next/link'

interface BlogPost {
    id: number
    title: string
    content: string
    imageUrl?: string
    createdDate: string
}

const blogs: BlogPost[] = [
    {
        id: 1,
        title: 'Kış Aylarında Araç Bakımının Önemi',
        content: 'Kışın zorlu hava koşullarına girmeden önce aracınızın fren, lastik ve antifriz kontrollerini yaptırarak güvenli bir sürüş deneyimi yaşayın. Felsen Oto Servis olarak kış bakımlarınızı titizlikle gerçekleştiriyoruz.',
        imageUrl: '/images/service-maintenance.png',
        createdDate: '2025-11-10',
    },
    {
        id: 2,
        title: 'Motor Yağı Ne Zaman Değiştirilmeli?',
        content: 'Motorunuzun ömrünü uzatmak için periyodik yağ değişimi hayati önem taşır. Genellikle 10.000 - 15.000 km arasında veya yılda bir kez değişim önerilmektedir. Kaliteli yağ kullanımı performansı artırır.',
        imageUrl: '/images/service_engine.png',
        createdDate: '2025-11-25',
    },
    {
        id: 3,
        title: 'Fren Sistemi Arızaları ve Çözümleri',
        content: 'Frenlerden gelen sesler, pedalda yumuşama veya titreme gibi belirtiler ciddiye alınmalıdır. Fren balata ve disklerinizin durumunu Felsen Oto Servis uzmanlarına ücretsiz kontrol ettirebilirsiniz.',
        imageUrl: '/images/service_brakes.png',
        createdDate: '2025-12-05',
    },
    {
        id: 4,
        title: 'Akü Ömrünü Uzatmanın Püf Noktaları',
        content: 'Soğuk havalarda akünüzün performans düşüklüğü yaşamaması için neler yapmalısınız? Akü bakımı, şarj durumu kontrolü ve doğru kullanım teknikleri hakkında bilmeniz gerekenler.',
        imageUrl: '/images/service_battery.png',
        createdDate: '2025-12-15',
    },
    {
        id: 5,
        title: 'Lastik Basıncı ve Yakıt Tasarrufu',
        content: 'Doğru lastik basıncı hem güvenliğinizi sağlar hem de yakıt tüketimini ideal seviyede tutar. Düşük basınç lastiklerinizi yıpratırken cebinize de zarar verir.',
        imageUrl: '/images/service_tires.png',
        createdDate: '2025-12-28',
    },
    {
        id: 6,
        title: 'Periyodik Bakımda Neler Yapılır?',
        content: 'Felsen Oto Servis periyodik bakım paketlerinde yağ filtresi, hava filtresi, polen filtresi değişimi ve 42 nokta kontrolü standarttır. Aracınızın sağlığı için ihmal etmeyin.',
        imageUrl: '/images/service_diagnostics.png',
        createdDate: '2026-01-05',
    },
    {
        id: 7,
        title: 'Triger Kayışı Ne İşe Yarar?',
        content: 'Motorun senkronizasyonunu sağlayan triger kayışı koptuğunda motorda büyük hasarlar oluşabilir. Belirli kilometre aralıklarında (60.000 - 90.000 km) mutlaka değiştirilmelidir.',
        imageUrl: '/images/service_alignment.png',
        createdDate: '2026-01-08',
    },
    {
        id: 8,
        title: 'Egzoz Emisyonu ve Çevre Duyarlılığı',
        content: 'Aracınızın egzoz sistemindeki arızalar hem performansı düşürür hem de çevreye zarar verir. Muayene öncesi egzoz emisyon ölçümlerinizi yaptırmayı unutmayın.',
        imageUrl: '/images/service_inspection.png',
        createdDate: '2026-01-12',
    },
    {
        id: 9,
        title: 'Pasta Cila ve Boya Koruma',
        content: 'Aracınızın ilk günkü parlaklığına kavuşması için profesyonel pasta cila ve seramik kaplama uygulamalarımızı keşfedin. Güneş yanıkları ve çiziklere karşı tam koruma.',
        imageUrl: '/images/hero-bg.png',
        createdDate: '2026-01-15',
    },
    {
        id: 10,
        title: 'Oto Klima Bakımı ve Gaz Dolumu',
        content: 'Klimanızın verimli çalışması ve kötü kokuların giderilmesi için yıllık klima temizliği ve gaz kontrolü şarttır. Yaz sıcağında konforunuzdan ödün vermeyin.',
        imageUrl: '/images/service_ac.png',
        createdDate: '2026-01-18',
    },
]

export default function Blog() {
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
                    <h1 className="reveal">Blog & Haberler</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Otomotiv dünyasından en güncel bilgiler
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
                        {blogs.length === 0 ? (
                            <div className="col-12 text-center" style={{ color: '#aaa' }}>
                                <p>Henüz blog yazısı bulunmamaktadır.</p>
                            </div>
                        ) : (
                            blogs.map((item) => (
                                <div key={item.id} className="card-glass reveal" style={{ padding: 0, overflow: 'hidden' }}>
                                    <img
                                        src={item.imageUrl || '/images/default-blog.png'}
                                        alt={item.title}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '25px' }}>
                                        <span className="text-primary" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                            {new Date(item.createdDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}
                                        </span>
                                        <h3 style={{ margin: '10px 0' }}>{item.title}</h3>
                                        <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '20px' }}>
                                            {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
                                        </p>
                                        <Link href={`/blog/${item.id}`} className="text-primary">
                                            Devamını Oku <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
