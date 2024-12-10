import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";

describe("EstablishmentsTableNavigation Component", () => {
  it("renders the navigation buttons and page number correctly", () => {
    render(
      <EstablishmentsTableNavigation
        pageNum={2}
        pageCount={5}
        onPreviousPage={jest.fn()}
        onNextPage={jest.fn()}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "+" })).toBeEnabled();
  });

  it("disables the previous button on the first page", () => {
    render(
      <EstablishmentsTableNavigation
        pageNum={1}
        pageCount={5}
        onPreviousPage={jest.fn()}
        onNextPage={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "+" })).toBeEnabled();
  });

  it("disables the next button on the last page", () => {
    render(
      <EstablishmentsTableNavigation
        pageNum={5}
        pageCount={5}
        onPreviousPage={jest.fn()}
        onNextPage={jest.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "-" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "+" })).toBeDisabled();
  });

  it("calls onPreviousPage when the previous button is clicked", () => {
    const mockOnPreviousPage = jest.fn();
    render(
      <EstablishmentsTableNavigation
        pageNum={2}
        pageCount={5}
        onPreviousPage={mockOnPreviousPage}
        onNextPage={jest.fn()}
      />
    );

    const previousButton = screen.getByRole("button", { name: "-" });
    fireEvent.click(previousButton);
    expect(mockOnPreviousPage).toHaveBeenCalledTimes(1);
  });

  it("calls onNextPage when the next button is clicked", () => {
    const mockOnNextPage = jest.fn();
    render(
      <EstablishmentsTableNavigation
        pageNum={2}
        pageCount={5}
        onPreviousPage={jest.fn()}
        onNextPage={mockOnNextPage}
      />
    );

    const nextButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(nextButton);
    expect(mockOnNextPage).toHaveBeenCalledTimes(1);
  });
});
