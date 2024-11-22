import React from "react";

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  return (
    <nav className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        className="searchbar"
        placeholder="Enter city name"
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(); // Trigger submit on Enter key
        }}
      />
      <button onClick={onSearch} className="addcity" disabled={!searchQuery}>
        Add City
      </button>
    </nav>
  );
};

export default SearchBar;
