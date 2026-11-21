function NewsCard({ title, description, url, imageUrl }) {
  return (
    <article>
      <h3>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h3>
      <p>{description}</p>
    </article>
  );
}

export default NewsCard;
