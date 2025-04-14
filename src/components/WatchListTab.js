export default function WatchListTab({
  toWatch,
  setWatched,
  setToWatch,
  setWhatToSee,
}) {
  if (toWatch.length === 0) {
    return <p>Your watch list is empty. Start adding some anime!</p>;
  }

  function moveToWatched(id) {
    const selectedAnime = toWatch.find((anime) => anime.mal_id === id);
    setWatched((watched) => [...watched, selectedAnime]);
    handleDeleteFromList(id);
    setWhatToSee("");
  }

  function handleDeleteFromList(id) {
    setToWatch(toWatch.filter((anime) => anime.mal_id !== id));
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
            <button onClick={() => moveToWatched(anime.mal_id)}>
              Add to Watched list
            </button>
            <button onClick={(id) => handleDeleteFromList(anime.mal_id)}>
              Delete from watchlist
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
