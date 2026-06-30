import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req: NextRequest) {

    const nip = req.nextUrl.searchParams.get("nip");

    if (!nip) {
        return NextResponse.json(
            {
                success: false,
                message: "NIP wajib diisi"
            },
            {
                status: 400
            }
        );
    }

    try {

        const [rows]: any = await db.query(
            `
            SELECT
                p.NIP,
                p.Nama,
                p.Alamat,
                p.Tanggal_lahir,
                d.Nama_divisi
            FROM tblpegawai p
            LEFT JOIN tbldivisi d
            ON p.Kode_Divisi = d.Kode_divisi
            WHERE p.NIP = ?
            `,
            [nip]
        );

        if (rows.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Data tidak ditemukan"
            });
        }

        return NextResponse.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Server Error"
            },
            {
                status: 500
            }
        );

    }

}