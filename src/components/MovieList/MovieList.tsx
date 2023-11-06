import React from "react";
import "./MovieList.css";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
};

type MovieListProps = {
  peliculas: Movie[];
  onSelectMovie: (movieId: number) => void;
};

export const MovieList: React.FC<MovieListProps> = ({ peliculas, onSelectMovie }) => {
  const dividedArray = (array: Movie[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const movieRows = dividedArray(peliculas, 5);
  const defaultImage = "/imagen-palomitas.png";

  return (
    <table className="movie-table">
      <tbody>
        {movieRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((movie) => (
              <td key={movie.id}>
                <div className="movie-item" onClick={() => onSelectMovie(movie.id)}>
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
                  <p className="date">{movie.release_date}</p>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};