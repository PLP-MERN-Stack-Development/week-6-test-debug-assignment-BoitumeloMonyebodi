import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import BugList from "../../components/BugList";

jest.mock("axios");

test("renders list of bugs from API", async () => {
  // Mock axios.get to resolve with data
  axios.get.mockResolvedValue({
    data: [
      { _id: "1", title: "Bug 1", description: "Bug 1 description" },
      { _id: "2", title: "Bug 2", description: "Bug 2 description" },
    ],
  });

  render(<BugList />);

  // Initially shows loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for list to appear after axios resolves
  await waitFor(() => {
    expect(screen.getByText("Bug 1")).toBeInTheDocument();
    expect(screen.getByText("Bug 2")).toBeInTheDocument();
  });
});