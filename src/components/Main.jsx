import { useEffect, useState } from "react";
import ListButtons from "./ListButtons";

import Loader from "./Loader";
import AnimeSearchResultList from "./AnimeSearchResultList";
import Box from "./Box";
import WatchListTab from "./WatchListTab";
import WatchedTab from "./WatchedTab";
import AnimeDetails from "./AnimeDetails";

export default function Main({ isLoading, error, animes }) {
  const [selectedID, setSelectedID] = useState(null);
  const [whatToSee, setWhatToSee] = useState("");
  const [toWatch, setToWatch] = useState(function () {
    const toWatchStoredValue = localStorage.getItem("toWatch");
    return JSON.parse(toWatchStoredValue) ?? [];
  });
  const [watched, setWatched] = useState(function () {
    const watchedStoredValue = localStorage.getItem("watched");
    return JSON.parse(watchedStoredValue) ?? [];
  });

  function handleToggleDetails(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
    setWhatToSee("");
  }
  function handleAddWatched(newAnime) {
    setWatched((watched) => [...watched, newAnime]);
  }

  function handleAddToWatch(newAnime) {
    setToWatch((toWatch) => [...toWatch, newAnime]);
  }

  function handleCloseDetails() {
    setSelectedID(null);
  }
  function handleToggleMyLists(tab) {
    setWhatToSee((prev) => (prev === tab ? "" : tab));
  }

  useEffect(() => {
    localStorage.setItem("toWatch", JSON.stringify(toWatch));
  }, [toWatch]);
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <div className="main">
      <Box>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <AnimeSearchResultList
            onToggleDetails={handleToggleDetails}
            animes={animes}
          />
        )}
        {error && "Something went wrong"}
      </Box>
      <Box>
        <ListButtons
          whatToSee={whatToSee}
          onToggleMyLists={handleToggleMyLists}
        />
        {whatToSee === "watchlist" ? (
          <WatchListTab
            toWatch={toWatch}
            setWatched={setWatched}
            setToWatch={setToWatch}
          />
        ) : whatToSee === "watched" ? (
          <WatchedTab watched={watched} setWatched={setWatched} />
        ) : selectedID !== null ? (
          <AnimeDetails
            selectedID={selectedID}
            onAddToWatch={handleAddToWatch}
            onAddWatched={handleAddWatched}
            onCloseDetails={handleCloseDetails}
            toWatch={toWatch}
            watched={watched}
            setWhatToSee={setWhatToSee}
          />
        ) : (
          <h3 className="btns">
            Search and select anime you want to see the details of
          </h3>
        )}
      </Box>
    </div>
  );
}
