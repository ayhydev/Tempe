# Rencana Proyek: Portal Berita Internasional "Tempe"

Dokumen ini berisi rencana kerja lengkap untuk proyek Front End berbasis **React + Vite**.
Tema: portal berita internasional dengan data dari News API, dilengkapi data cadangan (*mock*)
agar aplikasi tetap bisa dipakai saat API key belum tersedia atau kuota habis.

---

## 1. Ketentuan Proyek

| Ketentuan | Rencana Pemenuhan |
|---|---|
| Tema portal berita internasional | Data dari News API + data cadangan lokal |
| Struktur semantik HTML5 | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` |
| Minimal 2 halaman | Beranda `/` dan Berita Tersimpan `/bookmarks` |
| Interaktivitas JS/DOM | Dark mode, pencarian, filter kategori, bookmark |
| Desain responsif | CSS Flexbox + Grid, nyaman di HP, tablet, desktop |
| Tech stack | React (Vite) + `react-router-dom` + CSS biasa |

Ruang lingkup dibuat sederhana dan dapat dijelaskan saat presentasi: tanpa backend,
tanpa database. Seluruh data pengguna (tema dan bookmark) disimpan di `localStorage`.

---

## 2. Status Saat Ini

Sudah tersedia:

- Proyek React + Vite (`react` 19, `vite` 8).
- `react-router-dom` sudah ada di `package.json` (versi `^7.18.5`).
- Folder dan file dasar sudah dibuat:
  - `src/components/` (CategoryFilter, NewsCard, NewsGrid, SearchBar, ThemeToggle)
  - `src/components/layout/` (Header, Navbar, Footer, Sidebar)
  - `src/pages/` (Home, Bookmarks)
  - `src/services/newsApi.js`, `src/data/mockNews.js`
  - `src/styles/index.css`
- `.gitignore` sudah mengabaikan `node_modules`, `dist`, dan `*.local`.

Belum selesai:

- Sebagian besar file komponen masih kosong.
- `src/styles/index.css` masih kosong.
- `ThemeContext` dan `BookmarkContext` belum ada.
- Belum ada `.env.example` dan `README.md` proyek.
- Routing dan integrasi API belum dipasang.

---

## 3. Struktur Folder Target

```text
Tempe/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── placeholder-news.svg        (rencana: gambar fallback kartu berita)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx          <header> + identitas situs + ThemeToggle
│   │   │   ├── Navbar.jsx          <nav> + tautan Beranda/Bookmarks
│   │   │   ├── Footer.jsx          <footer>
│   │   │   └── Sidebar.jsx         <aside> informasi pendukung
│   │   ├── NewsCard.jsx            <article> + tombol bookmark
│   │   ├── NewsGrid.jsx            pembungkus grid kartu berita
│   │   ├── SearchBar.jsx           <form role="search">
│   │   ├── CategoryFilter.jsx      tombol filter kategori
│   │   └── ThemeToggle.jsx         tombol ubah tema
│   ├── pages/
│   │   ├── Home.jsx                <main> beranda
│   │   └── Bookmarks.jsx           <main> berita tersimpan
│   ├── context/
│   │   ├── ThemeContext.jsx        state tema + persistensi
│   │   └── BookmarkContext.jsx     state bookmark + persistensi
│   ├── services/
│   │   └── newsApi.js              request API + penanganan error/fallback
│   ├── data/
│   │   └── mockNews.js             array berita contoh
│   ├── styles/
│   │   └── index.css               variabel tema, layout, responsif
│   ├── App.jsx                     definisi route
│   └── main.jsx                    entry point + provider
├── .env.example
├── .env.local                      (tidak di-commit)
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── PLAN.md
```

### Peran folder penting

- **`context/`** menyimpan state yang dipakai banyak komponen tanpa mengoper *props* berlapis.
  `ThemeContext` menyimpan mode terang/gelap; `BookmarkContext` menyimpan daftar berita tersimpan.
  Keduanya menulis ke `localStorage` agar data bertahan setelah refresh.
- **`services/newsApi.js`** berisi fungsi pengambilan berita: menyusun URL, memanggil `fetch`,
  menerjemahkan respons, dan menangani kegagalan (API key kosong, limit, CORS, jaringan).
- **`data/mockNews.js`** berisi array berita buatan dengan bentuk data yang sama seperti hasil API.
  Berkas ini dipakai sebagai data awal pengembangan dan sebagai cadangan saat request gagal.

---

## 4. Langkah Kerja

### Langkah 1 — Setup dan instalasi

```powershell
npm install
npm install react-router-dom
npm run dev
```

Buka `http://localhost:5173`. Target: halaman awal React tampil tanpa error.

### Langkah 2 — Struktur folder

Folder sudah ada. Perintah berikut hanya diperlukan bila folder perlu dibuat ulang:

