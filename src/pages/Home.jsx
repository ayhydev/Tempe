import NewsGrid from "../components/NewsGrid.jsx";
import MockNewsData from "../data/mockNews.js";
import { useState } from "react";

function Home({ bookmarks, onBookmarkClick }) {
  const [kategori, setKategori] = useState("semua");

  const [pencarian, setPencarian] = useState("");

  const hasilBerita = MockNewsData.filter((berita) => {
    const cekJudul = berita.title
      .toLowerCase()
      .includes(pencarian.toLowerCase());

    const cekKategori = kategori === "semua" || berita.category === kategori;

    return cekJudul && cekKategori;
  });

  return (
    <main>
      <h1>Berita Terkini Saat Ini</h1>

      <section>
        <h2 id="news-title">Berita Terbaru</h2>
        <label htmlFor="search">Cari Berita:</label>
        <input
          type="text"
          id="search"
          placeholder="Masukkan kata kunci berita..."
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
        />

        <label htmlFor="kategori">Kategori berita</label>
        <select
          id="kategori"
          value={kategori}
          onChange={(event) => setKategori(event.target.value)}
        >
          <option value="semua">Semua</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <NewsGrid
          articles={hasilBerita}
          bookmarks={bookmarks}
          onBookmarkClick={onBookmarkClick}
        />

        {hasilBerita.length === 0 && <p>Berita tidak ditemukan.</p>}
      </section>
    </main>
  );
}

export default Home;
