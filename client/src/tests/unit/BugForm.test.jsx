import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BugForm from "../../components/BugForm";

test("renders inputs and button", () => {
  render(<BugForm onSubmit={() => {}} />);

  expect(screen.getByPlaceholderText(/bug title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

test("submits form with data", () => {
  const handleSubmit = jest.fn();
  render(<BugForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByPlaceholderText(/bug title/i), {
    target: { value: "Bug 1" },
  });
  fireEvent.change(screen.getByPlaceholderText(/description/i), {
    target: { value: "Description of Bug 1" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    title: "Bug 1",
    description: "Description of Bug 1",
  });
});