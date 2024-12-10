import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";

// Correctly mock the named export for PaginatedEstablishmentsTable
jest.mock("./PaginatedEstablishmentsTable", () => ({
  // Mock the component directly as a function that returns a div
  PaginatedEstablishmentsTable: () => <div data-testid="paginated-table" />,
}));

describe("HomePage Component", () => {
  it("renders the logo with the correct style", () => {
    render(<HomePage />);

    const header = screen.getByRole("banner");
    expect(header).toHaveStyle({
      width: "640px",
      height: "200px",
    });
  });

  it("renders the PaginatedEstablishmentsTable component", () => {
    render(<HomePage />);

    expect(screen.getByTestId("paginated-table")).toBeInTheDocument();
  });

  it("renders the logo and table in the correct structure", () => {
    const { container } = render(<HomePage />);

    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();

    const table = screen.getByTestId("paginated-table");
    expect(table).toBeInTheDocument();
  });
});
