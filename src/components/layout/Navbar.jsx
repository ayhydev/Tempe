import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav aria-label="Navigasi utama">
      <NavLink to="/" end>
        Beranda
      </NavLink>
      {" | "}
      <NavLink to="/bookmarks">Berita Tersimpan</NavLink>
    </nav>
  );
}