```powershell
New-Item -ItemType Directory -Force -Path src/components/layout, src/pages, src/context, src/services, src/data, src/styles
```

### Langkah 3 — Komponen layout semantik

1. **`Header.jsx`**: memuat nama situs, tautan utama, dan `ThemeToggle`.
2. **`Navbar.jsx`**: `<nav aria-label="Navigasi utama">` dengan `NavLink` ke `/` dan `/bookmarks`.
   Gunakan `NavLink` agar halaman aktif punya penanda visual dan `aria-current="page"`.
3. **`Sidebar.jsx`**: `<aside>` berisi ringkasan tentang portal dan tautan ke halaman bookmark.
4. **`Footer.jsx`**: informasi hak cipta dan keterangan sumber data.

Semua komponen layout dirender sekali di `App.jsx` dan mengapit `<Outlet />`.

### Langkah 4 — Dark mode dan routing

**Routing (`App.jsx`):**

```jsx
<BrowserRouter>
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
```

**Tema:**

- `ThemeContext` menyimpan nilai `"light"` atau `"dark"`.
- Nilai awal diambil dari `localStorage`, atau dari `prefers-color-scheme` bila belum pernah dipilih.
- Nilai tema ditulis ke atribut `data-theme` pada elemen `<html>`.
- Semua warna di CSS memakai variabel CSS, sehingga pergantian tema hanya mengganti variabel.
- `ThemeToggle` adalah `<button>` dengan `aria-pressed` dan label yang jelas.

**Bookmark:**

- `BookmarkContext` menyimpan array berita yang disimpan.
- Identitas unik memakai `url` berita.
- Fungsi `toggleBookmark(article)` menambah atau menghapus.
- Data ditulis ke `localStorage` setiap kali berubah.
- Tombol simpan memakai `aria-pressed` untuk menandai status tersimpan.

### Langkah 5 — Integrasi News API dan data cadangan

Struktur `newsApi.js`:

```js
export async function getNews({ query = "", category = "", signal } = {}) {
  // 1. Cek API key. Bila kosong, langsung kembalikan data cadangan.
  // 2. Susun URL News API (endpoint top-headlines atau everything).
  // 3. Panggil fetch dengan signal untuk pembatalan request.
  // 4. Bila status bukan OK, lempar error terkontrol.
  // 5. Normalisasi artikel agar bentuknya seragam.
  // 6. Bila gagal, kembalikan { articles: mockNews, isFallback: true }.
}
```

Bentuk artikel yang dipakai UI:

```js
{
  title: "Judul berita",
  description: "Ringkasan berita.",
  url: "https://example.com/berita",
  imageUrl: "https://example.com/gambar.jpg",
  publishedAt: "2026-11-14T08:00:00Z",
  source: "Nama Sumber",
  category: "technology",
}
```

**Penanganan kondisi khusus:**

- API key kosong: tampilkan data cadangan dan keterangan "Data demo".
- Kuota habis atau error jaringan: tampilkan data cadangan dan pesan singkat.
- Pencarian tanpa hasil: tampilkan keadaan kosong (*empty state*) yang jelas.
- Gambar gagal dimuat: ganti dengan `placeholder-news.svg` lewat `onError`.
- Request lama dibatalkan memakai `AbortController` saat pencarian berubah.

**Konfigurasi:**

```dotenv
# .env.example
VITE_NEWS_API_KEY=
```

`VITE_*` terbaca di browser, jadi nilai ini tidak boleh dianggap rahasia.
Batasan CORS dan paket API perlu diuji sebelum deployment; bila bermasalah,
gunakan proxy serverless sederhana dan jelaskan pada laporan.

### Langkah 6 — CSS responsif

**Variabel tema:**

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #1a1a1a;
  --color-muted: #666666;
  --color-accent: #c8102e;
  --color-border: #dddddd;
}

[data-theme="dark"] {
  --color-bg: #121212;
  --color-surface: #1e1e1e;
  --color-text: #f0f0f0;
  --color-muted: #a0a0a0;
  --color-accent: #ff4d6a;
  --color-border: #333333;
}
```

**Titik henti (breakpoint):**

| Ukuran | Perilaku |
|---|---|
| < 640px | Satu kolom; navigasi ringkas; sidebar turun ke bawah |
| 640–1023px | Grid dua kolom untuk kartu berita |
| ≥ 1024px | Konten utama + sidebar berdampingan; grid tiga kolom |

**Prinsip tampilan:**

- Gaya editorial ala portal berita: judul tebal, garis pemisah tipis, aksen warna tunggal.
- `line-clamp` untuk membatasi panjang judul dan ringkasan kartu.
- Fokus keyboard terlihat (`:focus-visible`).
- Hormati `prefers-reduced-motion` untuk animasi.
- Transisi warna halus saat tema berganti.

---

## 5. Rancangan HTML Semantik Halaman Beranda

```html
<header>
  <h1>Tempe — Berita Internasional</h1>
  <button type="button">Ubah tema</button>

  <nav aria-label="Navigasi utama">
    <a href="/">Beranda</a>
    <a href="/bookmarks">Berita Tersimpan</a>
  </nav>
