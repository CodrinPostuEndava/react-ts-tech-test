import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";

describe("EstablishmentsTableRow Component", () => {
  it("renders the BusinessName and RatingValue when establishment is provided", () => {
    const mockEstablishment = {
      BusinessName: "Cafe",
      RatingValue: "4.4",
    };

    render(
      <table>
        <tbody>
          <EstablishmentsTableRow establishment={mockEstablishment} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Cafe")).toBeInTheDocument();
    expect(screen.getByText("4.4")).toBeInTheDocument();
  });

  it("renders empty cells when establishment is null", () => {
    render(
      <table>
        <tbody>
          <EstablishmentsTableRow establishment={null} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(2);
    expect(cells[0]).toBeEmptyDOMElement();
    expect(cells[1]).toBeEmptyDOMElement();
  });

  it("renders empty cells when establishment is undefined", () => {
    render(
      <table>
        <tbody>
          <EstablishmentsTableRow establishment={undefined} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(2);
    expect(cells[0]).toBeEmptyDOMElement();
    expect(cells[1]).toBeEmptyDOMElement();
  });

  it("renders empty cells for missing BusinessName or RatingValue", () => {
    const mockEstablishment = {
      BusinessName: "",
      RatingValue: "",
    };

    render(
      <table>
        <tbody>
          <EstablishmentsTableRow establishment={mockEstablishment} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(2);
    expect(cells[0]).toBeEmptyDOMElement();
    expect(cells[1]).toBeEmptyDOMElement();
  });
});
