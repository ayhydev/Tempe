import NewsGrid from "../components/NewsGrid.jsx";
import MockNewsData from "../data/mockNews.js";
import { useState } from "react";

function Home() {
  const [pencarian, setPencarian] = useState("");
  const hasilBerita = MockNewsData.filter((berita) =>
    berita.title.toLowerCase().includes(pencarian.toLowerCase()),
  );

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

        <NewsGrid articles={hasilBerita} />

        {hasilBerita.length === 0 && <p>Berita tidak ditemukan.</p>}
      </section>
    </main>
  );
}

export default Home;
