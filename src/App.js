import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./css/index.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import AnimeSearchResultList from "./components/AnimeSearchResultList";
import MyList from "./components/MyList";
import Box from "./components/Box";
import Search from "./components/Search";
import Filter from "./components/Filter";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const [toWatch, setToWatch] = useState([]);
  const [watched, setWatched] = useState([]);

  function handleToggleDetails(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
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

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAnime() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchQuery}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Something went wrong with fetching data");
        }

        const data = await response.json();
        if (data.Response === "False") {
          throw new Error("No results.");
        }
        setAnimes(data.data);
        // console.log(data.data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log("Error in fetching animes:", err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => fetchAnime(), 500);
    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch("https://api.jikan.moe/v4/genres/anime");
        const data = await res.json();
        setGenres(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGenres();
  }, []);

  return (
    <>
      <Header>
        <Search setSearchQuery={setSearchQuery} />
        <Filter genres={genres} />
      </Header>
      <Main>
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
          <MyList
            selectedID={selectedID}
            animes={animes}
            watched={watched}
            toWatch={toWatch}
            onAddToWatch={handleAddToWatch}
            onAddWatched={handleAddWatched}
            onCloseDetails={handleCloseDetails}
          />
        </Box>
      </Main>
      <Footer />
    </>
  );
}
