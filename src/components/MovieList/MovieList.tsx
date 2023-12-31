import React from "react";
import "./MovieList.css";
import { Movie, MovieListProps } from "../../types/types";

export const MovieList: React.FC<MovieListProps> = ({ peliculas, onSelectMovie }) => {
  const dividedArray = (array: Movie[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const formatDate = (dateString: string) => {
    const options:Intl.DateTimeFormatOptions = {month: "long", year: "numeric"};
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate; 
  }

  const movieRows = dividedArray(peliculas, 5);
  const defaultImage = "/imagen-palomitas.png";

  return (
    <table className="movie-table">
      <tbody className="movie-container">
        {movieRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((movie) => (
              <td key={movie.id}>
                <div className="movie-item" onClick={() => onSelectMovie(movie.id)}>
                  <span className={`vote-badge ${movie.vote_average > 6? "blue-badge" : "red-badge"}`}> {movie.vote_average.toFixed(1)} </span>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt={movie.title}
                      className="poster"
                    />
                  ) : (
                    <>
                      <img
                        src={defaultImage}
                        alt="Default movie poster"
                        className="poster-default"
                      />
                      <div className="no-image-text">No Image Available</div>
                    </>
                  )}
                  <h4 className="title">{movie.title}</h4>
                  <p className="date">{formatDate(movie.release_date)}</p>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};