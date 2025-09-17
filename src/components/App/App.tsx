import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import MovieGrid from '../MovieGrid/MovieGrid';
import type { Movie } from '../../types/movie';
import { useState, useEffect } from "react";
import { fetchMovies} from '../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';
import { useQuery, keepPreviousData  } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ReactPaginate from 'react-paginate';
import type { TmdbResponse } from '../../services/movieService';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [curPage, setCurPage] = useState(1);

  const { data, isLoading, isError } = useQuery<TmdbResponse | null>({
    queryKey: ['movies', searchTerm, curPage],
    queryFn: () => fetchMovies(searchTerm, curPage),
    enabled: !!searchTerm,
    placeholderData: keepPreviousData,  // щоб не мигало між сторінками
  });

  useEffect(() => {
    if (isError) {
      toast.error("There was an error, please try again...");
    }
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isError, data]);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurPage(1); // скидаємо на першу сторінку при новому пошуку
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
  
      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurPage(selected + 1)}
          forcePage={curPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      <MovieGrid movies={data?.results ?? []} onSelect={handleSelectMovie} />

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