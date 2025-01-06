// UserList.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

const mockUsers = [
  {
    name: { first: "John", last: "Doe" },
    location: { city: "New York" },
    gender: "Male",
    dob: { age: 30 },
  },
  {
    name: { first: "Jane", last: "Smith" },
    location: { city: "Los Angeles" },
    gender: "Female",
    dob: { age: 25 },
  },
];

describe("UserList", () => {
  it("renders a message when there are no users", () => {
    render(<UserList hasError={false} users={[]} />);

    expect(
      screen.getByText("No users available to display.")
    ).toBeInTheDocument();
  });

  it("renders the user list when users are available", () => {
    render(<UserList hasError={false} users={mockUsers} />);

    // Check that the table is rendered
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Check that user data is correctly rendered
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();

    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("throws an error if there is an error with the user list", () => {
    expect(() =>
      render(<UserList hasError={true} users={mockUsers} />)
    ).toThrowError("No users available");
  });
});
