export default function WatchedTab({ watched, setWatched, setWhatToSee }) {
  if (watched.length === 0) {
    return <p>Your watched list is empty. Start adding some anime!</p>;
  }

  function handleDeleteFromWatchedList(id) {
    setWatched(watched.filter((anime) => anime.mal_id !== id));
    setWhatToSee("");
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
