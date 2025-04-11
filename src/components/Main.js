import AnimeSearchResultList from "./AnimeSearchResultList";
import Loader from "./Loader";
import MyList from "./MyList";

export default function Main({ animes, isLoading }) {
  return (
    <div className="main">
      <section className="box">
        {isLoading && <Loader />}
        {animes?.length === 0 && <h1>Search for anime</h1>}
        <AnimeSearchResultList animes={animes} />
      </section>
      <section className="box">
        <MyList />
      </section>
    </div>
  );
}
