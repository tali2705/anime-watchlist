export default function WatchedTab({ watched, setWatched }) {
  if (watched.length === 0) {
    return (
      <h3 className="btns">
        Your watched list is empty. Start adding some anime!
      </h3>
    );
  }

  function handleDeleteFromWatchedList(id) {
    setWatched(watched.filter((anime) => anime.mal_id !== id));
  }
  return (
    <ul className="list list-watched">
      {watched.map((anime) => (
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
            <button onClick={() => handleDeleteFromWatchedList(anime.mal_id)}>
              Delete from list
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
