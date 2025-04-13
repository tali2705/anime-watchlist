import AnimeListItem from "./AnimeListItem";

export default function AnimeSearchResultList({ animes, onOpenDetails }) {
  const deduplicatedAnimes = Array.from(
    new Map(animes?.map((anime) => [anime.mal_id, anime])).values()
  );

  return (
    <ul className="list list-movies">
      {deduplicatedAnimes?.map((anime) => {
        return (
          <AnimeListItem
            key={anime.mal_id}
            anime={anime}
            onOpenDetails={onOpenDetails}
          />
        );
      })}
    </ul>
  );
}
