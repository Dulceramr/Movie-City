//import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";
import { MovieDetail } from '../components/MovieDetail/MovieDetail'

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

  it("renders the movie title", () => {
    const { getByText } = render(<MovieDetail movie={SampleMovie} onReturn={() => {}} />);
    expect(getByText("Sample Movie")).toBeInTheDocument();
  });

});
