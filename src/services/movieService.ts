import axios from "axios";
import type { Movie } from "../types/movie";

export interface TmdbResponse {
  results: Movie[];
  total_pages: number;
  page: number;
  total_results: number;
}

const myKey = import.meta.env.VITE_MY_API;

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${myKey}`, // v4 token
  },
});

export const fetchMovies = async (query: string, page: number = 1): Promise<TmdbResponse> => {
  if (!query) {
    return { results: [], total_pages: 0, page: 1, total_results: 0 };
  }

  const { data } = await apiClient.get<TmdbResponse>("/search/movie", {
    params: { query, page },
  });

  return data;
};