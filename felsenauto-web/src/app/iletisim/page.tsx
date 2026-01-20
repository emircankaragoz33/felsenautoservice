'use client'

import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        CustomerName: '',
        CustomerPhone: '',
        CustomerEmail: '',
        ServiceType: 'Genel',
        CarModel: '',
        AppointmentDate: '',
        Notes: '',
    })
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (res.ok) {
                setMessage({ type: 'success', text: 'Randevu talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçilecektir.' })
                // Reset form
                setFormData({
                    CustomerName: '',
                    CustomerPhone: '',
                    CustomerEmail: '',
                    ServiceType: 'Genel',
                    CarModel: '',
                    AppointmentDate: '',
                    Notes: '',
                })
            } else {
                setMessage({ type: 'error', text: data?.message || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Sunucu bağlantı hatası. Lütfen internet bağlantınızı kontrol ediniz.' })
        }
    }

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
                    <h1 className="reveal">Bize Ulaşın</h1>
                    <p className="reveal" style={{ fontSize: '1.2rem', color: '#ccc' }}>
                        Sorularınız ve randevu talepleriniz için buradayız
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
                        <div className="col-12">
                            {message && (
                                <div
                                    className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}
                                    role="alert"
                                    style={{
                                        backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                                        color: message.type === 'success' ? '#155724' : '#721c24',
                                        padding: '15px',
                                        borderRadius: '5px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    {message.text}
                                </div>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="col reveal" style={{ flex: 1, minWidth: '300px' }}>
                            <h2 className="mb-4">İletişim Bilgileri</h2>
                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'start', marginBottom: '20px' }}>
                                    <i
                                        className="fas fa-map-marker-alt text-primary"
                                        style={{ fontSize: '1.5rem', marginTop: '5px', marginRight: '20px', width: '30px' }}
                                    ></i>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>Adresimiz</h4>
                                        <p style={{ color: '#aaa' }}>
                                            Şekerpınar Mahallesi, Turgut Özdal Cad. No:5A
                                            <br />
                                            Çayırova/KOCAELİ
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                    <i
                                        className="fas fa-phone text-primary"
                                        style={{ fontSize: '1.5rem', marginRight: '20px', width: '30px' }}
                                    ></i>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>Telefon</h4>
                                        <p style={{ color: '#aaa' }}><a href="tel:08503084641" style={{ color: 'inherit', textDecoration: 'none' }}>0850 308 4641</a></p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                    <i
                                        className="fas fa-envelope text-primary"
                                        style={{ fontSize: '1.5rem', marginRight: '20px', width: '30px' }}
                                    ></i>
                                    <div>
                                        <h4 style={{ marginBottom: '5px' }}>E-Posta</h4>
                                        <p style={{ color: '#aaa' }}><a href="mailto:info@felsen.com.tr" style={{ color: 'inherit', textDecoration: 'none' }}>info@felsen.com.tr</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Form */}
                        {/* 
                        <div className="col reveal" style={{ flex: 1, minWidth: '300px' }}>
                            <div className="card-glass">
                                <h3 className="mb-4">Randevu Talep Formu</h3>
                                <form onSubmit={handleSubmit}>
                                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                        <div style={{ flex: 1, minWidth: '200px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>
                                                Adınız Soyadınız
                                            </label>
                                            <input
                                                type="text"
                                                name="CustomerName"
                                                className="form-input"
                                                placeholder="Ad Soyad"
                                                required
                                                value={formData.CustomerName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div style={{ flex: 1, minWidth: '200px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>
                                                Telefon Numaranız
                                            </label>
                                            <input
                                                type="tel"
                                                name="CustomerPhone"
                                                className="form-input"
                                                placeholder="05XX XXX XX XX"
                                                required
                                                value={formData.CustomerPhone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>
                                        E-Posta Adresiniz
                                    </label>
                                    <input
                                        type="email"
                                        name="CustomerEmail"
                                        className="form-input"
                                        placeholder="ornek@email.com"
                                        required
                                        value={formData.CustomerEmail}
                                        onChange={handleChange}
                                    />

                                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                        <div style={{ flex: 1, minWidth: '200px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>
                                                Hizmet Türü
                                            </label>
                                            <select
                                                name="ServiceType"
                                                className="form-select"
                                                value={formData.ServiceType}
                                                onChange={handleChange}
                                            >
                                                <option value="Genel">Seçiniz...</option>
                                                <option value="Periyodik Bakım">Periyodik Bakım</option>
                                                <option value="Motor Onarım">Motor Onarım</option>
                                                <option value="Elektrik/Elektronik">Elektrik/Elektronik</option>
                                                <option value="Klima Servisi">Klima Servisi</option>
                                                <option value="Kaporta Boya">Kaporta Boya</option>
                                                <option value="Diğer">Diğer</option>
                                            </select>
                                        </div>
                                        <div style={{ flex: 1, minWidth: '200px' }}>
                                            <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>
                                                Araç Marka/Model
                                            </label>
                                            <input
                                                type="text"
                                                name="CarModel"
                                                className="form-input"
                                                placeholder="Örn: BMW 320i"
                                                value={formData.CarModel}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>
                                        Talep Edilen Tarih
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="AppointmentDate"
                                        className="form-input"
                                        required
                                        value={formData.AppointmentDate}
                                        onChange={handleChange}
                                    />

                                    <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>
                                        Mesajınız / Şikayetiniz
                                    </label>
                                    <textarea
                                        name="Notes"
                                        className="form-textarea"
                                        rows={4}
                                        placeholder="Aracınızdaki sorunu kısaca anlatınız..."
                                        value={formData.Notes}
                                        onChange={handleChange}
                                    ></textarea>

                                    <button type="submit" className="btn-custom" style={{ width: '100%' }}>
                                        Randevu Oluştur <i className="fas fa-paper-plane" style={{ marginLeft: '10px' }}></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        */}
                    </div>
                </div>
            </section >
        </>
    )
}
