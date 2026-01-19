export default function Ticker() {
    return (
        <div className="top-ticker">
            <div className="ticker-track">
                <div className="ticker-content">
                    <span>
                        <i className="fas fa-map-marker-alt"></i> Cumhuriyet mahallesi Turgut Özal caddesi No 5/A Akpınar Plaza Şekerpınar Çayırova Kocaeli
                    </span>
                    <span>
                        <i className="fas fa-phone"></i> 0850 308 4641
                    </span>
                    <span>
                        <i className="fas fa-clock"></i> Pzt - Cuma: 08:30 - 18:30
                    </span>
                </div>
                {/* Duplicate content for seamless infinite scroll */}
                <div className="ticker-content">
                    <span>
                        <i className="fas fa-map-marker-alt"></i> Cumhuriyet mahallesi Turgut Özal caddesi No 5/A Akpınar Plaza Şekerpınar Çayırova Kocaeli
                    </span>
                    <span>
                        <i className="fas fa-phone"></i> 0850 308 4641
                    </span>
                    <span>
                        <i className="fas fa-clock"></i> Pzt - Cuma: 08:30 - 18:30
                    </span>
                </div>
            </div>
        </div>
    )
}
