import { useState } from "react";
import WatchListTab from "./WatchListTab";
import WatchedTab from "./WatchedTab";

export default function MyList() {
  const [whatToSee, setWhatToSee] = useState("");
  return (
    <>
      <div className="tabs">
        <button
          value="watchlist"
          className={`tab ${whatToSee === "watchlist" && "active"}`}
          onClick={(e) => setWhatToSee(e.target.value)}
        >
          Watch List
        </button>
        <button
          value="watched"
          className={`tab ${whatToSee === "watched" && "active"}`}
          onClick={(e) => setWhatToSee(e.target.value)}
        >
          Watched
        </button>
      </div>
      <div>
        {whatToSee === "watchlist" && <WatchListTab />}
        {whatToSee === "watched" && <WatchedTab />}
      </div>
    </>
  );
}
