// fetchAllAnime.js
const fs = require("fs");

const BASE_URL = "https://api.jikan.moe/v4/anime";
const DELAY = 400; // ms between requests (Jikan allows ~3/sec)
const MAX_PAGES = 1540; // or however many you want

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAllAnime = async () => {
  let allAnime = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const response = await fetch(`${BASE_URL}?page=${page}`);
      const data = await response.json();

      if (!data.data || data.data.length === 0) break;

      allAnime.push(...data.data);

      console.log(`✅ Page ${page} fetched. Total so far: ${allAnime.length}`);

      // Stop if there's no next page
      if (!data.pagination.has_next_page) break;

      await sleep(DELAY);
    } catch (err) {
      console.error(`❌ Error on page ${page}:`, err.message);
      await sleep(1000); // Wait longer on error
    }
  }

  console.log(`🎉 Done. Saving ${allAnime.length} anime to anime.json...`);
  fs.writeFileSync("anime.json", JSON.stringify(allAnime, null, 2));
};

fetchAllAnime();
