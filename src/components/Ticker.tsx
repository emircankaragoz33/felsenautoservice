export default function Ticker() {
    return (
        <div className="top-ticker">
            <div className="ticker-track">
                <div className="ticker-content">
                    <span>
                        <i className="fas fa-map-marker-alt"></i> Şekerpınar Mahallesi, Turgut Özdal Cad. No:5A Çayırova/KOCAELİ
                    </span>
                    <span>
                        <i className="fas fa-phone"></i> <a href="tel:08503084641" style={{ color: 'inherit' }}>0850 308 4641</a>
                    </span>
                    <span>
                        <i className="fas fa-clock"></i> Hafta içi: 08:30 - 18:00 | Cmt: 08:30 - 14:00
                    </span>
                </div>
                {/* Duplicate content for seamless infinite scroll */}
                <div className="ticker-content">
                    <span>
                        <i className="fas fa-map-marker-alt"></i> Şekerpınar Mahallesi, Turgut Özdal Cad. No:5A Çayırova/KOCAELİ
                    </span>
                    <span>
                        <i className="fas fa-phone"></i> <a href="tel:08503084641" style={{ color: 'inherit' }}>0850 308 4641</a>
                    </span>
                    <span>
                        <i className="fas fa-clock"></i> Hafta içi: 08:30 - 18:00 | Cmt: 08:30 - 14:00
                    </span>
                </div>
            </div>
        </div>
    )
}
