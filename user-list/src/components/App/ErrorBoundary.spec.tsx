import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary"; // Path to your ErrorBoundary component

const ProblemChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary Component", () => {
  it("renders fallback UI when an error is thrown", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    // Check if the fallback UI is rendered
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Something went wrong, don't worry, it is not your fault:"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("renders children when no error occurs", () => {
    const { container } = render(
      <ErrorBoundary>
        <div>All is good!</div>
      </ErrorBoundary>
    );

    expect(container).toContainHTML("All is good!");
  });
});
