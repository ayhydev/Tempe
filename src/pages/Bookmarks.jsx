import NewsGrid from "../components/NewsGrid.jsx";

export default function Bookmarks({ bookmarks, onBookmarkClick }) {
  return (
    <main>
      <h1>Berita Tersimpan</h1>

      {bookmarks.length === 0 ? (
        <p>Belum ada berita yang disimpan.</p>
      ) : (
        <NewsGrid
          articles={bookmarks}
          bookmarks={bookmarks}
          onBookmarkClick={onBookmarkClick}
        />
      )}
    </main>
  );
}
