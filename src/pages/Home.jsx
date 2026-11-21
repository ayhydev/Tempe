import NewsGrid from "../components/NewsGrid.jsx";
import getNews from "../services/newsApi.js";
import { useState, useEffect } from "react";

import Sidebar from "../components/layout/Sidebar.jsx";

function Home({ bookmarks, onBookmarkClick }) {
  const [kategori, setKategori] = useState("semua");

  const [pencarian, setPencarian] = useState("");

  const [berita, setBerita] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isFetchSuccess, setIsFetchSuccess] = useState(false);

  useEffect(() => {
    let aktif = true;

    async function muatBerita() {
      setLoading(true);

      const hasil = await getNews(kategori);

      if (aktif) {
        setBerita(hasil.articles);
        setIsFetchSuccess(hasil.isFetchSuccess);
        setLoading(false);
      }
    }

    muatBerita();

    return () => {
      aktif = false;
    };
  }, [kategori]);

  const hasilBerita = berita.filter((item) =>
    item.title.toLowerCase().includes(pencarian.toLowerCase()),
  );

  const headline = berita[0];

  return (
    <main>
      <h1>Berita Terkini Saat Ini</h1>

      <div className="headline-layout">
        <section aria-labelledby="headline-title">
          <h2 id="headline-title">Headline Utama</h2>

          {loading ? (
            <p>Memuat headline...</p>
          ) : headline ? (
            <article className="headline">
              {!isFetchSuccess && <p>Data demo</p>}

              {headline.imageUrl && (
                <img src={headline.imageUrl} alt={headline.title} />
              )}

              <h3>
                <a
                  href={headline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {headline.title}
                </a>
              </h3>

              <p>{headline.description}</p>
            </article>
          ) : (
            <p>Headline belum tersedia.</p>
          )}
        </section>

        <Sidebar />
      </div>

      <section aria-labelledby="news-title">
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

        {loading ? (
          <p>Memuat berita...</p>
        ) : (
          <>
            {!isFetchSuccess && <p>Data demo — API belum tersedia.</p>}

            <NewsGrid
              articles={hasilBerita}
              bookmarks={bookmarks}
              onBookmarkClick={onBookmarkClick}
            />

            {hasilBerita.length === 0 && <p>Berita tidak ditemukan.</p>}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;
