import { useRef } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onOrderChange: (order: string) => void;
  onSortChange: (sort: string) => void;
}

export function Header({ onSearch, onOrderChange, onSortChange }: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  return (
    <header className="d-flex container flex-wrap justify-content-between align-items-center py-3 px-4 border-bottom bg-white sticky-top">
      <h1 className="fs-3 m-0 text-dark">Anime Jikan</h1>

      <select
        className="form-select"
        style={{ width: "150px" }}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value="members">Most Members</option>
        <option value="score">Highest Score</option>
        <option value="rank">Best Rank</option>
        <option value="popularity">Popularity</option>
      </select>

      <select
        className="form-select"
        style={{ width: "150px" }}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          name="q"
          ref={inputRef}
          className="form-control me-2"
          type="search"
          placeholder="Search anime..."
          aria-label="Search"
          defaultValue=""
          style={{ width: "300px" }}
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
