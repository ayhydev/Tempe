import NewsGrid from "../components/NewsGrid.jsx";
import MockNewsData from "../data/mockNews.js";

function Home() {
  return (
    <main>
      <h1>Berita Terkini Saat Ini</h1>

      <section>
        <h2 id="news-title">Berita Terbaru</h2>

        <NewsGrid articles={MockNewsData} />
      </section>
    </main>
  );
}

export default Home;
