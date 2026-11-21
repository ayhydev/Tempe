import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";

import { useState } from "react";

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookmarks = (news) => {
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.url === news.url,
    );

    if (isBookmarked) {
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.url !== news.url),
      );
    } else {
      setBookmarks((prevBookmarks) => [...prevBookmarks, news]);
    }
  };

  return (
    <>
      <header>
        <p>Tempe</p>
        <Navbar />
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <Home bookmarks={bookmarks} onBookmarkClick={handleBookmarks} />
          }
        />
        <Route
          path="/bookmarks"
          element={
            <Bookmarks
              bookmarks={bookmarks}
              onBookmarkClick={handleBookmarks}
            />
          }
        />
      </Routes>

      <footer>
        <p>© 2026 Tempe</p>
      </footer>
    </>
  );
}

export default App;
