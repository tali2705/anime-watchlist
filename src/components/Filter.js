export default function Filter({ genres }) {
  return (
    <>
      <select className="filter">
        {genres?.map((genre) => {
          return (
            <option key={genre.mal_id} value={genre.mal_id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
