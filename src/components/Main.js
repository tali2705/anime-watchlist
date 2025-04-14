import { useState } from "react";
import ListButtons from "./ListButtons";

import Loader from "./Loader";
import AnimeSearchResultList from "./AnimeSearchResultList";
import Box from "./Box";
import WatchListTab from "./WatchListTab";
import WatchedTab from "./WatchedTab";
import AnimeDetails from "./AnimeDetails";

export default function Main({ isLoading, error, animes }) {
  const [selectedID, setSelectedID] = useState(null);
  const [toWatch, setToWatch] = useState([]);
  const [watched, setWatched] = useState([]);
  const [whatToSee, setWhatToSee] = useState("");

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

  return (
    <div className="main">
      <Box>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <AnimeSearchResultList
            onOpenDetails={handleToggleDetails}
            animes={animes}
          />
        )}
        {error && "Something went wrong"}
      </Box>

      <Box>
        <ListButtons
          setWhatToSee={setWhatToSee}
          whatToSee={whatToSee}
          onToggleMyLists={handleToggleMyLists}
        />
        {whatToSee === "watchlist" ? (
          <WatchListTab
            toWatch={toWatch}
            setWatched={setWatched}
            setToWatch={setToWatch}
            setWhatToSee={setWhatToSee}
          />
        ) : whatToSee === "watched" ? (
          <WatchedTab
            watched={watched}
            setWatched={setWatched}
            setWhatToSee={setWhatToSee}
          />
        ) : (
          <AnimeDetails
            selectedID={selectedID}
            onAddToWatch={handleAddToWatch}
            onAddWatched={handleAddWatched}
            onCloseDetails={handleCloseDetails}
            toWatch={toWatch}
            watched={watched}
            setWhatToSee={setWhatToSee}
          />
        )}
      </Box>
    </div>
  );
}
