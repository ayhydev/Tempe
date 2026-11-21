import NewsGrid from "../components/NewsGrid.jsx";

export default function Bookmarks({ bookmarks, onBookmarkClick }) {
  return (
    <main>
      <h1>Berita Tersimpan</h1>

      <section aria-labelledby="saved-title">
        <h2 id="saved-title">Daftar Berita Tersimpan</h2>

        {bookmarks.length === 0 ? (
          <p>Belum ada berita yang disimpan.</p>
        ) : (
          <NewsGrid
            articles={bookmarks}
            bookmarks={bookmarks}
            onBookmarkClick={onBookmarkClick}
          />
        )}
      </section>
    </main>
  );
}
