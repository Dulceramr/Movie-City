import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./SearchMovie.css";
import { SearchMovieProps } from "../../types/types";

const SearchMovie: React.FC<SearchMovieProps> = ({ setPeliculas, setTotalPages, currentPage, setCurrentPage, setSearchTerm, setResults, searchTerm }) => {
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const API_KEY = '03d8479e6ac8e870c3ef0fea7b1b15c3';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    setCurrentPage(1); 
};

  useEffect(() => {
    if (searchTerm) {
      const fetchMoviesBySearch = async () => {
        try {
          const response = await fetch(`${BASE_URL}?query=${searchTerm}&api_key=${API_KEY}&page=${currentPage}`);
          const data = await response.json();
          setPeliculas(data.results);
          setTotalPages(data.total_pages);
          setResults(data.results); 
        } catch (error) {
          console.error("Error fetching movies by search:", error);
        }
      };
      fetchMoviesBySearch();
    }
  }, [searchTerm, currentPage, setResults]);

  return (
    <div className="search-container">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchMovie;