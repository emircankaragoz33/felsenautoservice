export interface BlogPost {
    id: number
    title: string
    content: string
    imageUrl?: string
    createdDate: string
}

export const blogs: BlogPost[] = [
    {
        id: 1,
        title: 'Kış Aylarında Araç Bakımının Önemi',
        content: 'Kışın zorlu hava koşullarına girmeden önce aracınızın fren, lastik ve antifriz kontrollerini yaptırarak güvenli bir sürüş deneyimi yaşayın. Felsen Oto Servis olarak kış bakımlarınızı titizlikle gerçekleştiriyoruz. Kış lastiği değişimi, silecek suyu ve antifriz kontrolü, akü ölçümü gibi işlemler kışa girmeden mutlaka yapılmalıdır. Soğuk havalarda motorun çalışması zorlaşabilir, bu nedenle yağ değişimi ve filtre kontrolleri de önemlidir.',
        imageUrl: '/images/service-maintenance.png',
        createdDate: '2025-11-10',
    },
    {
        id: 2,
        title: 'Motor Yağı Ne Zaman Değiştirilmeli?',
        content: 'Motorunuzun ömrünü uzatmak için periyodik yağ değişimi hayati önem taşır. Genellikle 10.000 - 15.000 km arasında veya yılda bir kez değişim önerilmektedir. Kaliteli yağ kullanımı performansı artırır. Motor yağı, motor parçaları arasındaki sürtünmeyi azaltır ve aşınmayı önler. Eski ve kirlenmiş yağ, motorun performansını düşürür ve yakıt tüketimini artırır. Felsen Oto Servis`te aracınıza uygun, üretici onaylı yağlar kullanılmaktadır.',
        imageUrl: '/images/service_engine.png',
        createdDate: '2025-11-25',
    },
    {
        id: 3,
        title: 'Fren Sistemi Arızaları ve Çözümleri',
        content: 'Frenlerden gelen sesler, pedalda yumuşama veya titreme gibi belirtiler ciddiye alınmalıdır. Fren balata ve disklerinizin durumunu Felsen Oto Servis uzmanlarına ücretsiz kontrol ettirebilirsiniz. Fren hidroliği seviyesi ve kalitesi de düzenli olarak kontrol edilmelidir. Fren sistemindeki en ufak bir aksaklık, güvenli sürüşü tehlikeye atabilir.',
        imageUrl: '/images/service_brakes.png',
        createdDate: '2025-12-05',
    },
    {
        id: 4,
        title: 'Akü Ömrünü Uzatmanın Püf Noktaları',
        content: 'Soğuk havalarda akünüzün performans düşüklüğü yaşamaması için neler yapmalısınız? Akü bakımı, şarj durumu kontrolü ve doğru kullanım teknikleri hakkında bilmeniz gerekenler. Aracınızı uzun süre çalıştırmadığınızda akü zayıflayabilir. Felsen Oto Servis, Mutlu Akü yetkili bayisi olarak akü değişim ve ölçüm işlemlerinizi garantili bir şekilde yapmaktadır.',
        imageUrl: '/images/service_battery.png',
        createdDate: '2025-12-15',
    },
    {
        id: 5,
        title: 'Lastik Basıncı ve Yakıt Tasarrufu',
        content: 'Doğru lastik basıncı hem güvenliğinizi sağlar hem de yakıt tüketimini ideal seviyede tutar. Düşük basınç lastiklerinizi yıpratırken cebinize de zarar verir. Lastik hava basınçlarını ayda en az bir kez kontrol etmelisiniz. Mevsim geçişlerinde lastik değişimi ve rot balans ayarı yaptırmayı unutmayın.',
        imageUrl: '/images/service_tires.png',
        createdDate: '2025-12-28',
    },
    {
        id: 6,
        title: 'Periyodik Bakımda Neler Yapılır?',
        content: 'Felsen Oto Servis periyodik bakım paketlerinde yağ filtresi, hava filtresi, polen filtresi değişimi ve 42 nokta kontrolü standarttır. Aracınızın sağlığı için ihmal etmeyin. Düzenli bakım, ileride oluşabilecek büyük arızaların önüne geçer ve aracınızın ikinci el değerini korur.',
        imageUrl: '/images/service_diagnostics.png',
        createdDate: '2026-01-05',
    },
    {
        id: 7,
        title: 'Triger Kayışı Ne İşe Yarar?',
        content: 'Motorun senkronizasyonunu sağlayan triger kayışı koptuğunda motorda büyük hasarlar oluşabilir. Belirli kilometre aralıklarında (60.000 - 90.000 km) mutlaka değiştirilmelidir. Triger seti değişimi uzmanlık gerektiren bir işlemdir ve Felsen Oto Servis`te garantili olarak yapılmaktadır.',
        imageUrl: '/images/service_alignment.png',
        createdDate: '2026-01-08',
    },
    {
        id: 8,
        title: 'Egzoz Emisyonu ve Çevre Duyarlılığı',
        content: 'Aracınızın egzoz sistemindeki arızalar hem performansı düşürür hem de çevreye zarar verir. Muayene öncesi egzoz emisyon ölçümlerinizi yaptırmayı unutmayın. Katalitik konvertör ve partikül filtresi temizliği de emisyon değerlerini iyileştirir.',
        imageUrl: '/images/service_inspection.png',
        createdDate: '2026-01-12',
    },
    {
        id: 9,
        title: 'Pasta Cila ve Boya Koruma',
        content: 'Aracınızın ilk günkü parlaklığına kavuşması için profesyonel pasta cila ve seramik kaplama uygulamalarımızı keşfedin. Güneş yanıkları ve çiziklere karşı tam koruma. Kullandığımız kaliteli ürünler sayesinde aracınızın boyası uzun süre korunur.',
        imageUrl: '/images/hero-bg.png',
        createdDate: '2026-01-15',
    },
    {
        id: 10,
        title: 'Oto Klima Bakımı ve Gaz Dolumu',
        content: 'Klimanızın verimli çalışması ve kötü kokuların giderilmesi için yıllık klima temizliği ve gaz kontrolü şarttır. Yaz sıcağında konforunuzdan ödün vermeyin. Klima kompresörü ve polen filtresi kontrolü de bakımın önemli parçalarıdır.',
        imageUrl: '/images/service_ac.png',
        createdDate: '2026-01-18',
    },
]
