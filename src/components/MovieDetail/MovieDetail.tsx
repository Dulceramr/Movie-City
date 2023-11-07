import React from "react";
import "./MovieDetail.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Genre, MovieDetailProps } from "../../types/types";

export const MovieDetail: React.FC<MovieDetailProps> = ({
  movie,
  onReturn,
}) => {
  const defaultImage = "/gato-jugando.png";
  return (
    <>
      <h2 className="movie-title">{movie.title}</h2>
      <h3 className="movie-tagline">{movie.tagline}</h3>
      <button className="detail-button" onClick={onReturn}>
      <FontAwesomeIcon className="icon" icon={faArrowLeft} style={{color: "#f1f4f9",}} />
      </button>
      <div className="Movie-detail-container">
      <section>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      ) : (
        <>
          <img
            src={defaultImage}
            alt="Default movie poster"
            className="movie-poster-no-image"
          />
          <div className="no-image-text">No Image Available</div>
        </>
      )}
    </section>
        <aside className="Movie-text">
          <p>Release Date: {movie.release_date}</p>
          <p>Genres: {movie.genres.map((genre: Genre) => genre.name).join(", ")}</p>
          <p>
            Average rating: {movie.vote_average} ({movie.vote_count} votes) 
          </p>
          <p>{movie.overview}</p>
        </aside>
      </div>
    </>
  );
};