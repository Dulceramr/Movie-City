import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MovieList } from "../components/MovieList/MovieList";

describe("MovieList component", () => {
  const SampleMovies = [
    {
      id: 1,
      title: "Sample Movie 1",
      tagline: "example tagline 1",
      poster_path: "/sample-poster1.jpg",
      release_date: "2023-01-01",
      genres: [{ id: 1, name: "Action" }],
      vote_average: 7.5,
      vote_count: 100,
      overview: "This is a sample movie overview 1",
    },
    {
      id: 2,
      title: "Sample Movie 2",
      tagline: "example tagline 2",
      poster_path: "/sample-poster2.jpg",
      release_date: "2023-01-02",
      genres: [{ id: 1, name: "Action" }],
      vote_average: 8.5,
      vote_count: 200,
      overview: "This is a sample movie overview 2",
    },
    {
      id: 3,
      title: "Sample Movie 3",
      tagline: "example tagline 3",
      poster_path: "/sample-poster3.jpg",
      release_date: "2023-01-03",
      genres: [{ id: 1, name: "Action" }],
      vote_average: 9.5,
      vote_count: 300,
      overview: "This is a sample movie overview 3",
    },
  ];

  it("Renders movie titles and release date correctly", () => {
    const { getByText } = render(
      <MovieList peliculas={SampleMovies} onSelectMovie={() => {}} />
    );
    SampleMovies.forEach((movie) => {
      expect(getByText(movie.title)).toBeInTheDocument();
      expect(getByText(movie.release_date)).toBeInTheDocument();
    });
  });

  it("Renders movie posters when poster path is available", () => {
    const { getByAltText } = render(
      <MovieList peliculas={SampleMovies} onSelectMovie={() => {}} />
    );
    SampleMovies.forEach((movie) => {
      const moviePoster = getByAltText(movie.title);
      expect(moviePoster.getAttribute("src")).toContain(
        `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
      );
    });
  });

  it("Renders default movie image when poster path is not available", () => {
    const SampleMovieWithoutPoster = [
      {
        id: 4,
        title: "Sample Movie 4",
        tagline: "example tagline 4",
        poster_path: "",
        release_date: "2023-01-04",
        genres: [{ id: 1, name: "Action" }],
        vote_average: 4.5,
        vote_count: 10,
        overview:
          "This is a sample movie overview of a movie without poster path 4",
      },
    ];
    const { getByAltText } = render(
      <MovieList
        peliculas={SampleMovieWithoutPoster}
        onSelectMovie={() => {}}
      />
    );
    const defaultMoviePoster = getByAltText("Default movie poster");
    expect(defaultMoviePoster).toBeInTheDocument();
    expect(defaultMoviePoster.getAttribute("src")).toContain(
      "/imagen-palomitas.png"
    );
  });
});
