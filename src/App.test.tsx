import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("./components/HomePage", () => {
  return function DummyHomePage() {
    return <div data-testid="home-page">HomePage Component</div>;
  };
});

describe("App Component", () => {
  it("renders the HomePage component", () => {
    render(<App />);

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});
