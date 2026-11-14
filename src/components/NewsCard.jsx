function NewsCard({ title, description, url, imageUrl }) {
  return (
    <article className="news-card">
      <h4>Judul: {title}</h4>
      <p>Deskripsi: {description}</p>
    </article>
  );
}

export default NewsCard;
