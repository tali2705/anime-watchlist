import Filter from "./Filter";
import Search from "./Search";

export default function Header({ setSearchQuery, genres }) {
  return (
    <nav className="nav-bar">
      <Search setSearchQuery={setSearchQuery} />
      <Filter genres={genres} />
    </nav>
  );
}
