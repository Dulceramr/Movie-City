import { Movie } from "../../types/types";
import { useState, useEffect } from "react";
import "./Carousel.css";

export const Carousel: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchTrendingMovies =async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=03d8479e6ac8e870c3ef0fea7b1b15c3');
                const data = await response.json();
                console.log("Trending movies data:", data); 
                setMovies(data.results);
            } catch (error) {
                console.error("Error fetching trending movies", error);

            }
        };
        fetchTrendingMovies();
    }, []);

  return (
    <div className="carousel-container">
    <h2 className="carousel-title">Trending Movies</h2>
    <div className="carousel-items"> 
        {movies.map((movie) => (
        <div key={movie.id} className="carousel-item">
            <img 
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
            className="carousel-poster"
            />
            <p className="carousel-title">{movie.title}</p>
        </div>
        ))}
    </div>
    </div>
  );
};
