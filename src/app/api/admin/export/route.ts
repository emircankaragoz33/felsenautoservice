import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatDateToTr } from "@/lib/appointment-rules";

export const runtime = "nodejs";

export async function GET(request: Request) {
    const session = await auth();
    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return new NextResponse("Invalid date", { status: 400 });
    }

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                date: new Date(`${dateStr}T00:00:00.000Z`),
                name: { not: "Sistem Kaydı (Manuel Kapalı)" }
            },
            orderBy: { time: "asc" }
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Randevular");

        // Title & Branding
        worksheet.mergeCells("A1:G1");
        const titleCell = worksheet.getCell("A1");
        titleCell.value = `FELSEN SERVİS - ${dateStr} TARİHLİ RANDEVU LİSTESİ`;
        titleCell.font = { name: "Arial Black", size: 16, color: { argb: "FFFFFFFF" }, bold: true };
        titleCell.alignment = { vertical: "middle", horizontal: "center" };
        titleCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFC00000" } // Felsen Red
        };

        // Header styling
        const headerRow = worksheet.getRow(3);
        headerRow.values = ["SAAT", "MÜŞTERİ ADI", "PLAKA", "MARKA/MODEL", "HİZMET", "TELEFON", "DURUM"];
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF262626" }
            };
            cell.alignment = { horizontal: "center" };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };
        });

        // Content
        appointments.forEach((app, index) => {
            const row = worksheet.addRow([
                app.time,
                app.name,
                app.plate,
                app.carModel,
                app.serviceType,
                app.phone,
                app.status === "approved" ? "ONAYLANDI" : (app.status === "cancelled" ? "İPTAL" : "BEKLEMEDE")
            ]);

            row.eachCell((cell, colNumber) => {
                cell.alignment = { vertical: "middle", horizontal: "center" };
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                // Status coloring
                if (colNumber === 7) {
                    if (app.status === "approved") {
                        cell.font = { color: { argb: "FF006600" }, bold: true };
                    } else if (app.status === "cancelled") {
                        cell.font = { color: { argb: "FF990000" }, bold: true };
                    } else {
                        cell.font = { color: { argb: "FFCC6600" }, bold: true };
                    }
                }
            });

            // Zebra striping
            if (index % 2 === 0) {
                row.eachCell((cell) => {
                    if (!cell.fill) {
                        cell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "FFF2F2F2" }
                        };
                    }
                });
            }
        });

        // Column widths
        worksheet.getColumn(1).width = 10;
        worksheet.getColumn(2).width = 25;
        worksheet.getColumn(3).width = 15;
        worksheet.getColumn(4).width = 25;
        worksheet.getColumn(5).width = 25;
        worksheet.getColumn(6).width = 15;
        worksheet.getColumn(7).width = 15;

        const buffer = await workbook.xlsx.writeBuffer();

        return new Response(buffer, {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename="Felsen_Randevu_${dateStr}.xlsx"`
            }
        });
    } catch (error) {
        console.error("Export Error:", error);
        return new NextResponse("Export failed", { status: 500 });
    }
}
