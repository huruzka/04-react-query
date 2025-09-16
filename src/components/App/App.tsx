import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import { useState } from "react";
import { fetchMovies } from '../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';
import { useQuery } from '@tanstack/react-query';
import Toaster from "react-hot-toast";
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const {data, isLoading, isError} = useQuery({
    queryKey: ['movies', searchTerm],
    queryFn: () => fetchMovies(searchTerm),
    enabled: !!searchTerm,
  });
 
  //useEffect(() => {
    //    if (isError) {
       //     toast.error("There was an error, please try again...");
        //}
        // Було: data.movies.length === 0
       // if (data && data.results.length === 0) {
         //   toast.error("No movies found for your request.");
       // }
 // }, [isError, data]);
  
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <div>
      <Toaster  />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}
      <MovieGrid movies={data ?? []} onSelect={handleSelectMovie} />
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