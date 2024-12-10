import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropTypes from "prop-types";
import { EstablishmentsTable } from "./EstablishmentsTable";

describe("EstablishmentsTable Component", () => {
  it("renders the table headers correctly", () => {
    render(<EstablishmentsTable establishments={[]} />);

    expect(screen.getByText("Business Name")).toBeInTheDocument();
    expect(screen.getByText("Rating Value")).toBeInTheDocument();
  });

  it("renders the table with establishments data", () => {
    const mockEstablishments = [
      { BusinessName: "Restaurant", RatingValue: "4.4" },
      { BusinessName: "Bistro", RatingValue: "3.2" },
    ] as { [key: string]: string }[];

    render(<EstablishmentsTable establishments={mockEstablishments} />);

    expect(screen.getByText("Restaurant")).toBeInTheDocument();
    expect(screen.getByText("4.4")).toBeInTheDocument();
    expect(screen.getByText("Bistro")).toBeInTheDocument();
    expect(screen.getByText("3.2")).toBeInTheDocument();
  });

  it("renders '' for missing data in establishments", () => {
    const mockEstablishments = [
      { BusinessName: "Cafe", RatingValue: "" },
      { BusinessName: "", RatingValue: "4.0" },
      { BusinessName: "", RatingValue: "" },
    ] as { [key: string]: string }[];

    render(<EstablishmentsTable establishments={mockEstablishments} />);

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Cafe");
    expect(rows[2]).toHaveTextContent("4.0");
  });

  it("renders nothing when establishments is null or undefined", () => {
    const { container } = render(<EstablishmentsTable establishments={null} />);
    expect(container.querySelector("tr:nth-child(2)")).not.toBeInTheDocument();
  });

  it("renders no rows if establishments is an empty array", () => {
    render(<EstablishmentsTable establishments={[]} />);
    expect(screen.queryAllByRole("row")).toHaveLength(1); // Only the header row exists
  });
});
