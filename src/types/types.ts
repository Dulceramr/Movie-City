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

export type CarouselProps = {
  onSelectMovie: (movieId: number) => void;
};

export type Genre = {
  id: number;
  name: string;
};

export type OrderByGenreProps = {
  setPeliculas: React.Dispatch<React.SetStateAction<Movie[]>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export type SortByProps = {
  setPeliculas: React.Dispatch<React.SetStateAction<Movie[]>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number, 
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setResults: React.Dispatch<React.SetStateAction<Movie[]>>
};

export type SearchMovieProps = {
  setPeliculas: React.Dispatch<React.SetStateAction<Movie[]>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number, 
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  setResults: React.Dispatch<React.SetStateAction<Movie[]>>,
  searchTerm: string
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type MovieListProps = {
  peliculas: Movie[];
  onSelectMovie: (movieId: number) => void;
};

export type MovieDetailProps = {
  movie: Movie;
  onReturn: () => void;
};