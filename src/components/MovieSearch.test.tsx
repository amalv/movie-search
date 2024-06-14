import { render, screen } from "@testing-library/react";
import { SearchMovies } from "./MovieSearch";
import { useSearchMovies } from "./useSearchMovies";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("./useSearchMovies");

describe("MovieSearch", () => {
	it("renders movies returned by useSearchMovies", () => {
		(useSearchMovies as jest.Mock).mockReturnValue({
			movies: [
				{ id: 1, poster_path: "/path1.jpg", title: "Movie 1" },
				{ id: 2, poster_path: "/path2.jpg", title: "Movie 2" },
			],
			searchMovies: vi.fn(),
		});

		render(<SearchMovies />);

		expect(screen.getByText("Movie 1")).toBeVisible();
		expect(screen.getByText("Movie 2")).toBeVisible();
	});

	it("calls searchMovies with the entered query when the form is submitted", async () => {
		const user = userEvent.setup();
		const searchMoviesMock = vi.fn();
		(useSearchMovies as jest.Mock).mockReturnValue({
			movies: [],
			searchMovies: searchMoviesMock,
		});
		render(<SearchMovies />);

		await user.type(screen.getByLabelText("Movie Name"), "Jurassic Park");
		await user.click(screen.getByText("Search"));

		expect(searchMoviesMock).toHaveBeenCalledWith("Jurassic Park");
	});
});
