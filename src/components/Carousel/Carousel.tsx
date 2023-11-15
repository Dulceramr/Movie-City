import { Movie } from "../../types/types";
import { useState, useEffect, useRef } from "react";
import "./Carousel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Carousel: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleLeftArrowClick = () => {
        console.log("se hizo click en la izquierda");
        if (containerRef.current) {
            const scrollAmount = 400;
            containerRef.current.scrollLeft -= scrollAmount;
            setScrollLeft(containerRef.current.scrollLeft);
        }
    };
    
    const handleRightArrowClick = () => {
        console.log("se hizo click en la derecha");
        if (containerRef.current) {
            const scrollAmount = 400;
            containerRef.current.scrollLeft += scrollAmount;
            setScrollLeft(containerRef.current.scrollLeft);
        }
    };
    

    useEffect(() => {
        console.log('containerRef.current:', containerRef.current);

        const fetchTrendingMovies =async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=03d8479e6ac8e870c3ef0fea7b1b15c3');
                const data = await response.json();
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
    <div className="carousel-navigation">
        <button className="carousel-arrow left-arrow" onClick={handleLeftArrowClick}>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
        </button>
    <div className="carousel-items" ref={containerRef} style={{ left: `-${scrollLeft}px` }}> 
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
    <button className="carousel-arrow right-arrow" onClick={handleRightArrowClick}>
    <FontAwesomeIcon className="icon" icon={faArrowRight} />
    </button>
    </div>
    </div>
  );
};
