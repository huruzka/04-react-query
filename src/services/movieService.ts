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
        Authorization: `Bearer ${myKey}`,
    },
});


export const fetchMovies = async () => {
    const { data } = await apiClient.get<TmdbResponse>("/search/movie");
    return data.results, data.total_pages;
};