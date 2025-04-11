import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./css/index.css";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  const [animes, setAnimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Link Click");
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);

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
    setTimeout(() => {
      fetchGenres();
    }, 3000);
  }, []);

  useEffect(() => {
    async function fetchAnime() {
      if (!searchQuery) return;
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchQuery}`
        );
        const data = await response.json();
        setAnimes(data.data);
        console.log(data.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnime();
  }, [searchQuery]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} genres={genres} />
      <Main animes={animes} />
      <Footer />
    </>
  );
}
