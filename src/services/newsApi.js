import mockNews from "../data/mockNews.js";

async function getNews(category) {
  const apiKey = import.meta.env.VITE_NEWS_API;
  try {
    if (!apiKey)
      throw new Error(
        "API key tidak ditemukan. Tolong set kuncinya di .env VITE_NEWS_API.",
      );

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    if (category && category !== "semua") {
      url += `&category=${category}`;
    }

    const response = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    const data = await response.json();

    console.log("Hasil API:", {
      status: data.status,
      jumlah: data.articles?.length,
      pesan: data.message,
    });

    if (!response.ok || data.status !== "ok") {
      throw new Error(`Gagal mengambil berita: ${data.message}`);
    }

    const articles = data.articles
      .filter((article) => article.url && article.title)
      .map((article) => ({
        title: article.title,
        description: article.description || "Deskripsi tidak tersedia.",
        url: article.url,
        imageUrl: article.urlToImage || "https://via.placeholder.com/150",
      }));

    return { articles, isFetchSuccess: true };
  } catch {
    const articles = mockNews.filter(
      (article) => category === "semua" || article.category === category,
    );
    return { articles, isFetchSuccess: false };
  }
}

export default getNews;
