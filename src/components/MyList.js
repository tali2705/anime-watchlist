import { useState } from "react";
import WatchListTab from "./WatchListTab";
import WatchedTab from "./WatchedTab";
import AnimeDetails from "./AnimeDetails";

export default function MyList({
  selectedID,
  onCloseDetails,
  onAddToWatch,
  onAddWatched,
  toWatch,
  watched,
}) {
  const [whatToSee, setWhatToSee] = useState("");
  function handleToggleMyLists(tab) {
    setWhatToSee((prev) => (prev === tab ? "" : tab));
  }
  return (
    <>
      <div className="tabs">
        <button
          className={`tab ${whatToSee === "watchlist" ? "active" : ""}`}
          onClick={() => handleToggleMyLists("watchlist")}
        >
          Watch List
        </button>
        <button
          className={`tab ${whatToSee === "watched" ? "active" : ""}`}
          onClick={() => handleToggleMyLists("watched")}
        >
          Watched
        </button>
      </div>
      <div>
        {whatToSee === "watchlist" ? (
          <WatchListTab toWatch={toWatch} />
        ) : whatToSee === "watched" ? (
          <WatchedTab watched={watched} />
        ) : (
          <AnimeDetails
            selectedID={selectedID}
            onAddToWatch={onAddToWatch}
            onAddWatched={onAddWatched}
            onCloseDetails={onCloseDetails}
            toWatch={toWatch}
            watched={watched}
          />
        )}
      </div>
    </>
  );
}