</header>

<main>
  <section aria-labelledby="headline-title">
    <h2 id="headline-title">Headline Utama</h2>
    <article>
      <img src="headline.jpg" alt="Deskripsi gambar berita" />
      <h3><a href="https://example.com/berita">Judul headline</a></h3>
      <p>Ringkasan berita utama...</p>
      <button type="button">Simpan berita</button>
    </article>
  </section>

  <div class="news-layout">
    <section aria-labelledby="latest-title">
      <h2 id="latest-title">Berita Terbaru</h2>

      <form role="search">
        <label for="search">Cari berita</label>
        <input id="search" name="q" type="search" />
        <button type="submit">Cari</button>
      </form>

      <fieldset>
        <legend>Filter kategori</legend>
        <button type="button" aria-pressed="true">Semua</button>
        <button type="button" aria-pressed="false">Technology</button>
        <button type="button" aria-pressed="false">Business</button>
        <button type="button" aria-pressed="false">Sports</button>
        <button type="button" aria-pressed="false">Entertainment</button>
      </fieldset>

      <div class="news-grid">
        <article>
          <h3><a href="https://example.com/artikel">Judul berita</a></h3>
          <p>Ringkasan berita...</p>
          <button type="button">Simpan berita</button>
        </article>
      </div>
    </section>

    <aside aria-labelledby="about-title">
      <h2 id="about-title">Tentang Portal</h2>
      <p>Berita internasional dari berbagai sumber.</p>
      <a href="/bookmarks">Lihat berita tersimpan</a>
    </aside>
  </div>
</main>

<footer>
  <p>© 2026 Tempe — Proyek Front End</p>
</footer>
```

`<div>` tetap dipakai sebagai pembungkus layout Grid/Flexbox. Tidak semua
pembungkus memerlukan `<section>`.

---

## 6. Rancangan Halaman Bookmarks

- `<main>` dengan `<h1>Berita Tersimpan</h1>`.
- Bila daftar kosong: tampilkan pesan dan tautan kembali ke beranda.
- Bila ada isi: gunakan grid kartu yang sama dengan beranda.
- Sediakan tombol hapus pada setiap kartu dan opsi "Hapus semua".
- Jumlah berita tersimpan ditampilkan sebagai keterangan singkat.

---

## 7. Rencana Pengujian

- [ ] `npm run dev` berjalan tanpa error.
- [ ] `npm run build` berhasil.
- [ ] `npm run lint` bersih.
- [ ] Navigasi `/` dan `/bookmarks` berfungsi, termasuk refresh langsung di `/bookmarks`.
- [ ] Tema bertahan setelah refresh.
- [ ] Bookmark muncul di halaman `/bookmarks` dan bertahan setelah refresh.
- [ ] Pencarian dan filter kategori mengubah daftar berita.
- [ ] Tanpa API key, data cadangan tampil dengan label yang jelas.
- [ ] Tampilan diperiksa pada lebar 360px, 768px, dan 1280px.
- [ ] Struktur heading berurutan (satu `<h1>` per halaman).
- [ ] Tombol dapat diakses dengan keyboard.

---

## 8. Persiapan Push ke GitHub

1. Pastikan `.env.local` tidak ter-commit dan `.env.example` tersedia.
2. Isi `README.md`: deskripsi proyek, fitur, cara instalasi, cara menjalankan,
   variabel lingkungan, dan tangkapan layar.
3. Jalankan `npm run lint` dan `npm run build` sebelum commit terakhir.
4. Perintah Git:

```powershell
git status
git add .
git commit -m "feat: portal berita internasional dengan routing, dark mode, dan bookmark"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

5. Bila ingin menampilkan demo online, publikasikan `dist` ke layanan hosting statis
   dan atur *rewrite* semua rute ke `index.html` agar `/bookmarks` tidak menghasilkan 404.

---

## 9. Urutan Pengerjaan yang Disarankan

1. Isi `mockNews.js` sebagai sumber data awal.
2. Buat `ThemeContext` dan `BookmarkContext`.
3. Isi komponen layout, lalu pasang di `App.jsx` dengan routing.
4. Isi `Home.jsx` dengan data cadangan terlebih dahulu.
5. Tambahkan `newsApi.js`, lalu sambungkan ke `Home.jsx`.
6. Isi `Bookmarks.jsx`.
7. Tulis CSS global dan responsif.
8. Uji, lengkapi `README.md`, lalu push ke GitHub.
