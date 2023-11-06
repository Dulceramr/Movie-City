import React, { useState, useEffect } from 'react';
import "./SortBy.css"

type Movie = {
  id:number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
};

const SortBy: React.FC<{
  setPeliculas: React.Dispatch<React.SetStateAction<Movie[]>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number 
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}> = ({ setPeliculas, setTotalPages, currentPage, setCurrentPage }) => {
  const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
  const API_KEY = '03d8479e6ac8e870c3ef0fea7b1b15c3';

  const [sortByValue, setSortByValue] = useState<string>("popularity.desc");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    setSortByValue(sortBy);
    setCurrentPage(1); 
};

  useEffect(() => {
    const fetchSortedMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&sort_by=${sortByValue}&page=${currentPage}`);
        const data = await response.json();
        setPeliculas(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching sorted movies:", error);
      }
    };
    fetchSortedMovies();
  }, [sortByValue, currentPage]);

  return (
    <div>
      <label className="label-sort-by" htmlFor="sortBy">Sort by: </label>
      <select id="sortBy" className="button-sort-by" onChange={handleChange}>
        <option value="popularity.desc">Popularity Descending</option>
        <option value="original_title.asc">Title Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
      </select>
    </div>
  );
};

export default SortBy;