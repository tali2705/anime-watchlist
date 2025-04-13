export default function WatchListTab({ toWatch }) {
  if (toWatch.length === 0) {
    return <p>Your watch list is empty. Start adding some anime!</p>;
  }
  return (
    <ul className="list list-watched">
      {toWatch.map((anime) => (
        <li key={anime.mal_id}>
          <img src={anime.jpgImage} alt={`${anime.title} poster`} />
          <h3>
            {anime.engTitle} ({anime.title})
          </h3>
          <div>
            <p>
              {anime.releaseDate !== null && (
                <span>Release date: {anime.releaseDate}</span>
              )}
            </p>
            <p>Status: {anime.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
