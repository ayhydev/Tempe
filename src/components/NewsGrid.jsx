import NewsCard from "./NewsCard.jsx";

export default function NewsGrid({ articles, bookmarks, onBookmarkClick }) {
  return (
    <div className="news-grid">
      {articles.map((article) => (
        <NewsCard
          key={article.url}
          title={article.title}
          description={article.description}
          url={article.url}
          imageUrl={article.imageUrl}
          isBookmarked={bookmarks.some(
            (bookmark) => bookmark.url === article.url,
          )}
          onBookmarkClick={() => onBookmarkClick(article)}
        />
      ))}
    </div>
  );
}
