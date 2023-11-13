import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { OrderByGenre } from "../components/OrderByGenre/OrderByGenre"

describe("OrderByGenre component", () => {
    const mockGenres = [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 27, name: "Horror" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" }
      ];

      const MockProps = {
        setPeliculas: jest.fn(),
        setTotalPages: jest.fn(),
        currentPage: 1,
        setCurrentPage: jest.fn(),
      };

      beforeAll(() => {
        global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve({ genres: mockGenres }),
        }) as Promise<Response>
        );
      });

      it("Renders a select with genres options", async () => {
        await act(async () => {
            render(
                <OrderByGenre {...MockProps} />
            );
        });
        await screen.getByLabelText(/Order by Genre/i);
        const selectElement = screen.getByLabelText(/Order by Genre/i);
        expect(selectElement).toBeInTheDocument();
        mockGenres.forEach((genre) => {
            expect(screen.getByText(genre.name)).toBeInTheDocument();
        });
      });
})


  

  