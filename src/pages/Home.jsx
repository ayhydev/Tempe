import NewsCard from "../components/NewsCard.jsx";

function Home() {
  return (
    <main>
      <h1>Berita Terkini</h1>

      <section>
        <h2 id="news-title">Daftar Berita</h2>

        <NewsCard
          title="Contoh judul misalnya"
          description="Ini contoh deskripsi"
        />
      </section>
    </main>
  );
}

export default Home;
