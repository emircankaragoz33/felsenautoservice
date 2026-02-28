import { auth } from "@/auth";
import { deleteAppointment, logoutAdmin, updateAppointmentStatus, blockAppointmentSlot } from "@/app/admin/actions";
import { formatDateToTr } from "@/lib/appointment-rules";
import { prisma } from "@/lib/prisma";

type AppointmentListItem = {
  id: string;
  name: string;
  phone: string;
  email: string;
  plate: string;
  carModel: string;
  serviceType?: string;
  date: Date;
  time: string;
  status: "pending" | "approved" | "cancelled";
};

type AdminPageProps = {
  searchParams: Promise<{
    date?: string;
    status?: string;
    page?: string;
  }>;
};

function isValidDate(value?: string) {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

function isValidStatus(value?: string): value is AppointmentListItem["status"] {
  return value === "pending" || value === "approved" || value === "cancelled";
}

function getStatusLabel(status: AppointmentListItem["status"]) {
  if (status === "approved") return "Onaylandı";
  if (status === "cancelled") return "İptal Edildi";
  return "Beklemede";
}

function buildAdminUrl(params: { date?: string; status?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params.date) query.set("date", params.date);
  if (params.status) query.set("status", params.status);
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const queryString = query.toString();
  return queryString ? `/admin?${queryString}` : "/admin";
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const params = await searchParams;

  const selectedDate = isValidDate(params?.date) ? (params?.date as string) : undefined;
  const selectedStatus = isValidStatus(params?.status) ? params?.status : undefined;
  const requestedPage = Number(params?.page ?? "1");
  const pageSize = 10;
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const where = {
    ...(selectedDate
      ? {
        date: new Date(`${selectedDate}T00:00:00.000Z`),
      }
      : {}),
    ...(selectedStatus
      ? {
        status: selectedStatus,
      }
      : {}),
  };

  const totalCount = await prisma.appointment.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const page = Math.min(currentPage, totalPages);

  const statusCounts = await prisma.appointment.groupBy({
    by: ["status"],
    where: selectedDate
      ? {
        date: new Date(`${selectedDate}T00:00:00.000Z`),
      }
      : undefined,
    _count: {
      status: true,
    },
  });

  const approvedCount = statusCounts.find((item: { status: AppointmentListItem["status"]; _count: { status: number } }) => item.status === "approved")?._count.status ?? 0;
  const pendingCount = statusCounts.find((item: { status: AppointmentListItem["status"]; _count: { status: number } }) => item.status === "pending")?._count.status ?? 0;

  const appointments = (await prisma.appointment.findMany({
    where,
    orderBy: [{ date: "desc" }, { time: "asc" }, { createdAt: "asc" }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  })) as AppointmentListItem[];

  return (
    <section className="section-padding" style={{ paddingTop: "185px", paddingBottom: "110px" }}>
      <div className="container" style={{ maxWidth: "1220px" }}>
        <div className="card-glass" style={{ padding: "22px", marginBottom: "14px", display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin Panel</p>
            <p style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, lineHeight: 1.1 }}>Randevu Yonetimi</p>
            <p style={{ marginTop: "4px", color: "#cbd5e1", fontSize: "0.92rem" }}>{session.user.email}</p>
          </div>
          <form action={logoutAdmin}>
            <button style={{ borderRadius: "10px", border: "1px solid rgba(248,113,113,0.5)", background: "rgba(239,68,68,0.14)", color: "#fecaca", padding: "10px 16px", fontWeight: 600, cursor: "pointer" }}>
              Cikis Yap
            </button>
          </form>
        </div>

        <div className="card-glass" style={{ padding: "16px", marginBottom: "14px" }}>
          <form method="GET" style={{ display: "flex", alignItems: "end", gap: "10px", flexWrap: "wrap" }}>
            <label style={{ color: "#d1d5db", fontSize: "0.92rem" }}>
              Tarih Filtresi (Opsiyonel)
              <input type="date" name="date" defaultValue={selectedDate ?? ""} className="form-input" style={{ marginTop: "6px", padding: "10px 12px" }} />
            </label>
            <label style={{ color: "#d1d5db", fontSize: "0.92rem" }}>
              Durum Filtresi
              <select name="status" defaultValue={selectedStatus ?? ""} className="form-select" style={{ marginTop: "6px", padding: "10px 12px", minWidth: "180px" }}>
                <option value="">Tümü</option>
                <option value="pending">Beklemede</option>
                <option value="approved">Onaylandı</option>
                <option value="cancelled">İptal Edildi</option>
              </select>
            </label>
            <button style={{ borderRadius: "10px", border: "none", background: "#ef4444", color: "#fff", padding: "10px 14px", fontWeight: 700, cursor: "pointer" }}>
              Filtrele
            </button>
            <a href="/admin" style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.04)", color: "#e5e7eb", padding: "10px 14px", fontWeight: 600, textDecoration: "none" }}>
              Tümünü Göster
            </a>
          </form>
        </div>

        <div className="card-glass" style={{ padding: "16px", marginBottom: "14px", borderColor: "rgba(245,158,11,0.5)" }}>
          <form action={blockAppointmentSlot} style={{ display: "flex", alignItems: "end", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ width: "100%", color: "#fcd34d", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "4px" }}>
              <i className="fas fa-lock me-2"></i> Manuel Randevu Saati Kapat
            </div>
            <label style={{ color: "#d1d5db", fontSize: "0.92rem" }}>
              Tarih
              <input type="date" name="date" required className="form-input" style={{ marginTop: "6px", padding: "10px 12px" }} />
            </label>
            <label style={{ color: "#d1d5db", fontSize: "0.92rem" }}>
              Saat
              <select name="time" required className="form-select" style={{ marginTop: "6px", padding: "10px 12px", minWidth: "180px" }}>
                {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <button style={{ borderRadius: "10px", border: "none", background: "#f59e0b", color: "#fff", padding: "10px 14px", fontWeight: 700, cursor: "pointer" }}>
              Saati Kapat (Rezerve Et)
            </button>
          </form>
        </div>


        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "12px", marginBottom: "14px" }}>
          <div className="card-glass" style={{ padding: "16px" }}>
            <p style={{ color: "#94a3b8", fontSize: "0.78rem" }}>Toplam</p>
            <p style={{ color: "#fff", fontSize: "1.85rem", fontWeight: 700 }}>{totalCount}</p>
          </div>
          <div className="card-glass" style={{ padding: "16px", borderColor: "rgba(16,185,129,0.5)" }}>
            <p style={{ color: "#6ee7b7", fontSize: "0.78rem" }}>Onayli</p>
            <p style={{ color: "#d1fae5", fontSize: "1.85rem", fontWeight: 700 }}>{approvedCount}</p>
          </div>
          <div className="card-glass" style={{ padding: "16px", borderColor: "rgba(245,158,11,0.45)" }}>
            <p style={{ color: "#fcd34d", fontSize: "0.78rem" }}>Beklemede</p>
            <p style={{ color: "#fef3c7", fontSize: "1.85rem", fontWeight: 700 }}>{pendingCount}</p>
          </div>
        </div>

        <div className="card-glass" style={{ padding: "12px" }}>
          {appointments.length === 0 ? (
            <div style={{ color: "#cbd5e1", textAlign: "center", padding: "26px 12px" }}>
              {selectedDate
                ? `${formatDateToTr(new Date(`${selectedDate}T00:00:00.000Z`))} için kayıt bulunmuyor.`
                : "Henüz görüntülenecek randevu kaydı bulunmuyor."}
            </div>
          ) : (
            appointments.map((appointment: AppointmentListItem) => (
              <div key={appointment.id} style={{ border: appointment.status === "approved" ? "1px solid rgba(16,185,129,0.5)" : "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px", marginBottom: "10px", background: appointment.status === "approved" ? "rgba(16,185,129,0.1)" : "rgba(0,0,0,0.25)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                  <div>
                    <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Saat</p>
                    <p style={{ color: "#fff", fontWeight: 700 }}>{appointment.time}</p>
                    <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "4px" }}>{formatDateToTr(appointment.date)}</p>
                  </div>
                  <div>
                    <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Musteri</p>
                    <p style={{ color: "#fff" }}>{appointment.name}</p>
                    <p style={{ color: "#cbd5e1", fontSize: "0.82rem" }}>{appointment.email}</p>
                  </div>
                  <div>
                    <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Arac</p>
                    <p style={{ color: "#fff" }}>{appointment.plate}</p>
                    <p style={{ color: "#cbd5e1", fontSize: "0.82rem" }}>{appointment.carModel}</p>
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <p style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Hizmet Türü</p>
                  <p style={{ color: "#e2e8f0", fontSize: "0.86rem", marginTop: "2px" }}>{appointment.serviceType ?? "Belirtilmedi"}</p>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <span style={{ display: "inline-block", borderRadius: "999px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: 700, background: appointment.status === "approved" ? "rgba(16,185,129,0.18)" : appointment.status === "cancelled" ? "rgba(239,68,68,0.18)" : "rgba(245,158,11,0.18)", color: appointment.status === "approved" ? "#6ee7b7" : appointment.status === "cancelled" ? "#fca5a5" : "#fcd34d", border: appointment.status === "approved" ? "1px solid rgba(16,185,129,0.45)" : appointment.status === "cancelled" ? "1px solid rgba(239,68,68,0.45)" : "1px solid rgba(245,158,11,0.45)" }}>
                    {getStatusLabel(appointment.status)}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                  <form action={updateAppointmentStatus} style={{ display: "flex", gap: "8px", alignItems: "center", flex: 1 }}>
                    <input type="hidden" name="appointmentId" value={appointment.id} />
                    <select name="status" defaultValue={appointment.status} className="form-select" style={{ maxWidth: "220px", padding: "8px 10px" }}>
                      <option value="pending">Beklemede</option>
                      <option value="approved">Onaylandı</option>
                      <option value="cancelled">İptal Edildi</option>
                    </select>
                    <button style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)", color: "#fff", padding: "8px 12px", fontWeight: 700, cursor: "pointer" }}>
                      Kaydet
                    </button>
                  </form>

                  <form action={deleteAppointment}>
                    <input type="hidden" name="appointmentId" value={appointment.id} />
                    <button style={{ borderRadius: "8px", border: "1px solid rgba(248,113,113,0.5)", background: "rgba(239,68,68,0.15)", color: "#fecaca", padding: "8px 12px", fontWeight: 700, cursor: "pointer" }}>
                      Sil
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 ? (
          <div className="card-glass" style={{ marginTop: "12px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <p style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
              Sayfa {page} / {totalPages}
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {page > 1 ? (
                <a href={buildAdminUrl({ date: selectedDate, status: selectedStatus, page: page - 1 })} style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.04)", color: "#fff", padding: "8px 12px", textDecoration: "none", fontWeight: 600 }}>
                  Önceki
                </a>
              ) : null}
              {page < totalPages ? (
                <a href={buildAdminUrl({ date: selectedDate, status: selectedStatus, page: page + 1 })} style={{ borderRadius: "8px", border: "1px solid rgba(248,113,113,0.45)", background: "rgba(239,68,68,0.14)", color: "#fecaca", padding: "8px 12px", textDecoration: "none", fontWeight: 600 }}>
                  Sonraki
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
