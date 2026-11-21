import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Tentang Tempe</h2>
      <p>
        Portal berita dari berbagai sumber. Pilih kategori atau cari judul untuk
        menemukan berita.
      </p>
      <p>Berita dimuat melalui News API.</p>
      <Link to="/bookmarks">Lihat berita tersimpan</Link>
    </aside>
  );
}
