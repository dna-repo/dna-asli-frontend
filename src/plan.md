eslint --fix --ext .js,.vue src

Done
1. login
2. register
3. home user
4. dasar dashboard
5. pagination 

tabel
1. filter 
    1. menampilkan kategori yang berbeda 
    2. normal ketika pindah halaman ❌
    ![Contoh](contoh.jpg)


Next
1. Detail Laporan




PEMBUATAN LAPORAN PENGADUAN - APH ✔️
1. masukkan identitas pelapor
    1. NIK -> angka, harus 16 digit
    2. Nama lengkap -> tidak boleh kosong
    3. Jenis kelamin -> dropdown
    4. Alamat -> tidak boleh kosong
    5. Pekerjaan -> 
    6. Tanggal lahir -> tidak boleh kosong
    8. Nomor telepon -> angka, minimal 11 angka
    7. Email -> email, tidak boleh kosong
    9. NRP -> angka, tidak boleh kosong
2. sampaikan isi laporan
    1. klasifikasi pengaduan
    2. judul pengaduan
    3. isi laporan
    4. instansi tujuan
3. lampiran/ file pendukung 
    1. file lampiran -> optional
4. generate by sistim
    1. id laporan
    2. tiket laporan
    3. status laporan
    4. tanggal laporan

PEMBUATAN LAPORAN PENGADUAN - LSM ✔️
1. masukkan identitas pelapor
    1. NIK -> angka, harus 16 digit
    2. Nama lengkap -> tidak boleh kosong
    3. Jenis kelamin -> dropdown
    4. Alamat -> tidak boleh kosong
    5. Pekerjaan -> 
    6. Tanggal lahir -> tidak boleh kosong
    8. Nomor telepon -> angka, minimal 11 angka
    7. Email -> email, tidak boleh kosong
    9. ID_pres -> angka, tidak boleh kosong
2. sampaikan isi laporan
    1. klasifikasi pengaduan
    2. judul pengaduan
    3. isi laporan
    4. instansi tujuan
3. lampiran/ file pendukung 
    1. file lampiran -> optional
4. generate by sistim
    1. id laporan
    2. tiket laporan
    3. status laporan
    4. tanggal laporan


PEMBUATAN LAPORAN PENGADUAN - PNS ✔️
1. masukkan identitas pelapor
    1. NIK -> angka, harus 16 digit
    2. Nama lengkap -> tidak boleh kosong
    3. Jenis kelamin -> dropdown
    4. Alamat -> tidak boleh kosong
    5. Pekerjaan -> 
    6. Tanggal lahir -> tidak boleh kosong
    8. Nomor telepon -> angka, minimal 11 angka
    7. Email -> email, tidak boleh kosong
    9. NIP -> angka, tidak boleh kosong
2. sampaikan isi laporan
    1. klasifikasi pengaduan
    2. judul pengaduan
    3. isi laporan
    4. instansi tujuan
3. lampiran/ file pendukung 
    1. file lampiran -> optional
4. generate by sistim
    1. id laporan
    2. tiket laporan
    3. status laporan
    4. tanggal laporan

PEMBUATAN LAPORAN PENGADUAN - Masyarakat ✔️
1. masukkan identitas pelapor
    1. NIK -> angka, harus 16 digit
    2. Nama lengkap -> tidak boleh kosong
    3. Jenis kelamin -> dropdown
    4. Alamat -> tidak boleh kosong
    5. Pekerjaan -> 
    6. Tanggal lahir -> tidak boleh kosong
    8. Nomor telepon -> angka, minimal 11 angka
    7. Email -> email, tidak boleh kosong
2. sampaikan isi laporan
    1. klasifikasi pengaduan
    2. judul pengaduan
    3. isi laporan
    4. instansi tujuan
3. lampiran/ file pendukung 
    1. file lampiran -> optional
4. generate by sistim
    1. id laporan
    2. tiket laporan
    3. status laporan
    4. tanggal laporan

PEMBUATAN LAPORAN PENGADUAN (DARI USER) - Masyarakat ✔️
1. masukkan identitas pelapor
    1. NIK -> angka, harus 16 digit
    2. Nama lengkap -> tidak boleh kosong
    3. Jenis kelamin -> dropdown
    4. Alamat -> tidak boleh kosong
    5. Pekerjaan -> 
    6. Tanggal lahir -> tidak boleh kosong
    8. Nomor telepon -> angka, minimal 11 angka
    7. Email -> email, tidak boleh kosong
2. sampaikan isi laporan
    1. klasifikasi pengaduan
    2. judul pengaduan
    3. isi laporan
    4. instansi tujuan
3. lampiran/ file pendukung 
    1. file lampiran -> optional
4. generate by sistim
    1. id laporan
    2. tiket laporan
    3. status laporan
    4. tanggal laporan

=====================================================================

PEMBUATAN LAPORAN PERCERAIAN -> klasifikasi perceraian hanya muncul jika pelapor adalah pns ❌
1. masukkan identitas pelapor -> pns
    1. NIK -> angka, harus 16 digit
    2. Nama lengkap -> tidak boleh kosong
    3. Jenis kelamin -> dropdown
    4. Alamat -> tidak boleh kosong
    5. Pekerjaan -> 
    6. Tanggal lahir -> tidak boleh kosong
    8. Nomor telepon -> angka, minimal 11 angka
    7. Email -> email, tidak boleh kosong
    9. NIP -> angka, tidak boleh kosong
2. 










MUNCULKAN DETAIL LAPORAN ✔️

Daftar
1. munculkan data sesuai nik masukkan - ambil dari api


login
1. login dengan response
 - currentLogin {
    - token
    - account
 }
2. simpan data current login di localstorage
3. tidak login lagi ketika refresh
4. buat fungsi login dan logout
 {
    UI Edit ✔️
 }
5. edit user
6. ganti poto profil