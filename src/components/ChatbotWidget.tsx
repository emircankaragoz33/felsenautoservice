"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Merhaba, Felsen Servis asistaniyim. Randevu sureci veya calisma saatleri ile ilgili sorularinizi yazabilirsiniz.",
    },
  ]);

  async function sendMessage() {
    const trimmed = message.trim();
    if (!trimmed || sending) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setMessage("");
    setSending(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = (await response.json()) as { reply?: string };

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          text: data.reply ?? "Su an yanit uretemiyorum. Lutfen birazdan tekrar deneyin.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          text: "Asistan su anda ulasilamiyor. Lutfen daha sonra tekrar deneyin.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  return (
    <div style={{ position: "fixed", bottom: "16px", right: "16px", zIndex: 9999 }}>
      {open ? (
        <div style={{ marginBottom: "10px", width: "410px", maxWidth: "96vw", height: "min(78vh,560px)", display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.16)", background: "rgba(2,6,23,0.96)", boxShadow: "0 24px 55px rgba(0,0,0,0.55)" }}>
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(90deg, rgba(15,23,42,1), rgba(69,10,10,0.7))", padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px", background: "rgba(220,38,38,0.9)", color: "#fff", fontSize: "16px" }}>
                  ✦
                </div>
                <div>
                  <p style={{ margin: 0, color: "#fff", fontSize: "14px", fontWeight: 700 }}>Felsen Asistan</p>
                  <p style={{ margin: 0, color: "#94a3b8", fontSize: "11px" }}>Randevu ve servis yardimi</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "12px", padding: "5px 9px", cursor: "pointer" }}
              >
                Kapat
              </button>
            </div>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "14px", background: "linear-gradient(180deg, rgba(15,23,42,0.45), rgba(2,6,23,0.8))" }}>
            {messages.map((item, index) => (
              <div key={index} style={{ display: "flex", justifyContent: item.role === "user" ? "flex-end" : "flex-start", marginBottom: "10px" }}>
                <div
                  style={{
                    maxWidth: "86%",
                    borderRadius: "14px",
                    padding: "9px 11px",
                    fontSize: "14px",
                    lineHeight: 1.45,
                    color: "#fff",
                    border: item.role === "user" ? "none" : "1px solid rgba(255,255,255,0.12)",
                    background: item.role === "user" ? "#dc2626" : "rgba(30,41,59,0.92)",
                  }}
                >
                  {item.text}
                </div>
              </div>
            ))}
            {sending ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#cbd5e1", fontSize: "12px", padding: "5px 10px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: "#f87171" }}></span>
                Asistan yaziyor...
              </div>
            ) : null}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(2,6,23,0.98)", padding: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Sorunuzu yazin..."
                style={{ flex: 1, borderRadius: "10px", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(15,23,42,0.85)", color: "#fff", padding: "10px 12px", fontSize: "14px", outline: "none" }}
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={sending}
                style={{ borderRadius: "10px", border: "none", background: "#ef4444", color: "#fff", padding: "10px 12px", fontSize: "13px", fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.7 : 1 }}
              >
                Gonder
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{ width: "56px", height: "56px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg,#ef4444,#b91c1c)", color: "#fff", boxShadow: "0 10px 25px rgba(127,29,29,0.55)", cursor: "pointer" }}
        aria-label="Chatbot ac"
      >
        <span style={{ fontSize: "20px" }}>💬</span>
      </button>
    </div>
  );
}
