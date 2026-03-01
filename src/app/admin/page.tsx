import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { deleteAppointment, logoutAdmin, updateAppointmentStatus, blockAppointmentSlot } from "@/app/admin/actions";
import { formatDateToTr, generateSlotsForDate, nowInIstanbulParts, isSunday, validateAppointmentDateAndTime } from "@/lib/appointment-rules";
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

function buildAdminUrl(params: any) {
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
    redirect("/admin/login");
  }

  const params = await searchParams;

  // Safe Istanbul Time
  let todayString = "2024-01-01";
  try {
    const nowParts = nowInIstanbulParts();
    todayString = `${nowParts.year}-${String(nowParts.month).padStart(2, "0")}-${String(nowParts.day).padStart(2, "0")}`;
  } catch (e) {
    console.error("Istanbul Time Error", e);
  }

  const selectedDate = isValidDate(params?.date) ? (params?.date as string) : undefined;
  const activeDate = selectedDate || todayString;
  const selectedStatus = isValidStatus(params?.status) ? params?.status : undefined;

  const requestedPage = Number(params?.page ?? "1");
  const pageSize = 10;
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const where = {
    ...(selectedDate ? { date: new Date(`${selectedDate}T00:00:00.000Z`) } : {}),
    ...(selectedStatus ? { status: selectedStatus } : {}),
  };

  const whereForList = {
    ...where,
    name: { not: "Sistem Kaydı (Manuel Kapalı)" }
  };

  // Parallel Data Fetching for maximum performance
  let appointments: AppointmentListItem[] = [];
  let totalCount = 0;
  let approvedCount = 0;
  let pendingCount = 0;
  let allAppointmentsOnActiveDate: AppointmentListItem[] = [];
  let dbError = false;

  try {
    const activeDateObj = new Date(`${activeDate}T00:00:00.000Z`);
    const [total, list, statusRes, slotsRes] = await Promise.all([
      prisma.appointment.count({ where: whereForList }),
      prisma.appointment.findMany({
        where: whereForList,
        orderBy: selectedDate
          ? [{ time: "asc" }] // If looking at a specific day, show by time
          : [{ createdAt: "desc" }], // If looking at all, show most recently submitted first
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }) as Promise<AppointmentListItem[]>,
      prisma.appointment.groupBy({
        by: ["status"],
        where: selectedDate ? { date: activeDateObj } : undefined,
        _count: { status: true },
      }),
      prisma.appointment.findMany({
        where: { date: activeDateObj },
      }) as Promise<AppointmentListItem[]>
    ]);

    totalCount = total;
    appointments = list;
    approvedCount = statusRes.find(item => item.status === "approved")?._count.status ?? 0;
    pendingCount = statusRes.find(item => item.status === "pending")?._count.status ?? 0;
    allAppointmentsOnActiveDate = slotsRes;
  } catch (err) {
    console.error("Prisma Error:", err);
    dbError = true;
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const page = Math.min(currentPage, totalPages);

  // Slot grid calculation
  const baseSlots = isSunday(activeDate) ? [] : generateSlotsForDate(activeDate);
  const slotsData = baseSlots.map(time => {
    try {
      const existing = allAppointmentsOnActiveDate.find(app => app.time === time);
      const isPast = activeDate === todayString && !validateAppointmentDateAndTime(activeDate, time).valid;
      const isManualBlock = existing?.name === "Sistem Kaydı (Manuel Kapalı)";

      return {
        time,
        isPast,
        existing,
        isManualBlock,
        state: existing ? (isManualBlock ? "blocked" : "booked") : (isPast ? "past" : "available")
      };
    } catch {
      return { time, state: "available" as const };
    }
  });

  const nextDay = new Date(`${activeDate}T12:00:00Z`);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDayStr = nextDay.toISOString().split("T")[0];

  const prevDay = new Date(`${activeDate}T12:00:00Z`);
  prevDay.setDate(prevDay.getDate() - 1);
  const prevDayStr = prevDay.toISOString().split("T")[0];

  const PaginationControls = () => (
    totalPages > 1 && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", padding: "10px 0" }}>
        <Link href={buildAdminUrl({ ...params, page: page - 1 })} style={{ padding: "8px 15px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", textDecoration: "none", color: "white", opacity: page > 1 ? 1 : 0.3, pointerEvents: page > 1 ? 'auto' : 'none' }}>
          <i className="fas fa-arrow-left me-2"></i> Geri
        </Link>
        <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Sayfa <strong>{page} / {totalPages}</strong></span>
        <Link href={buildAdminUrl({ ...params, page: page + 1 })} style={{ padding: "8px 15px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", textDecoration: "none", color: "white", opacity: page < totalPages ? 1 : 0.3, pointerEvents: page < totalPages ? 'auto' : 'none' }}>
          İleri <i className="fas fa-arrow-right ms-2"></i>
        </Link>
      </div>
    )
  );

  return (
    <section className="section-padding" style={{ paddingTop: "185px", paddingBottom: "110px", minHeight: "100vh", background: "#0a0a0a", color: "white" }}>
      <div className="container" style={{ maxWidth: "1400px" }}>

        {dbError && (
          <div style={{ background: "rgba(239,68,68,0.2)", border: "1px solid #ef4444", padding: "15px", borderRadius: "10px", marginBottom: "20px", color: "#fca5a5" }}>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Veritabanı bağlantısında bir sorun oluştu. Lütfen bağlantı ayarlarını kontrol edin veya biraz sonra tekrar deneyin.
          </div>
        )}

        {/* Header Section */}
        <div className="card-glass" style={{ padding: "26px", marginBottom: "20px", display: "flex", justifyContent: "space-between", gap: "20px", alignItems: "center", flexWrap: "wrap", borderRadius: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <div style={{ display: "inline-block", padding: "6px 14px", background: "rgba(255,255,255,0.05)", borderRadius: "999px", color: "#94a3b8", fontSize: "0.80rem", textTransform: "uppercase", marginBottom: "8px" }}>
              <i className="fas fa-shield-alt me-2"></i> Yetkili Panel
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>Randevu Yönetimi</h1>
            <p style={{ marginTop: "4px", color: "#94a3b8" }}>{session.user.email}</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/" target="_blank" style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#e2e8f0", padding: "12px 20px", fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center" }}>
              <i className="fas fa-external-link-alt me-2"></i> Siteye Dön
            </Link>
            <form action={logoutAdmin}>
              <button style={{ borderRadius: "12px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.15)", color: "#fecaca", padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}>
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>

        {/* Overview Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "30px" }}>
          <div className="card-glass" style={{ padding: "24px", borderRadius: "20px", background: "rgba(255,255,255,0.03)" }}>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" }}>Müşteri Randevuları</p>
            <p style={{ fontSize: "2.2rem", fontWeight: 800, margin: "5px 0 0 0" }}>{totalCount}</p>
          </div>
          <div className="card-glass" style={{ padding: "24px", borderRadius: "20px", borderLeft: "4px solid #10b981", background: "rgba(16,185,129,0.05)" }}>
            <p style={{ color: "#6ee7b7", fontSize: "0.85rem", textTransform: "uppercase" }}>Onaylanan</p>
            <p style={{ color: "#d1fae5", fontSize: "2.2rem", fontWeight: 800, margin: "5px 0 0 0" }}>{approvedCount}</p>
          </div>
          <div className="card-glass" style={{ padding: "24px", borderRadius: "20px", borderLeft: "4px solid #f59e0b", background: "rgba(245,158,11,0.05)" }}>
            <p style={{ color: "#fcd34d", fontSize: "0.85rem", textTransform: "uppercase" }}>Bekleyen</p>
            <p style={{ color: "#fef3c7", fontSize: "2.2rem", fontWeight: 800, margin: "5px 0 0 0" }}>{pendingCount}</p>
          </div>
        </div>

        {/* Quick Filters */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "25px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "#94a3b8", fontSize: "0.9rem", marginRight: "8px" }}><i className="fas fa-filter me-1"></i> Filtrele:</span>

          <Link href="/admin" style={{ padding: "8px 16px", borderRadius: "10px", background: !selectedDate && !selectedStatus ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", textDecoration: "none", fontSize: "0.9rem" }}>
            Hepsi
          </Link>

          <Link href={buildAdminUrl({ date: todayString, page: 1 })} style={{ padding: "8px 16px", borderRadius: "10px", background: selectedDate === todayString ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.3)", color: "white", textDecoration: "none", fontSize: "0.9rem" }}>
            <i className="fas fa-calendar-day me-2"></i> Bugün
          </Link>

          <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.1)", margin: "0 5px" }}></div>

          <Link href={buildAdminUrl({ ...params, status: "pending", page: 1 })} style={{ padding: "8px 16px", borderRadius: "10px", background: selectedStatus === "pending" ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(245,158,11,0.3)", color: "white", textDecoration: "none", fontSize: "0.9rem" }}>
            Bekleyenler
          </Link>

          <Link href={buildAdminUrl({ ...params, status: "approved", page: 1 })} style={{ padding: "8px 16px", borderRadius: "10px", background: selectedStatus === "approved" ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(16,185,129,0.3)", color: "white", textDecoration: "none", fontSize: "0.9rem" }}>
            Onaylılar
          </Link>

          <div style={{ flex: 1 }}></div>

          <a
            href={`/api/admin/export?${new URLSearchParams({
              ...(selectedDate ? { date: selectedDate } : {}),
              ...(selectedStatus ? { status: selectedStatus } : {})
            }).toString()}`}
            download
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 700,
              boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <i className="fas fa-file-excel"></i>
            Excel Olarak İndir {selectedDate ? `(${selectedDate})` : "(Hepsi)"}
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>

          {/* Slot Manager */}
          <div className="card-glass" style={{ padding: "24px", borderRadius: "20px", background: "rgba(255,255,255,0.03)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "20px" }}><i className="fas fa-th-large me-2"></i> Slot Durumu</h2>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.3)", borderRadius: "12px", padding: "10px", marginBottom: "20px" }}>
              <Link href={buildAdminUrl({ ...params, date: prevDayStr, page: 1 })} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", color: "white" }}>
                <i className="fas fa-chevron-left"></i>
              </Link>
              <div style={{ textAlign: "center" }}>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#94a3b8" }}>{formatDateToTr(new Date(`${activeDate}T00:00:00Z`))}</span>
                <span style={{ fontWeight: 700 }}>{activeDate}</span>
              </div>
              <Link href={buildAdminUrl({ ...params, date: nextDayStr, page: 1 })} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", color: "white" }}>
                <i className="fas fa-chevron-right"></i>
              </Link>
            </div>

            {isSunday(activeDate) ? (
              <p style={{ textAlign: "center", padding: "20px", color: "#94a3b8" }}>Pazar Günleri Kapalı</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "8px" }}>
                {slotsData.map((slot: any) => (
                  <div key={slot.time}>
                    {slot.state === "available" ? (
                      <form action={blockAppointmentSlot}>
                        <input type="hidden" name="date" value={activeDate} />
                        <input type="hidden" name="time" value={slot.time} />
                        <button style={{ width: "100%", padding: "10px 0", background: "rgba(16,185,129,0.1)", border: "1px solid #10b981", borderRadius: "8px", color: "#34d399", cursor: "pointer", fontSize: "0.85rem" }}>
                          {slot.time}
                        </button>
                      </form>
                    ) : slot.state === "blocked" ? (
                      <form action={deleteAppointment}>
                        <input type="hidden" name="appointmentId" value={slot.existing.id} />
                        <button style={{ width: "100%", padding: "10px 0", background: "rgba(239,68,68,0.2)", border: "1px dashed #ef4444", borderRadius: "8px", color: "#fca5a5", cursor: "pointer", fontSize: "0.85rem" }}>
                          KİLİTLİ
                        </button>
                      </form>
                    ) : (
                      <div style={{ width: "100%", padding: "10px 0", background: "rgba(59,130,246,0.15)", border: "1px solid #3b82f6", borderRadius: "8px", color: "#93c5fd", textAlign: "center", fontSize: "0.85rem", opacity: slot.state === "past" ? 0.4 : 1 }}>
                        {slot.time}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* List View */}
          <div className="card-glass" style={{ padding: "24px", borderRadius: "20px", background: "rgba(255,255,255,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: "700", margin: 0 }}><i className="fas fa-list me-2"></i> Müşteri Listesi</h2>
            </div>

            <PaginationControls />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", margin: "10px 0" }}>
              {appointments.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
                  <i className="fas fa-search mb-3" style={{ fontSize: "2rem", opacity: 0.3 }}></i>
                  <p>Aktif randevu bulunmuyor.</p>
                </div>
              ) : (
                appointments.map((app) => (
                  <div key={app.id} style={{ padding: "15px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontWeight: 800, color: "#fff", fontSize: "1.1rem" }}>{app.time}</span>
                      <span style={{ fontSize: "0.80rem", color: "#94a3b8", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "4px" }}>
                        {formatDateToTr(app.date)}
                      </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ margin: "0 0 4px 0", fontWeight: 700, fontSize: "1rem" }}>{app.name}</p>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8" }}>{app.plate} • {app.carModel}</p>
                      <p style={{ margin: "4px 0 0 0", fontSize: "0.8rem", color: "#64748b" }}>{app.phone} • {app.serviceType}</p>
                    </div>

                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <form action={updateAppointmentStatus} style={{ flex: 1, display: "flex", gap: "5px" }}>
                        <input type="hidden" name="appointmentId" value={app.id} />
                        <select name="status" defaultValue={app.status} style={{ flex: 1, background: "rgba(0,0,0,0.3)", color: "white", padding: "8px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.85rem" }}>
                          <option value="pending">Beklemede</option>
                          <option value="approved">Onayla</option>
                          <option value="cancelled">İptal</option>
                        </select>
                        <button style={{ padding: "8px 12px", background: "rgba(255,255,255,0.1)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}>Kaydet</button>
                      </form>

                      <form action={deleteAppointment}>
                        <input type="hidden" name="appointmentId" value={app.id} />
                        <button style={{ padding: "8px 12px", background: "transparent", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", cursor: "pointer" }} title="Sil">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>

            <PaginationControls />
          </div>

        </div>
      </div>
    </section>
  );
}
