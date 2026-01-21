'use client'

import { useState } from 'react'

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    const faqData = [
        {
            question: 'Bakım işlemleri ne kadar sürüyor?',
            answer: 'Standart periyodik bakım (yağ ve filtre değişimi, kontroller) ortalama 1.5 - 2 saat sürmektedir. Ancak aracınızda tespit edilen ekstra bir arıza veya parça değişimi gerekirse bu süre uzayabilir. Randevu alırken size tahmini süreyi belirtiyoruz.',
        },
        {
            question: 'Orijinal yedek parça kullanıyor musunuz?',
            answer: 'Evet, Felsen Servis olarak önceliğimiz aracınızın performansını ve güvenliğini korumaktır. Bu nedenle üretici onaylı (OEM) veya eşdeğer kalitede, garantili yedek parçalar kullanıyoruz. Talebiniz doğrultusunda farklı marka alternatifleri de sunabiliriz.',
        },
        {
            question: 'Arza tespiti (Diagnostic) ücretli mi?',
            answer: 'Onarım işleminin servisimizde yapılması durumunda arıza tespiti genellikle ücretsizdir. Sadece arıza tespiti yaptırıp onarımı yaptırmama durumunda ise cüzi bir servis bedeli alınmaktadır.',
        },
        {
            question: 'Ödeme seçenekleriniz nelerdir?',
            answer: 'Nakit, kredi kartı (taksit imkanı) ve banka havalesi ile ödeme yapabilirsiniz.',
        },
        {
            question: 'Garanti süresi nedir?',
            answer: 'Yaptığımız işçilik ve değiştirdiğimiz parçalar için 1 yıl veya 10.000 km (hangisi önce dolarsa) servis garantisi vermekteyiz.',
        },
        {
            question: 'Pazar günleri açık mısınız?',
            answer: 'Servisimiz Pazar günleri kapalıdır. Hafta içi 08:30 - 18:00, Cumartesi günleri ise 08:30 - 14:00 saatleri arasında hizmet vermekteyiz. Acil durumlar için özel yol yardım hattımızı arayabilirsiniz.',
        },
        {
            question: 'Her marka araca hizmet veriyor musunuz?',
            answer: 'Evet, veriyoruz. Marka ve model fark etmeksizin tüm araçlarınız için profesyonel bakım ve onarım hizmeti sunmaktayız.',
        },
    ]

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
                    <h1 className="reveal">Sıkça Sorulan Sorular</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Aklınıza takılan her şey burada
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container" style={{ maxWidth: '900px' }}>
                    {faqData.map((item, index) => (
                        <div key={index} className={`faq-item reveal ${activeIndex === index ? 'active' : ''}`}>
                            <div
                                className="faq-header"
                                onClick={() => toggleFAQ(index)}
                                style={{ color: activeIndex === index ? 'var(--primary)' : 'inherit' }}
                            >
                                {item.question}
                                <i className={`fas ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
                            </div>
                            <div className="faq-body">
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
