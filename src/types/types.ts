export type Genre = {
    id: number;
    name: string;
}
export type Movie = {
    id: number;
    title: string;
    tagline: string;
    release_date: string;
    poster_path: string;
    overview: string;
    genres: Genre[];
    vote_average: number;
    vote_count: number;
  };

  export type MovieDetailProps = {
    movie: Movie;
    onReturn: () => void;
  };

  export type MovieListProps = {
    peliculas: Movie[];
    onSelectMovie: (movieId: number) => void;
  };