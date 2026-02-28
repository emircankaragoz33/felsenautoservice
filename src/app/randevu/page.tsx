'use client'

import { useEffect, useMemo, useState } from 'react'
import { APPOINTMENT_SERVICE_TYPES } from '@/lib/appointment-service-types'

type Slot = {
  time: string
  state: 'available' | 'full'
}

type FormState = {
  name: string
  phone: string
  email: string
  plate: string
  carModel: string
  serviceType: string
  date: string
  time: string
}

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10)
}

function isSundayDate(dateString: string) {
  return new Date(`${dateString}T12:00:00.000Z`).getUTCDay() === 0
}

export default function Contact() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    plate: '',
    carModel: '',
    serviceType: '',
    date: '',
    time: '',
  })
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [finalApproval, setFinalApproval] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const minDate = useMemo(() => getTodayDateString(), [])
  const step1Valid = Boolean(formData.name.trim() && formData.phone.trim() && formData.email.trim())
  const step2Valid = Boolean(formData.plate.trim() && formData.carModel.trim() && formData.serviceType && formData.date && formData.time)

  useEffect(() => {
    const date = formData.date
    if (!date || isSundayDate(date)) {
      setSlots([])
      setFormData((prev) => ({ ...prev, time: '' }))
      return
    }

    let active = true
    setLoadingSlots(true)
    setMessage(null)

    fetch(`/api/appointments/slots?date=${date}`)
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.message || 'Slot bilgileri alınamadı.')
        }

        if (!active) return
        const incomingSlots = Array.isArray(data?.slots) ? (data.slots as Slot[]) : []
        setSlots(incomingSlots)
        setFormData((prev) => ({
          ...prev,
          time: incomingSlots.some((slot) => slot.time === prev.time && slot.state === 'available') ? prev.time : '',
        }))
      })
      .catch((error: unknown) => {
        if (!active) return
        const messageText = error instanceof Error ? error.message : 'Slotlar yüklenemedi.'
        setSlots([])
        setMessage({ type: 'error', text: messageText })
      })
      .finally(() => {
        if (!active) return
        setLoadingSlots(false)
      })

    return () => {
      active = false
    }
  }, [formData.date])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (step !== 3) {
      setMessage({ type: 'error', text: 'Randevuyu tamamlamak için önce onay adımına geçin.' })
      return
    }

    if (!finalApproval) {
      setMessage({ type: 'error', text: 'Lütfen randevu bilgilerini onayladığınızı işaretleyin.' })
      return
    }

    setMessage(null)
    setSubmitting(true)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Randevu oluşturulamadı.')
      }

      setMessage({
        type: 'success',
        text: typeof data?.message === 'string' ? data.message : 'Randevunuz başarıyla alındı.',
      })
      setStep(1)
      setFinalApproval(false)
      setFormData({
        name: '',
        phone: '',
        email: '',
        plate: '',
        carModel: '',
        serviceType: '',
        date: '',
        time: '',
      })
      setSlots([])
    } catch (error: unknown) {
      const messageText = error instanceof Error ? error.message : 'Randevu oluşturulamadı.'
      setMessage({ type: 'error', text: messageText })
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (!step1Valid) {
        setMessage({ type: 'error', text: 'Adım 1 için ad, telefon ve e-posta alanlarını doldurun.' })
        return
      }
      setMessage(null)
      setStep(2)
      return
    }

    if (step === 2) {
      if (!step2Valid) {
        setMessage({ type: 'error', text: 'Adım 2 için hizmet, araç, tarih ve saat seçimi tamamlanmalı.' })
        return
      }
      setMessage(null)
      setFinalApproval(false)
      setStep(3)
    }
  }

  const handleBack = () => {
    setMessage(null)
    setStep((prev) => (prev === 1 ? 1 : ((prev - 1) as 1 | 2 | 3)))
  }

  const progressSteps = [
    { id: 1 as const, title: 'İletişim', subtitle: 'Kişisel bilgiler' },
    { id: 2 as const, title: 'Randevu', subtitle: 'Hizmet, araç ve saat seçimi' },
    { id: 3 as const, title: 'Onay', subtitle: 'Kontrol ve gönderim' },
  ]

  return (
    <>
      <section className="section-padding" style={{ paddingTop: '190px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255,62,62,0.35)',
                background: 'rgba(255,62,62,0.12)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#fecaca',
                marginBottom: '12px',
              }}
            >
              Online Randevu Akışı
            </div>
            <div style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', maxWidth: '820px' }}>
              Servis randevunuzu adım adım oluşturun
            </div>
            <p style={{ marginTop: '12px', fontSize: '1rem', color: '#cbd5e1', maxWidth: '740px' }}>
              Bilgilerinizi girin, uygun saatleri görün ve son adımda tek tıkla kaydınızı tamamlayın.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '12px', marginBottom: '18px' }}>
            {progressSteps.map((item) => {
              const active = step === item.id
              const done = step > item.id

              return (
                <div
                  key={item.id}
                  style={{
                    minHeight: '98px',
                    borderRadius: '14px',
                    border: active
                      ? '1px solid rgba(248,113,113,0.9)'
                      : done
                        ? '1px solid rgba(52,211,153,0.75)'
                        : '1px solid rgba(255,255,255,0.16)',
                    background: active
                      ? 'linear-gradient(135deg, rgba(127,29,29,0.55), rgba(60,7,7,0.45))'
                      : done
                        ? 'linear-gradient(135deg, rgba(6,78,59,0.45), rgba(5,46,22,0.35))'
                        : 'rgba(10,10,10,0.6)',
                    padding: '12px 14px',
                  }}
                >
                  <p style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#94a3b8', textTransform: 'uppercase' }}>Adım {item.id}</p>
                  <p style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 700, marginTop: '4px' }}>{item.title}</p>
                  <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{item.subtitle}</p>
                </div>
              )
            })}
          </div>

          <div className="card-glass" style={{ padding: '22px' }}>
              {message ? (
                <div style={{ marginBottom: '16px', border: message.type === 'success' ? '1px solid rgba(16,185,129,0.45)' : '1px solid rgba(248,113,113,0.45)', background: message.type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.13)', borderRadius: '12px', padding: '10px 14px', color: message.type === 'success' ? '#a7f3d0' : '#fecaca', fontSize: '0.95rem' }}>
                  {message.text}
                </div>
              ) : null}

              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <div>
                    <p style={{ fontSize: '1.45rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Adım 1 - Kişisel Bilgiler</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#d1d5db', fontSize: '0.94rem' }}>Ad Soyad</label>
                        <input
                          required
                          value={formData.name}
                          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                          className="form-input"
                          style={{ padding: '12px 14px', fontSize: '0.98rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#d1d5db', fontSize: '0.94rem' }}>Telefon</label>
                        <input
                          required
                          value={formData.phone}
                          onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                          className="form-input"
                          style={{ padding: '12px 14px', fontSize: '0.98rem' }}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '6px', color: '#d1d5db', fontSize: '0.94rem' }}>E-posta</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                        className="form-input"
                        style={{ padding: '12px 14px', fontSize: '0.98rem' }}
                      />
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div>
                    <p style={{ fontSize: '1.45rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Adım 2 - Hizmet, Araç ve Saat Seçimi</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#d1d5db', fontSize: '0.94rem' }}>Araç Plakası</label>
                        <input
                          required
                          value={formData.plate}
                          onChange={(event) => setFormData((prev) => ({ ...prev, plate: event.target.value }))}
                          className="form-input"
                          style={{ padding: '12px 14px', fontSize: '0.98rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#d1d5db', fontSize: '0.94rem' }}>Araç Modeli</label>
                        <input
                          required
                          value={formData.carModel}
                          onChange={(event) => setFormData((prev) => ({ ...prev, carModel: event.target.value }))}
                          className="form-input"
                          style={{ padding: '12px 14px', fontSize: '0.98rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '6px', color: '#d1d5db', fontSize: '0.94rem' }}>Hizmet Türü</label>
                      <select
                        required
                        value={formData.serviceType}
                        onChange={(event) => setFormData((prev) => ({ ...prev, serviceType: event.target.value }))}
                        className="form-select"
                        style={{ padding: '12px 14px', fontSize: '0.98rem' }}
                      >
                        <option value="">Hizmet seçin</option>
                        {APPOINTMENT_SERVICE_TYPES.map((serviceType) => (
                          <option key={serviceType} value={serviceType}>
                            {serviceType}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '6px', color: '#d1d5db', fontSize: '0.94rem' }}>Tarih</label>
                      <input
                        required
                        type="date"
                        min={minDate}
                        value={formData.date}
                        onChange={(event) => {
                          const value = event.target.value
                          if (value && isSundayDate(value)) {
                            setMessage({ type: 'error', text: 'Pazar günü seçilemez.' })
                            return
                          }
                          setMessage(null)
                          setFormData((prev) => ({ ...prev, date: value, time: '' }))
                        }}
                        className="form-input"
                        style={{ padding: '12px 14px', fontSize: '0.98rem' }}
                      />
                    </div>

                    <div style={{ marginTop: '14px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontSize: '0.94rem' }}>Saat Slotları</label>
                      {loadingSlots ? <p className="text-sm text-slate-400">Slotlar yükleniyor...</p> : null}
                      {!loadingSlots && formData.date && slots.length === 0 ? (
                        <p className="text-sm text-slate-400">Bu tarih için uygun slot bulunamadı.</p>
                      ) : null}

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px' }}>
                        {slots.map((slot) => {
                          const isActive = formData.time === slot.time
                          const isFull = slot.state === 'full'

                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={isFull}
                              onClick={() => setFormData((prev) => ({ ...prev, time: slot.time }))}
                              style={{
                                borderRadius: '8px',
                                border: isFull
                                  ? '1px solid rgba(248,113,113,0.6)'
                                  : isActive
                                    ? '1px solid rgba(167,243,208,1)'
                                    : '1px solid rgba(16,185,129,0.55)',
                                background: isFull
                                  ? 'rgba(239,68,68,0.2)'
                                  : isActive
                                    ? 'rgba(16,185,129,0.85)'
                                    : 'rgba(16,185,129,0.14)',
                                color: '#fff',
                                padding: '8px 6px',
                                fontSize: '0.84rem',
                                fontWeight: 600,
                                cursor: isFull ? 'not-allowed' : 'pointer',
                              }}
                            >
                              {slot.time}
                              {isFull ? ' (Dolu)' : ''}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div>
                    <p style={{ fontSize: '1.45rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Adım 3 - Randevu Onayı</p>
                    <div style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(8,8,8,0.5)', padding: '16px', color: '#e2e8f0' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <p>
                          <span className="block text-xs text-slate-400">Müşteri</span>
                          {formData.name}
                        </p>
                        <p>
                          <span className="block text-xs text-slate-400">Telefon</span>
                          {formData.phone}
                        </p>
                        <p>
                          <span className="block text-xs text-slate-400">E-posta</span>
                          {formData.email}
                        </p>
                        <p>
                          <span className="block text-xs text-slate-400">Araç</span>
                          {formData.plate} - {formData.carModel}
                        </p>
                        <p>
                          <span className="block text-xs text-slate-400">Hizmet Türü</span>
                          {formData.serviceType}
                        </p>
                        <p>
                          <span className="block text-xs text-slate-400">Tarih</span>
                          {formData.date}
                        </p>
                        <p>
                          <span className="block text-xs text-slate-400">Saat</span>
                          {formData.time}
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '12px' }}>
                      Randevu gönderildikten sonra onay bilgilendirmesi e-posta adresinize iletilecektir.
                    </p>

                    <label style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '14px', color: '#e5e7eb', fontSize: '0.92rem' }}>
                      <input
                        type="checkbox"
                        checked={finalApproval}
                        onChange={(event) => setFinalApproval(event.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: '#ef4444' }}
                      />
                      Randevu bilgilerimi kontrol ettim ve onaylıyorum.
                    </label>
                  </div>
                ) : null}

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center', marginTop: '18px', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px' }}>
                  <button
                    type="button"
                    disabled={step === 1}
                    onClick={handleBack}
                    style={{ borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.04)', color: '#fff', padding: '10px 16px', fontWeight: 500, opacity: step === 1 ? 0.45 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    Geri
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      style={{ borderRadius: '10px', border: 'none', background: '#ef4444', color: '#fff', padding: '10px 18px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Sonraki Adım
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting || !step2Valid || !finalApproval}
                      style={{ borderRadius: '10px', border: 'none', background: '#ef4444', color: '#fff', padding: '10px 18px', fontWeight: 700, opacity: submitting || !step2Valid || !finalApproval ? 0.6 : 1, cursor: submitting || !step2Valid || !finalApproval ? 'not-allowed' : 'pointer' }}
                    >
                      {submitting ? 'Kaydediliyor...' : 'Randevuyu Tamamla'}
                    </button>
                  )}
                </div>
              </form>
            </div>
        </div>
      </section>
    </>
  )
}
