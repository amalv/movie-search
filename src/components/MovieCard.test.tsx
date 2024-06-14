import { render, screen } from "@testing-library/react";
import { MovieCard } from "./MovieCard";

describe("MovieCard", () => {
	it("renders movie details correctly", () => {
		const movie = {
			id: 1,
			poster_path: "/path1.jpg",
			title: "Movie 1",
			release_date: "2022-01-01",
			vote_average: 8.5,
			overview: "This is a great movie.",
		};

		render(<MovieCard movie={movie} />);

		expect(screen.getByText("Movie 1")).toBeVisible();
		expect(screen.getByText("RELEASE DATE: 2022-01-01")).toBeVisible();
		expect(screen.getByText("RATING: 8.5")).toBeVisible();
		expect(screen.getByText("This is a great movie.")).toBeVisible();
	});
});
