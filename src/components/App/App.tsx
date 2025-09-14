import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import { useState } from "react";
import { fetchMovies } from '../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';



function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['movie'],   // ключ запиту
    queryFn: fetchMovies,  // функція запиту
});
  


  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <SearchBar onSubmit={fetchMovies} />
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
