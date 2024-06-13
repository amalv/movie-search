import { useState } from "react";
import type { Movie } from "../types/movie";
export const useSearchMovies = () => {
	const [movies, setMovies] = useState<Movie[]>([]);

	const searchMovies = async (query: string) => {
		const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

		try {
			const res = await fetch(url);
			const data = await res.json();
			setMovies(data.results);
		} catch (err) {
			console.error(err);
		}
	};

	return { movies, searchMovies };
};
