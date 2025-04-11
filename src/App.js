import { useEffect, useState } from "react";

export default function App() {
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    async function fetchAnime() {
      const response = await fetch(`https://kitsu.io/api/edge/anime`);
      const data = await response.json();
      setAnimes(data);
      console.log(data);
    }
    fetchAnime();
  }, []);

  return <></>;
}
