import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

describe("ProtectedRoute", () => {

  afterEach(() => {
    localStorage.clear();
  });

  test("ha nincs token → loginra dob", () => {
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Védett tartalom</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Védett tartalom")).not.toBeInTheDocument();
  });

  test("ha van token → megjelenik a children", () => {
    localStorage.setItem("token", "123");

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Védett tartalom</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Védett tartalom")).toBeInTheDocument();
  });

  test("ha rossz authType → loginra dob", () => {
    localStorage.setItem("token", "123");
    localStorage.setItem("authType", "user");

    render(
      <MemoryRouter>
        <ProtectedRoute allowedType="admin">
          <div>Védett tartalom</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Védett tartalom")).not.toBeInTheDocument();
  });

});