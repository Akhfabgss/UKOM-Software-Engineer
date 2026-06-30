-- Berapa kali masing-masing pegawai melakukan presensi pada bulan Januari 2018
SELECT
    p.NIP,
    p.Nama,
    COUNT(pr.NIP) AS Total_Presensi
FROM tblpegawai p
JOIN tblpresensi pr
    ON p.NIP = pr.NIP
WHERE MONTH(pr.Tanggal) = 1
  AND YEAR(pr.Tanggal) = 2018
GROUP BY p.NIP, p.Nama;

-- Jumlah pegawai di masing-masing divisi
SELECT
    d.Nama_divisi,
    COUNT(p.NIP) AS Jumlah_Pegawai
FROM tbldivisi d
LEFT JOIN tblpegawai p
    ON d.Kode_divisi = p.Kode_Divisi
GROUP BY d.Kode_divisi, d.Nama_divisi;

-- Daftar pegawai yang alamatnya di Bogor
SELECT
    NIP,
    Nama,
    Alamat
FROM tblpegawai
WHERE Alamat LIKE '%Bogor%';
