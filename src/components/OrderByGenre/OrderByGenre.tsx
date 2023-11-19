import React, { useEffect, useState } from 'react';
import "./OrderByGenre.css"
import { Genre, OrderByGenreProps } from "../../types/types";

export const OrderByGenre: React.FC<OrderByGenreProps> = ({ setPeliculas, setTotalPages, currentPage, setCurrentPage  }) => {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '03d8479e6ac8e870c3ef0fea7b1b15c3';

  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };

    fetchGenres();
  }, []);

  const handleByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    setCurrentPage(1); 
};

  useEffect(() => {
    if (selectedGenre) {
      const fetchMoviesByGenre = async () => {
        try {
          const response = await fetch(`${BASE_URL}/discover/movie?with_genres=${selectedGenre}&api_key=${API_KEY}&page=${currentPage}`);
          const data = await response.json();
          setPeliculas(data.results);
          setTotalPages(data.total_pages);
        } catch (error) {
          console.error("Error fetching movies by genre:", error);
        }
      };
      fetchMoviesByGenre();
    }
  }, [currentPage, selectedGenre]);

  return (
    <div className='container'>
      <label className="label-order-by-genre" htmlFor='orderByGenre'>Order by Genre </label>
      <select id='orderByGenre' className="button-order-by-genre" onChange={handleByChange}>
        {genres.map((genre: Genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};