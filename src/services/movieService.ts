import axios from "axios";
import type { Movie } from "../types/movie";

interface TmdbResponse {
  results: Movie[];
  total_pages: number;
}

const myKey = import.meta.env.VITE_MY_API;

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${myKey}`, // v4 token
  },
});

export const fetchMovies = async (query: string) => {
  if (!query) return [];

  const { data } = await apiClient.get<TmdbResponse>("/search/movie", {
    params: { query },
  });

  return data.results;
};