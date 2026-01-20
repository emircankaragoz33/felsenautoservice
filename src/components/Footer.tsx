import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-cols">
                    <div>
                        <h4>Felsen Auto</h4>
                        <p>Felsen Oto Servis, aracınız için üst düzey bakım ve güven sunar.</p>
                        <div style={{ marginTop: '15px' }}>
                            <a href="https://instagram.com/felsen_atuto" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.5rem', transition: 'color 0.3s' }} className="social-link">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
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
                            <i className="fas fa-map-marker-alt text-primary"></i> Şekerpınar Mahallesi, Turgut Özdal Cad. No:5A Çayırova/KOCAELİ
                        </p>
                        <p>
                            <i className="fas fa-phone text-primary"></i> <a href="tel:08503084641" style={{ color: 'inherit', textDecoration: 'none' }}>0850 308 4641</a>
                        </p>
                        <p>
                            <i className="fas fa-envelope text-primary"></i> <a href="mailto:info@felsen.com.tr" style={{ color: 'inherit', textDecoration: 'none' }}>info@felsen.com.tr</a>
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
