import { useState } from "react";
import { MovieCard } from "./MovieCard";
import type { Movie } from "../types/movie";

export const SearchMovies = () => {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState<Movie[]>([]);

	const searchMovies = async (e) => {
		e.preventDefault();

		const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

		try {
			const res = await fetch(url);
			const data = await res.json();
			setMovies(data.results);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<form className="form" onSubmit={searchMovies}>
				<label className="label" htmlFor="query">
					Movie Name
				</label>
				<input
					className="input"
					type="text"
					name="query"
					placeholder="i.e. Jurassic Park"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="button" type="submit">
					Search
				</button>
			</form>
			<div className="card-list">
				{movies
					.filter((movie) => movie.poster_path)
					.map((movie) => (
						<MovieCard key={movie.id} movie={movie} /> // Use MovieCard component
					))}
			</div>
		</>
	);
};
