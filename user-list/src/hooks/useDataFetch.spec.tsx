import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import { useDataFetch } from "./useDataFetch";
import { API_URL } from "../utils/constants";

global.fetch = jest.fn();

const TestComponent = () => {
  const { data, error, loading } = useDataFetch(API_URL);
  return (
    <div>
      <span data-testid="loading">{loading ? "Loading" : "Loaded"}</span>
      <span data-testid="error">{error ? error.message : null}</span>
      <span data-testid="data">{data ? JSON.stringify(data) : null}</span>
    </div>
  );
};

describe("useDataFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data, error, and loading state correctly on successful fetch", async () => {
    const mockData = [
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

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    render(<TestComponent />);

    expect(screen.getByTestId("loading").textContent).toBe("Loading");

    await waitFor(() =>
      expect(screen.getByTestId("data").textContent).toBe(
        JSON.stringify(mockData)
      )
    );

    expect(screen.getByTestId("loading").textContent).toBe("Loaded");
    expect(screen.getByTestId("error").textContent).toBe("");
    expect(screen.getByTestId("data").textContent).toBe(
      JSON.stringify(mockData)
    );
  });

  it("should handle fetch error correctly", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<TestComponent />);

    expect(screen.getByTestId("loading").textContent).toBe("Loading");

    await waitFor(() =>
      expect(screen.getByTestId("error").textContent).toBe("Network error")
    );

    expect(screen.getByTestId("loading").textContent).toBe("Loaded");
    expect(screen.getByTestId("error").textContent).toBe("Network error");
  });

  it("should handle 400 Bad Request error correctly", async () => {
    const errorMessage = "HTTP error! Status: 400";

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    render(<TestComponent />);

    expect(screen.getByTestId("loading").textContent).toBe("Loading");

    await waitFor(() =>
      expect(screen.getByTestId("error").textContent).toBe(errorMessage)
    );

    expect(screen.getByTestId("loading").textContent).toBe("Loaded");
    expect(screen.getByTestId("error").textContent).toBe(errorMessage);
  });

  it("should handle 404 Not Found error correctly", async () => {
    const errorMessage = "HTTP error! Status: 404";

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<TestComponent />);

    expect(screen.getByTestId("loading").textContent).toBe("Loading");

    await waitFor(() =>
      expect(screen.getByTestId("error").textContent).toBe(errorMessage)
    );

    expect(screen.getByTestId("loading").textContent).toBe("Loaded");
    expect(screen.getByTestId("error").textContent).toBe(errorMessage);
  });
});
