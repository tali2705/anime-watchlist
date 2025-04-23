// import { useState } from "react";

// import { useEffect, useRef } from "react";

const Search = ({ setSearchQuery }) => {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search for anime..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
};
export default Search;
