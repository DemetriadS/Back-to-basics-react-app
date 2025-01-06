import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./FilterInputs"; // Import the Filters component
import { FilterProps } from "../../types"; // Import the types

// Mock data for filters prop
const mockFilters = {
  firstName: "John",
  lastName: "Doe",
  city: "",
  gender: "",
  age: "",
};

const mockOnFilterChange = jest.fn();

// Define the props that will be passed to the component
const mockFilterProps: FilterProps = {
  filters: mockFilters,
  onFilterChange: mockOnFilterChange,
};

describe("Filters Component", () => {
  it("renders filter inputs based on filter keys", () => {
    // Render the Filters component with mock props
    render(<Filters {...mockFilterProps} />);

    // Check if the input elements for "firstName" and "lastName" are rendered
    expect(
      screen.getByPlaceholderText("Filter by firstName")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Filter by lastName")
    ).toBeInTheDocument();

    // Check if the inputs have the correct initial values
    expect(screen.getByPlaceholderText("Filter by firstName")).toHaveValue(
      "John"
    );
    expect(screen.getByPlaceholderText("Filter by lastName")).toHaveValue(
      "Doe"
    );
  });

  it("calls the onFilterChange function when a filter input is changed", () => {
    render(<Filters {...mockFilterProps} />);

    fireEvent.change(screen.getByPlaceholderText("Filter by firstName"), {
      target: { value: "Jane", name: "firstName" },
    });

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  });
});
