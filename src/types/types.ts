export type Genre = {
  id: number;
  name: string;
};
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

export type OrderByGenreProps = {
  setPeliculas: React.Dispatch<React.SetStateAction<Movie[]>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};