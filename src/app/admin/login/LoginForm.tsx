"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

type LoginFormProps = {
  callbackUrl: string;
};

export default function LoginForm({ callbackUrl }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!response || response.error) {
      setError("Giris bilgileri hatali.");
      return;
    }

    window.location.href = response.url ?? callbackUrl;
  }

  return (
    <section className="section-padding" style={{ paddingTop: "190px", paddingBottom: "120px" }}>
      <div className="container" style={{ maxWidth: "560px" }}>
        <div className="card-glass" style={{ padding: "30px" }}>
          <p style={{ color: "#fff", fontSize: "2.2rem", lineHeight: 1.1, fontWeight: 700, marginBottom: "6px" }}>Admin Giris</p>
          <p style={{ color: "#cbd5e1", marginBottom: "18px", fontSize: "0.95rem" }}>Yonetim paneline erismek icin giris yapin.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "6px", color: "#d1d5db", fontSize: "0.92rem" }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-input"
                style={{ padding: "11px 13px", fontSize: "0.95rem" }}
              />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "6px", color: "#d1d5db", fontSize: "0.92rem" }}>Sifre</label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-input"
                style={{ padding: "11px 13px", fontSize: "0.95rem" }}
              />
            </div>

            {error ? <p style={{ color: "#fecaca", fontSize: "0.9rem", marginBottom: "10px" }}>{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              style={{ borderRadius: "10px", border: "none", background: "#ef4444", color: "#fff", width: "100%", padding: "11px 14px", fontWeight: 700, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Giris yapiliyor..." : "Giris Yap"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
