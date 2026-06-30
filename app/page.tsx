"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Building2,
  Calendar,
  MapPin,
  UserSearch,
} from "lucide-react";
import { exportExcel } from "@/app/utils/exportExcel";
import { exportPdf } from "@/app/utils/exportPdf";

export default function Home() {
  const [nip, setNip] = useState("");
  const [searched, setSearched] = useState(false);

  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!nip) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pegawai?nip=${nip}`);
      const result = await res.json();
      if (result.success) {
        setEmployee(result.data);
        setSearched(true);
      } else {
        setEmployee(null);
        setSearched(false);
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
      alert("Terjadi kesalahan.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#F6F5FD]">

      {/* HEADER */}
      <header className="bg-white h-16 flex items-center justify-center shadow-sm">
        <h1 className="font-bold text-2xl text-[#16345D]">
          PT ABC Workforce
        </h1>
      </header>

      {/* HERO */}
      <section className="bg-[#12315A] pb-28">
        <div className="max-w-5xl mx-auto px-6 pt-20">

          <h1 className="text-center text-white font-bold text-5xl md:text-6xl">
            Portal Informasi Karyawan
          </h1>

          <p className="text-center text-blue-200 mt-5 text-lg">
            Verifikasi identitas dan status aktif karyawan PT ABC melalui nomor
            induk pegawai.
          </p>

          <div className="w-10 h-2 rounded-full bg-white/20 mx-auto mt-3"></div>

          {/* SEARCH */}
          <div className="bg-white rounded-3xl p-4 mt-10 shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center border rounded-2xl px-5 h-16">

                <Search className="text-gray-400 w-6 h-6" />

                <input
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="Masukkan NIP (Contoh: 123456)"
                  className="flex-1 ml-3 outline-none text-lg"
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-2xl px-10 h-16"
              >
                Cari
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mt-20 px-5 pb-20">
        {!searched ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border p-12">

            <div className="flex justify-center">
              <UserSearch className="w-20 h-20 text-gray-300" />
            </div>

            <h2 className="text-center text-4xl font-bold mt-6">
              Cari Data Karyawan
            </h2>

            <p className="text-center text-gray-500 mt-5 text-lg leading-8">
              Masukkan Nomor Induk Pegawai (NIP) pada kolom pencarian di atas
              untuk melihat detail profil publik.
            </p>

          </div>
        ) : (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border p-8 md:p-12">

            {/* Nama */}
            <Field
              label="NAMA LENGKAP"
              value={employee?.Nama}
            />

            {/* Divisi */}
            <Field
              label="DIVISI"
              value={employee?.Nama_divisi}
              icon={<Building2 className="w-5 h-5 text-blue-700" />}
            />

            {/* Tanggal */}
            <Field
              label="TANGGAL LAHIR"
              value={
                employee?.Tanggal_lahir
                  ? new Date(employee.Tanggal_lahir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  : "-"
              }
              icon={<Calendar className="w-5 h-5 text-blue-700" />}
            />

            {/* Alamat */}
            <Field
              label="ALAMAT"
              value={employee?.Alamat}
              icon={<MapPin className="w-5 h-5 text-blue-700" />}
            />
            <div className="border-t mt-10 pt-8 flex flex-col sm:flex-row justify-end gap-4">

              <button
              onClick={()=>exportPdf(employee)}
              className="border-2 border-blue-700 text-blue-700 rounded-xl px-8 py-3 font-semibold">
                Cetak PDF
              </button>

              <button
              onClick={()=>exportExcel(employee)}
              className="bg-blue-700 text-white rounded-xl px-8 py-3 font-semibold">
                Cetak Excel
              </button>

            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm font-bold text-gray-600 mb-2">
        {label}
      </p>

      <div className="border rounded-xl p-4 flex items-start gap-3">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
