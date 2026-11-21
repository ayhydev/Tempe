import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";

function App() {
  return (
    <>
      <header>
        <p>Tempe</p>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>

      <footer>
        <p>© 2026 Tempe</p>
      </footer>
    </>
  );
}

export default App;
