import NewsCard from "./NewsCard.jsx";

export default function NewsGrid({ articles }) {
  return (
    <div className="news-grid">
      {articles.map((article) => (
        <NewsCard
          key={article.url}
          title={article.title}
          description={article.description}
          url={article.url}
        />
      ))}
    </div>
  );
}
