export default function AnimeListItem({ anime, onToggleDetails }) {
  return (
    <li onClick={() => onToggleDetails(anime.mal_id)}>
      <img src={anime.images.jpg.image_url} alt={`${anime.title} poster`} />
      <h3>
        {anime?.title_english} ({anime.title})
      </h3>
      <div>
        <p>{anime.year !== null && <span>Release date: {anime.year}</span>}</p>
        <p>Status: {anime.status}</p>
      </div>
    </li>
  );
}
