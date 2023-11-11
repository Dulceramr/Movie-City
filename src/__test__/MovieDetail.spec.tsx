import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MovieDetail } from "../components/MovieDetail/MovieDetail";

describe("MovieDetail component", () => {
  const SampleMovie = {
    id: 1,
    title: "Sample Movie",
    tagline: "example tagline",
    poster_path: "/sample-poster.jpg",
    release_date: "2023-01-01",
    genres: [{ id: 1, name: "Action" }],
    vote_average: 7.5,
    vote_count: 100,
    overview: "This is a sample movie overview",
  };

  it("Renders the movie title", () => {
    const { getByText } = render(
      <MovieDetail movie={SampleMovie} onReturn={() => {}} />
    );
    expect(getByText("Sample Movie")).toBeInTheDocument();
  });

  it("Renders the movie tagline", () => {
    const { getByText } = render(
      <MovieDetail movie={SampleMovie} onReturn={() => {}} />
    );
    expect(getByText("example tagline")).toBeInTheDocument();
  });

  it("Renders the release date", () => {
    const { getByText } = render(
      <MovieDetail movie={SampleMovie} onReturn={() => {}} />
    );
    expect(getByText("Release Date: 2023-01-01")).toBeInTheDocument();
  });

  it("Renders the movie genres", () => {
    const { getByText } = render(
      <MovieDetail movie={SampleMovie} onReturn={() => {}} />
    );
    expect(getByText("Genres: Action")).toBeInTheDocument();
  });

  it("Renders the vote average", () => {
    const { getByText } = render(
      <MovieDetail movie={SampleMovie} onReturn={() => {}} />
    );
    expect(getByText("Average rating: 7.5 (100 votes)")).toBeInTheDocument();
  });

  it("Renders the movie overview", () => {
    const { getByText } = render(
      <MovieDetail movie={SampleMovie} onReturn={() => {}} />
    );
    expect(getByText("This is a sample movie overview")).toBeInTheDocument();
  });

  it("Renders the movie poster when movie_path exists", () => {
    const { getByAltText } = render(
      <MovieDetail movie={SampleMovie} onReturn={() => {}} />
    );
    const moviePoster = getByAltText(SampleMovie.title);
    expect(moviePoster.getAttribute("src")).toContain(
      `https://image.tmdb.org/t/p/w200/${SampleMovie.poster_path}`
    );
  });

  it("Renders the default movie poster when poster path is not available", () => {
    const movieWithoutPoster = {
      id: 2,
      title: "Sample Movie 2",
      tagline: "example tagline 2",
      poster_path: "",
      release_date: "2023-01-02",
      genres: [{ id: 1, name: "Action" }],
      vote_average: 7.5,
      vote_count: 100,
      overview: "This is a sample movie overview 2",
    };
    const { getByAltText } = render(
      <MovieDetail movie={movieWithoutPoster} onReturn={() => {}} />
    );
    const defaultMoviePoster = getByAltText("Default movie poster");
    expect(defaultMoviePoster).toBeInTheDocument();
    expect(defaultMoviePoster.getAttribute("src")).toContain(
      "/gato-jugando.png"
    );
    //const { getByText } = render(<MovieDetail movie={movieWithoutPoster} onReturn={() => {}} />);
    //expect(getByText("No Image Available")).toBeInTheDocument();
  });
});
