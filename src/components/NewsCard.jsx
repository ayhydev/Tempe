function NewsCard({
  title,
  description,
  url,
  imageUrl,
  isBookmarked,
  onBookmarkClick,
}) {
  return (
    <article>
      <h3>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h3>
      <p>{description}</p>
      <img src={imageUrl} alt={title} />

      <button
        type="button"
        aria-pressed={isBookmarked}
        className="button bookmark"
        onClick={onBookmarkClick}
      >
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    </article>
  );
}

export default NewsCard;
