import { useState, useCallback } from "react";
import { MovieCard } from "./MovieCard";
import { useSearchMovies } from "./useSearchMovies";

export const SearchMovies = () => {
	const [query, setQuery] = useState("");
	const { movies, searchMovies } = useSearchMovies();

	const onSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			searchMovies(query);
		},
		[query, searchMovies],
	);

	const handleQueryChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setQuery(e.target.value);
		},
		[],
	);

	return (
		<>
			<form className="form" onSubmit={onSubmit}>
				<label className="label" htmlFor="query">
					Movie Name
				</label>
				<input
					className="input"
					type="text"
					name="query"
					id="query"
					placeholder="i.e. Jurassic Park"
					value={query}
					onChange={handleQueryChange}
				/>
				<button className="button" type="submit">
					Search
				</button>
			</form>
			<div className="card-list">
				{movies
					.filter((movie) => movie.poster_path)
					.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
			</div>
		</>
	);
};
