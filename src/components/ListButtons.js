export default function ListButtons({ whatToSee, onToggleMyLists }) {
  return (
    <div className="tabs">
      <button
        className={`tab ${whatToSee === "watchlist" ? "active" : ""}`}
        onClick={() => onToggleMyLists("watchlist")}
      >
        Watch List
      </button>
      <button
        className={`tab ${whatToSee === "watched" ? "active" : ""}`}
        onClick={() => onToggleMyLists("watched")}
      >
        Watched
      </button>
    </div>
  );
}
