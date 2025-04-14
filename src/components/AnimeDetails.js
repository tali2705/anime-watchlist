import { useEffect, useState } from "react";

export default function AnimeDetails({
  selectedID,
  watched,
  toWatch,
  onAddToWatch,
  onAddWatched,
  onCloseDetails,
}) {
  const [animeDetails, setAnimeDetails] = useState({});

  const isInWatchedList = watched
    .map((anime) => anime.mal_id)
    .includes(selectedID);
  const isInWatchList = toWatch
    .map((anime) => anime.mal_id)
    .includes(selectedID);
  // console.log(isInWatchList);

  function AddWatched() {
    onAddWatched(newAnime);
    onCloseDetails();
  }

  function AddToWatch() {
    onAddToWatch(newAnime);
    onCloseDetails();
  }

  useEffect(() => {
    async function fetchAnimeDetails() {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${selectedID}`
        );
        const aniData = await response.json();
        setAnimeDetails(aniData.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchAnimeDetails();
  }, [selectedID]);

  if (!selectedID || !animeDetails || !animeDetails.images) return null;
  const {
    title,
    images: { jpg: { image_url: jpgImage } = {} } = {},
    year: releaseDate,
    title_english: engTitle,
    duration: epDuration,
    status,
    synopsis: summary,
    episodes: numOfEp,
  } = animeDetails;

  const newAnime = {
    mal_id: selectedID,
    title,
    jpgImage,
    engTitle,
    status,
    releaseDate,
  };
  //for adding to wishlist

  return (
    <div className="details">
      <header>
        <img src={jpgImage} alt={title} />
        <div className="details-overview">
          <h2>{engTitle !== null ? engTitle : title}</h2>
          <p>
            Release date: {releaseDate} &bull; {numOfEp} episodes
          </p>
          <p>{epDuration}</p>
          <p>Status: {status}</p>
        </div>
      </header>
      <div className="btns">
        {!isInWatchList && !isInWatchedList ? (
          <>
            <button className="btn-add" onClick={AddToWatch}>
              Add to Watch List
            </button>
            <button className="btn-add" onClick={AddWatched}>
              Add to Watched
            </button>
          </>
        ) : (
          <p>You already have this anime on your list</p>
        )}
      </div>
      <section>
        Summary:
        <p>
          <em>{summary}</em>
        </p>
      </section>
    </div>
  );
}
