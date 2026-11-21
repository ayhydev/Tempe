# Tempe

Tempe adalah proyek pembelajaran front end berupa portal berita menggunakan React dan Vite. Berita diambil dari [News API](https://newsapi.org/), dengan data contoh sebagai cadangan ketika API tidak tersedia.

## Fitur

- Beranda dengan headline, daftar berita, dan sidebar informasi.
- Filter kategori Technology, Business, Sports, dan Entertainment.
- Pencarian judul pada daftar berita yang sedang dimuat.
- Tombol untuk menambah dan menghapus bookmark.
- Halaman Berita Tersimpan di `/bookmarks`.
- Tampilan responsif menggunakan CSS Grid dan media query.
- Pesan loading, hasil kosong, dan penanda data demo.

## Teknologi

React, Vite, React Router DOM, JavaScript, CSS biasa, dan Fetch API.

## Menjalankan proyek

Siapkan Node.js yang kompatibel dengan Vite 8 (20.19+ atau 22.12+) dan npm. Gunakan Node.js LTS yang masih didukung.

### 1. Instal dependensi

Buka terminal di folder proyek:

```bash
npm install
```

### 2. Konfigurasi News API

Dapatkan API key dari [News API](https://newsapi.org/). Buat file `.env.local` di root proyek, sejajar dengan `package.json`:

```dotenv
VITE_NEWS_API=isi_api_key_anda
```

Nama variabel harus sama dengan yang dibaca oleh `src/services/newsApi.js`. Restart server Vite setiap kali mengubah file environment.

Tanpa API key, aplikasi menggunakan data demo dari `src/data/mockNews.js`. Data tersebut merupakan contoh, bukan berita aktual.

File `.env` dan `*.local` sudah diabaikan melalui `.gitignore`. Jangan memasukkan API key ke commit. Variabel `VITE_*` tetap terlihat dalam aplikasi browser, sehingga pengabaian Git tidak membuat key tersembunyi dari pengunjung.

### 3. Jalankan server pengembangan

```bash
npm run dev
```

Buka URL yang ditampilkan terminal, biasanya `http://localhost:5173`.

## Cara menggunakan

1. Buka Beranda untuk melihat headline dan daftar berita.
2. Pilih kategori untuk mengambil berita sesuai topik.
3. Ketik kata kunci untuk menyaring judul yang sudah dimuat. Kosongkan pencarian untuk melihat kembali seluruh hasil kategori.
4. Klik tombol Bookmark pada berita yang ingin disimpan.
5. Buka Berita Tersimpan untuk melihat daftar pilihan atau menghapusnya.

## Perilaku dan batasan

- Endpoint saat ini adalah `/v2/top-headlines` dengan `country=us`. Cakupannya headline pasar Amerika Serikat, bukan seluruh berita dunia.
- Headline memakai artikel pertama dari respons API dan ikut berubah ketika kategori diganti.
- Pencarian dilakukan di browser pada artikel yang sudah dimuat, bukan seluruh arsip News API.
- Bookmark disimpan dalam state React. Daftar bertahan saat berpindah halaman, tetapi hilang setelah refresh atau aplikasi ditutup. Belum menggunakan `localStorage`.
- Dark mode belum diimplementasikan.
- Jika key kosong atau request gagal, aplikasi menampilkan data demo sesuai kategori.
- Respons API yang berhasil tetapi berisi nol artikel tetap menampilkan keadaan kosong, bukan otomatis memakai data demo.
- Akses API bergantung pada kuota dan ketentuan paket News API. Kemampuan berjalan di localhost tidak menjamin akses yang sama setelah deployment.
- Artikel lengkap dibuka pada situs sumber. Tautan pada data demo hanya berupa contoh.

## Struktur proyek

```text
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── NewsCard.jsx
│   └── NewsGrid.jsx
├── data/
│   └── mockNews.js
├── pages/
│   ├── Home.jsx
│   └── Bookmarks.jsx
├── services/
│   └── newsApi.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

Struktur di atas menampilkan file utama yang digunakan. Header dan footer saat ini berada di `App.jsx`; pencarian dan filter kategori berada di `Home.jsx`.

## Struktur HTML semantik

Proyek menggunakan `<header>` untuk identitas situs, `<nav>` untuk navigasi, `<main>` untuk isi halaman, `<section>` untuk kelompok berita, `<article>` untuk setiap berita, `<aside>` untuk informasi pendukung, dan `<footer>` untuk penutup.

Input pencarian serta dropdown kategori memiliki label. Tombol bookmark memakai `aria-pressed` untuk menyampaikan status tersimpan. Penggunaan elemen tersebut bukan klaim bahwa seluruh aspek aksesibilitas sudah diaudit.

## Pemeriksaan dan build

Periksa kode dengan ESLint:

```bash
npm run lint
```

Buat hasil produksi:

```bash
npm run build
```

Hasil build tersedia di folder `dist`. Untuk melihatnya secara lokal:

```bash
npm run preview
```

Sebelum dikumpulkan, periksa navigasi, kategori, pencarian, simpan/hapus bookmark, serta tampilan pada HP dan desktop. Keberhasilan lint dan build tidak menggantikan pemeriksaan fitur di browser.

## Catatan deployment

Routing menggunakan `BrowserRouter`. Hosting perlu mengarahkan rute aplikasi seperti `/bookmarks` ke `index.html` agar membuka atau me-refresh halaman tersebut tidak menghasilkan 404.

Pastikan paket News API mendukung penggunaan pada domain hosting. Untuk deployment publik yang memerlukan key rahasia, gunakan backend atau proxy serverless yang sesuai ketentuan layanan.
