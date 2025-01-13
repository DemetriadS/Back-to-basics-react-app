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
  it("renders all filter inputs including gender dropdown and age input", () => {
    // Render the Filters component with mock props
    render(<Filters {...mockFilterProps} />);

    // Check if text input elements for "firstName", "lastName", and "city" are rendered
    expect(
      screen.getByPlaceholderText("Filter by firstName")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Filter by lastName")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter by city")).toBeInTheDocument();

    // Check if the gender dropdown is rendered
    expect(screen.getByTestId("gender-label")).toBeInTheDocument();

    // Check if the age input is rendered
    expect(screen.getByPlaceholderText("Filter by age")).toBeInTheDocument();
  });

  it("sets correct initial values for filters", () => {
    render(<Filters {...mockFilterProps} />);

    // Verify initial values for text inputs
    expect(screen.getByPlaceholderText("Filter by firstName")).toHaveValue(
      "John"
    );
    expect(screen.getByPlaceholderText("Filter by lastName")).toHaveValue(
      "Doe"
    );
    expect(screen.getByPlaceholderText("Filter by city")).toHaveValue("");

    // Verify initial value for gender dropdown
    expect(screen.getByTestId("gender-select")).toHaveValue(""); // Gender dropdown defaults to an empty value

    // Verify initial value for age input
    expect(screen.getByPlaceholderText("Filter by age")).toHaveValue(null);
  });

  it("calls the onFilterChange function when a filter input is changed", () => {
    render(<Filters {...mockFilterProps} />);

    fireEvent.change(screen.getByPlaceholderText("Filter by firstName"), {
      target: { value: "Jane", name: "firstName" },
    });

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  });

  it("calls the onFilterChange function when the gender dropdown is changed", () => {
    render(<Filters {...mockFilterProps} />);

    // Simulate changing the gender dropdown
    fireEvent.change(screen.getByTestId("gender-select"), {
      target: { value: "male", name: "gender" },
    });

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  });

  it("allows only valid numeric values in the age input", () => {
    render(<Filters {...mockFilterProps} />);

    const ageInput = screen.getByPlaceholderText("Filter by age");

    // Simulate entering a valid age
    fireEvent.change(ageInput, { target: { value: "25", name: "age" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      target: { value: "25", name: "age" },
    });

    // Simulate entering an invalid age (non-numeric)
    fireEvent.change(ageInput, { target: { value: "abc", name: "age" } });
    expect(mockOnFilterChange).not.toHaveBeenCalledWith({
      target: { value: "abc", name: "age" },
    });

    // Simulate entering a negative age
    fireEvent.change(ageInput, { target: { value: "-10", name: "age" } });
    expect(mockOnFilterChange).not.toHaveBeenCalledWith({
      target: { value: "-10", name: "age" },
    });
  });
});
