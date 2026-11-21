function NewsCard({ title, description, url, imageUrl }) {
  return (
    <article className="news-card">
      <h3>Judul: {title}</h3>
      <p>Deskripsi: {description}</p>
    </article>
  );
}

export default NewsCard;
