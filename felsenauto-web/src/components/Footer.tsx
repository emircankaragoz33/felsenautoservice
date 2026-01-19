import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-cols">
                    <div>
                        <h4>Felsen Auto</h4>
                        <p>Felsen Oto Servis, aracınız için üst düzey bakım ve güven sunar.</p>
                    </div>
                    <div>
                        <h4>Hızlı Erişim</h4>
                        <Link href="/hizmetlerimiz">Hizmetlerimiz</Link>
                        <Link href="/hakkimizda">Hakkımızda</Link>
                        <Link href="/iletisim">İletişim</Link>
                    </div>
                    <div>
                        <h4>İletişim</h4>
                        <p>
                            <i className="fas fa-map-marker-alt text-primary"></i> Cumhuriyet mahallesi Turgut Özal
                            caddesi No 5/A Akpınar Plaza Şekerpınar Çayırova Kocaeli
                        </p>
                        <p>
                            <i className="fas fa-phone text-primary"></i> 0850 308 4641
                        </p>
                        <p>
                            <i className="fas fa-envelope text-primary"></i> info@felsen.com.tr
                        </p>
                    </div>
                </div>
                <div
                    style={{
                        textAlign: 'center',
                        borderTop: '1px solid var(--glass-border)',
                        paddingTop: '20px',
                        fontSize: '0.8rem',
                        color: '#666',
                    }}
                >
                    &copy; 2024 Felsen Auto. Tüm Hakları Saklıdır.
                </div>
            </div>
        </footer>
    )
}
