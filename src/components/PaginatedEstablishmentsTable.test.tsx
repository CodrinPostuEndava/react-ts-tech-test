import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import { getEstablishmentRatings } from "../api/ratingsAPI";

jest.mock("../api/ratingsAPI", () => ({
  getEstablishmentRatings: jest.fn(),
}));

jest.mock("./EstablishmentsTableNavigation", () => ({
  EstablishmentsTableNavigation: ({
    onPreviousPage,
    onNextPage,
  }: {
    onPreviousPage: () => void;
    onNextPage: () => void;
  }) => (
    <div>
      <button onClick={onPreviousPage}>Previous</button>
      <button onClick={onNextPage}>Next</button>
    </div>
  ),
}));

describe("PaginatedEstablishmentsTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders establishments when API call is successful", async () => {
    const mockData = {
      establishments: [
        { BusinessName: "Cafe A", RatingValue: "4.5" },
        { BusinessName: "Cafe B", RatingValue: "3.8" },
      ],
    };

    (getEstablishmentRatings as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockData)
    );

    render(<PaginatedEstablishmentsTable />);

    await waitFor(() => screen.getByText("Cafe A"));

    expect(screen.getByText("Cafe A")).toBeInTheDocument();
    expect(screen.getByText("Cafe B")).toBeInTheDocument();
  });

  it("displays an error message when the API call fails", async () => {
    (getEstablishmentRatings as jest.Mock).mockImplementation(() =>
      Promise.reject({ message: "Failed to fetch establishments" })
    );

    render(<PaginatedEstablishmentsTable />);

    await waitFor(() =>
      screen.getByText("Error: Failed to fetch establishments")
    );

    expect(
      screen.getByText("Error: Failed to fetch establishments")
    ).toBeInTheDocument();
  });

  it("handles the previous page click", async () => {
    const mockData = {
      establishments: [
        { BusinessName: "Cafe A", RatingValue: "4.5" },
        { BusinessName: "Cafe B", RatingValue: "3.8" },
      ],
    };

    (getEstablishmentRatings as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockData)
    );

    render(<PaginatedEstablishmentsTable />);

    await waitFor(() => screen.getByText("Cafe A"));

    const previousButton = screen.getByText("Previous");

    await act(async () => {
      fireEvent.click(previousButton);
    });

    expect(getEstablishmentRatings).toHaveBeenCalledTimes(2);
  });

  it("handles the next page click", async () => {
    const mockData = {
      establishments: [
        { BusinessName: "Cafe A", RatingValue: "4.5" },
        { BusinessName: "Cafe B", RatingValue: "3.8" },
      ],
    };

    (getEstablishmentRatings as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockData)
    );

    render(<PaginatedEstablishmentsTable />);

    await waitFor(() => screen.getByText("Cafe A"));

    const nextButton = screen.getByText("Next");

    await act(async () => {
      fireEvent.click(nextButton);
    });

    expect(getEstablishmentRatings).toHaveBeenCalledTimes(2);
  });

  it("does not go to a previous page if already on the first page", async () => {
    const mockData = {
      establishments: [
        { BusinessName: "Cafe A", RatingValue: "4.5" },
        { BusinessName: "Cafe B", RatingValue: "3.8" },
      ],
    };

    (getEstablishmentRatings as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockData)
    );

    render(<PaginatedEstablishmentsTable />);

    await waitFor(() => screen.getByText("Cafe A"));

    const previousButton = screen.getByText("Previous");

    await act(async () => {
      fireEvent.click(previousButton);
    });

    expect(getEstablishmentRatings).toHaveBeenCalled();
  });
});
