import { useState, useEffect } from 'react';
import './App.css';
import { MovieList } from './components/MovieList/MovieList';
import { MovieDetail } from './components/MovieDetail/MovieDetail'; 
import { OrderByGenre } from './components/OrderByGenre/OrderByGenre';
import SearchMovie from './components/SearchMovie/SearchMovie';
import SortBy from './components/SortBy/SortBy';
import Pagination from './components/Pagination/Pagination';  
import { Movie } from './types/types'
import { Carousel } from './components/Carousel/Carousel';

function App() {
  const [peliculas, setPeliculas] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const API_KEY = '03d8479e6ac8e870c3ef0fea7b1b15c3';

  useEffect(() => {
    if (selectedMovieId) {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovieId}?api_key=${API_KEY}`);
          const movieDetails = await response.json();
          setSelectedMovie(movieDetails);
        } catch (error) {
          console.error("Error obteniendo detalles de la película:", error);
        }
      };
      fetchMovieDetails();
    }
  }, [selectedMovieId]);
  
  const handleChange = () => {
    window.scroll(0, 0);
  }

  return (
    <>
      {selectedMovie ? (
        <MovieDetail movie={selectedMovie} onReturn={() => setSelectedMovie(null)} />
      ) : (
        <>
          <header 
          onClick={() => handleChange()}
          className='main-title'>🎥 Movie City</header>
          <Carousel onSelectMovie={setSelectedMovieId} />
          <div className='select-container'>
            <OrderByGenre setPeliculas={setPeliculas} setTotalPages={setTotalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <SortBy 
            setPeliculas={setPeliculas} 
            setTotalPages={setTotalPages} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            setResults={setPeliculas} 
            />
            <SearchMovie 
            setPeliculas={setPeliculas} 
            setTotalPages={setTotalPages} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            setResults={setPeliculas} 
            />
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          <MovieList 
          peliculas={peliculas} 
            onSelectMovie={(movieId) => {
              setSelectedMovieId(movieId);
          }} /> 
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </>
  );
}

export default App;