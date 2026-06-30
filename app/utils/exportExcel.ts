import * as XLSX from "xlsx";

export const exportExcel = (employee: any) => {

    const data = [
        {
            NIP: employee.NIP,
            Nama: employee.Nama,
            Divisi: employee.Nama_divisi,
            "Tanggal Lahir": employee.Tanggal_lahir,
            Alamat: employee.Alamat
        }
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Pegawai");

    XLSX.writeFile(workbook, `pegawai_${employee.NIP}.xlsx`);

}