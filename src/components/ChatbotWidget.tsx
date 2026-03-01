"use client";

import { useEffect, useRef, useState } from "react";
import { APPOINTMENT_SERVICE_TYPES } from "@/lib/appointment-service-types";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  text: string;
  type?: "text" | "options" | "date" | "slots" | "success";
  options?: string[];
  data?: any;
};

type BookingState = {
  step: "idle" | "service" | "date" | "time" | "info" | "confirm";
  service?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  email?: string;
  plate?: string;
  model?: string;
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [booking, setBooking] = useState<BookingState>({ step: "idle" });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Merhaba! Felsen Servis akıllı asistanına hoş geldiniz. Size nasıl yardımcı olabilirim?",
      type: "options",
      options: ["Randevu Almak İstiyorum", "Servis Bilgileri", "İletişim Bilgileri"]
    },
  ]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function handleAction(action: string) {
    if (action === "Randevu Almak İstiyorum") {
      startBooking();
    } else {
      await sendToAI(action);
    }
  }

  function startBooking() {
    setBooking({ step: "service" });
    setMessages(prev => [
      ...prev,
      { role: "user", text: "Randevu Almak İstiyorum" },
      {
        role: "assistant",
        text: "Harika! Size yardımcı olmaktan mutluluk duyarım. Öncelikle hangi hizmet için randevu almak istersiniz?",
        type: "options",
        options: [...APPOINTMENT_SERVICE_TYPES]
      }
    ]);
  }

  async function selectService(service: string) {
    setBooking(prev => ({ ...prev, step: "date", service }));
    setMessages(prev => [
      ...prev,
      { role: "user", text: service },
      {
        role: "assistant",
        text: "Anlaşıldı. Hangi gün servisimize gelmek istersiniz?",
        type: "date"
      }
    ]);
  }

  async function selectDate(date: string) {
    setSending(true);
    setBooking(prev => ({ ...prev, step: "time", date }));
    setMessages(prev => [
      ...prev,
      { role: "user", text: date },
      { role: "assistant", text: "Müsait saatleri kontrol ediyorum..." }
    ]);

    try {
      const res = await fetch(`/api/appointments/slots?date=${date}`);
      const data = await res.json();

      // Handle the data safely
      const rawSlots = data.slots || [];
      const slots = rawSlots
        .filter((s: any) => s.state === "available")
        .map((s: any) => s.time);

      setAvailableSlots(slots);

      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          text: slots.length > 0
            ? "Lütfen size uygun bir saat seçin (Doluluğa göre listelenmiştir):"
            : (data.message || "Üzgünüm, seçtiğiniz günde müsait saat kalmamış veya servis kapalı. Lütfen başka bir gün seçin."),
          type: slots.length > 0 ? "slots" : "date",
          options: slots
        }
      ]);
    } catch (err) {
      console.error("Slot fetch error:", err);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "assistant", text: "Müsait saatleri alırken bir hata oluştu. Lütfen tekrar deneyin veya 0850 308 46 41 numarasından bize ulaşın." }
      ]);
    } finally {
      setSending(false);
    }
  }

  function selectTime(time: string) {
    setBooking(prev => ({ ...prev, step: "info", time }));
    setMessages(prev => [
      ...prev,
      { role: "user", text: time },
      {
        role: "assistant",
        text: "Harika. Son olarak iletişim bilgilerinizi almam gerekiyor. \n\nLütfen **Ad Soyad** yazınız:"
      }
    ]);
  }

  async function handleUserInput(text: string) {
    if (booking.step === "info") {
      if (!booking.name) {
        setBooking(prev => ({ ...prev, name: text }));
        setMessages(prev => [...prev, { role: "user", text }, { role: "assistant", text: "Teşekkürler. Şimdi **Telefon Numaranızı** yazın:" }]);
      } else if (!booking.phone) {
        setBooking(prev => ({ ...prev, phone: text }));
        setMessages(prev => [...prev, { role: "user", text }, { role: "assistant", text: "Size onay e-postası gönderebilmemiz için **E-posta Adresinizi** yazın:" }]);
      } else if (!booking.email) {
        if (!text.includes("@")) {
          setMessages(prev => [...prev, { role: "user", text }, { role: "assistant", text: "Geçersiz e-posta. Lütfen gerçek bir e-posta adresi yazın:" }]);
          return;
        }
        setBooking(prev => ({ ...prev, email: text }));
        setMessages(prev => [...prev, { role: "user", text }, { role: "assistant", text: "Aracınızın **Plakasını** yazın (Örn: 34ABC123):" }]);
      } else if (!booking.plate) {
        const upPlate = text.toUpperCase().replace(/\s/g, "");
        setBooking(prev => ({ ...prev, plate: upPlate }));
        setMessages(prev => [...prev, { role: "user", text: upPlate }, { role: "assistant", text: "Aracınızın **Marka ve Modelini** yazın (Örn: Golf 7):" }]);
      } else if (!booking.model) {
        const finalBooking = { ...booking, model: text };
        setBooking({ ...finalBooking, step: "confirm" });
        setMessages(prev => [
          ...prev,
          { role: "user", text },
          {
            role: "assistant",
            text: `Tüm bilgiler tamam! Randevunuzu onaylıyor musunuz? \n\n**Hizmet:** ${finalBooking.service}\n**Tarih:** ${finalBooking.date} / ${finalBooking.time}\n**İsim:** ${finalBooking.name}\n**Araç:** ${finalBooking.plate} (${finalBooking.model})`,
            type: "options",
            options: ["Onaylıyorum", "İptal Et"]
          }
        ]);
      }
    } else {
      await sendToAI(text);
    }
  }

  async function finalizeBooking() {
    setSending(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: booking.name,
          phone: booking.phone,
          email: booking.email,
          serviceType: booking.service,
          date: booking.date,
          time: booking.time,
          plate: booking.plate,
          carModel: booking.model,
          notes: "Chatbot üzerinden oluşturuldu."
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Randevu oluşturulamadı");
      }

      setMessages(prev => [
        ...prev,
        { role: "user", text: "Onaylıyorum" },
        {
          role: "assistant",
          text: data.message || "Randevunuz başarıyla oluşturuldu! Sizi sabırsızlıkla bekliyoruz. Detaylar e-posta adresinize iletilecektir.",
          type: "success"
        }
      ]);
      setBooking({ step: "idle" });
    } catch (err: any) {
      console.error("Booking error:", err);
      setMessages(prev => [
        ...prev,
        { role: "user", text: "Onaylıyorum" },
        {
          role: "assistant",
          text: `Hata: ${err.message || "Onay işlemi sırasında bir hata oluştu."} \n\nLütfen 0850 308 46 41 numarasından bize ulaşarak randevunuzu kesinleştirin.`
        }
      ]);
    } finally {
      setSending(false);
    }
  }

  async function sendToAI(text: string) {
    const nextMessages: ChatMessage[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setMessage("");
    setSending(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      setMessages([...nextMessages, { role: "assistant", text: data.reply ?? "Şu an cevap veremiyorum." }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", text: "Bağlantı hatası oluştu." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
      {open ? (
        <div style={{
          marginBottom: "15px",
          width: "420px",
          maxWidth: "92vw",
          height: "min(85vh, 650px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(10, 10, 12, 0.95)",
          backdropFilter: "blur(25px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          transition: "all 0.3s ease"
        }}>
          {/* Header */}
          <div style={{
            padding: "20px",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "var(--primary)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(255, 62, 62, 0.3)"
              }}>
                <i className="fas fa-robot" style={{ color: "#fff", fontSize: "20px" }}></i>
              </div>
              <div>
                <h4 style={{ margin: 0, color: "#fff", fontSize: "16px", fontWeight: 700 }}>Felsen AI Asistan</h4>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Çevrimiçi | 7/24 Destek</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "8px", padding: "5px 10px", cursor: "pointer" }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              scrollbarWidth: "none"
            }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: "8px" }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "14px 20px",
                  borderRadius: msg.role === "user" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                  background: msg.role === "user" ? "var(--primary)" : "rgba(255,255,255,0.08)",
                  border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: "14.5px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  boxShadow: msg.role === "user" ? "0 4px 15px rgba(255,62,62,0.2)" : "0 4px 15px rgba(0,0,0,0.1)",
                  marginBottom: "5px"
                }}>
                  {msg.text}
                </div>

                {/* Visual Action/Options */}
                {msg.type === "options" && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "5px" }}>
                    {msg.options?.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (opt === "Onaylıyorum") finalizeBooking();
                          else if (opt === "İptal Et") {
                            setBooking({ step: "idle" });
                            setMessages(prev => [...prev, { role: "assistant", text: "Randevu talebiniz iptal edildi. Başka bir konuda yardımcı olabilir miyim?" }]);
                          }
                          else if (booking.step === "service") selectService(opt);
                          else handleAction(opt);
                        }}
                        style={{
                          padding: "8px 16px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "#fff",
                          borderRadius: "10px",
                          fontSize: "13px",
                          cursor: "pointer",
                          transition: "0.2s"
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {msg.type === "date" && (
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => selectDate(e.target.value)}
                    style={{
                      padding: "10px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid var(--primary)",
                      color: "#fff",
                      borderRadius: "10px",
                      outline: "none"
                    }}
                  />
                )}

                {msg.type === "slots" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", width: "100%" }}>
                    {msg.options?.map((slot, i) => (
                      <button
                        key={i}
                        onClick={() => selectTime(slot)}
                        style={{
                          padding: "10px",
                          background: "rgba(255,62,62,0.15)",
                          border: "1px solid rgba(255,62,62,0.4)",
                          color: "var(--primary)",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}

                {msg.type === "success" && (
                  <div style={{ textAlign: "center", width: "100%", padding: "10px", background: "rgba(34,197,94,0.1)", borderRadius: "15px", border: "1px solid rgba(34,197,94,0.3)" }}>
                    <i className="fas fa-check-circle" style={{ color: "#22c55e", fontSize: "30px", marginBottom: "10px" }}></i>
                    <p style={{ margin: 0, fontSize: "14px", color: "#fff" }}>İşlem Başarılı!</p>
                  </div>
                )}
              </div>
            ))}
            {sending && (
              <div style={{ display: "flex", gap: "5px", padding: "10px" }}>
                <div className="dot" style={{ width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%", animation: "bounce 1.4s infinite ease-in-out" }}></div>
                <div className="dot" style={{ width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%", animation: "bounce 1.4s infinite ease-in-out 0.2s" }}></div>
                <div className="dot" style={{ width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%", animation: "bounce 1.4s infinite ease-in-out 0.4s" }}></div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (booking.step !== "idle") handleUserInput(message);
                    else sendToAI(message);
                    setMessage("");
                  }
                }}
                disabled={sending}
                placeholder="Mesajınızı yazın..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  padding: "12px 15px",
                  borderRadius: "15px",
                  outline: "none",
                  textTransform: (booking.step === "info" && booking.email && !booking.plate) ? "uppercase" : "none"
                }}
              />
              <button
                onClick={() => {
                  if (booking.step !== "idle") handleUserInput(message);
                  else sendToAI(message);
                  setMessage("");
                }}
                disabled={sending || !message.trim()}
                style={{
                  width: "45px",
                  height: "45px",
                  background: "var(--primary)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Launcher Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "20px",
          background: "var(--primary)",
          border: "none",
          color: "#fff",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(255, 62, 62, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1) rotate(5deg)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1) rotate(0deg)")}
      >
        <i className={open ? "fas fa-times" : "fas fa-comment-dots"}></i>
      </button>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </div>
  );
}
