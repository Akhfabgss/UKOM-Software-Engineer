import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPdf = (employee:any)=>{

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Data Pegawai",14,20);

    autoTable(doc,{
        startY:30,
        head:[["Field","Value"]],
        body:[
            ["NIP",employee.NIP],
            ["Nama",employee.Nama],
            ["Divisi",employee.Nama_divisi],
            ["Tanggal Lahir",employee.Tanggal_lahir],
            ["Alamat",employee.Alamat],
        ]
    })

    doc.save(`pegawai_${employee.NIP}.pdf`);

}