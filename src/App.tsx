import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import { MovieList } from './components/MovieList/MovieList';
import { MovieDetail } from './components/MovieDetail/MovieDetail'; 
import { OrderByGenre } from './components/OrderByGenre/OrderByGenre';
import SearchMovie from './components/SearchMovie/SearchMovie';
import SortBy from './components/SortBy/SortBy';
import Pagination from './components/Pagination/Pagination';  
import { Movie } from './types/types'
import { Navigator } from './components/Navigator/Navigator';

function App() {
  const [peliculas, setPeliculas] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

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
  

  return (
    <Router>
      <Routes>
        <Route path='/trending' element={<div>Componente para la pagina de tendencias</div>} />
        <Route path='/movies' element={
          <>
        <div className='select-container'>
          <OrderByGenre setPeliculas={setPeliculas} setTotalPages={setTotalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          <SortBy setPeliculas={setPeliculas} setTotalPages={setTotalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          <SearchMovie setPeliculas={setPeliculas} setTotalPages={setTotalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        <MovieList peliculas={peliculas} onSelectMovie={setSelectedMovieId} /> 
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
        } />
      <Route path='/series' element={<div>Componente para la pagina de series</div>} />
      </Routes>
      {selectedMovie ? (
        <Route 
        path={`/movies/${selectedMovieId}`} 
        element={<MovieDetail movie={selectedMovie} onReturn={() => setSelectedMovie(null)} />} 
        />
      ) : (
        <>
        <h1 className='main-title'>Movie City</h1>
          <div className='select-container'></div>
          <Navigator />
        </>
      )}
    </Router>
  );
}

export default App;
