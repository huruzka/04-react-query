import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import { useState } from "react";
import { fetchMovies } from '../../services/movieService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

const handleSearch = async (query: string): Promise<void>=> {
    try {
    setError(false);
    setLoader(true);
    const results = await fetchMovies(query);
    if (results.length === 0) {
      toast.error("No movies found for your request.");
    }
      setMovies(results);
  } catch { 
      setError(true);
      toast.error("There was an error, please try again...")
  } finally {
    setLoader(false);
  }
};

  return (
    <div>
      {isLoader && <Loader />}
      {error && <ErrorMessage />}
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;
