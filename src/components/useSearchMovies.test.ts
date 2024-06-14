import { renderHook, act } from "@testing-library/react";
import { useSearchMovies } from "./useSearchMovies";
import type { Movie } from "../types/movie";
import { vi } from "vitest";

describe("useSearchMovies hook", () => {
	const mockMovies: Movie[] = [
		{
			id: 1,
			poster_path: "/path1.jpg",
			title: "Movie 1",
			release_date: "2021-01-01",
			vote_average: 8.0,
			overview: "Overview 1",
		},
		{
			id: 2,
			poster_path: "/path2.jpg",
			title: "Movie 2",
			release_date: "2021-02-01",
			vote_average: 7.5,
			overview: "Overview 2",
		},
	];

	beforeEach(() => {
		global.fetch = vi.fn();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("fetches and updates movies when searchMovies is called", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () => Promise.resolve({ results: mockMovies }),
		});

		const { result } = renderHook(() => useSearchMovies());

		await act(async () => {
			await result.current.searchMovies("test");
		});

		expect(result.current.movies).toEqual(mockMovies);
	});

	it("handles fetch errors correctly", async () => {
		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(vi.fn());
		(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

		const { result } = renderHook(() => useSearchMovies());

		await act(async () => {
			await result.current.searchMovies("test");
		});

		expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Fetch error"));
		expect(result.current.movies).toEqual([]);
		consoleErrorSpy.mockRestore();
	});

	it("initial state of movies is an empty array", () => {
		const { result } = renderHook(() => useSearchMovies());

		expect(result.current.movies).toEqual([]);
	});
});
