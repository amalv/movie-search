import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("./components", () => ({
	SearchMovies: () => <div>SearchMovies Component</div>,
}));

describe("App", () => {
	it("renders SearchMovies component", () => {
		render(<App />);
		const searchMoviesElement = screen.getByText("SearchMovies Component");
		expect(searchMoviesElement).toBeInTheDocument();
	});
});
