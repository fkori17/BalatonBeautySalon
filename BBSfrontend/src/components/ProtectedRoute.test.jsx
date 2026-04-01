import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

describe("ProtectedRoute", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithRoutes = (ui) =>
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/admin" element={ui} />
          <Route path="/login" element={<div>Login oldal</div>} />
        </Routes>
      </MemoryRouter>
    );

  test("ha nincs token → loginra redirectel", () => {
    renderWithRoutes(
      <ProtectedRoute>
        <div>Védett tartalom</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Login oldal")).toBeInTheDocument();
  });

  test("ha van token → megjelenik a children", () => {
    localStorage.setItem("token", "123");

    renderWithRoutes(
      <ProtectedRoute>
        <div>Védett tartalom</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Védett tartalom")).toBeInTheDocument();
  });

  test("ha rossz authType → loginra dob", () => {
    localStorage.setItem("token", "123");
    localStorage.setItem("authType", "user");

    renderWithRoutes(
      <ProtectedRoute allowedType="admin">
        <div>Védett tartalom</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Login oldal")).toBeInTheDocument();
  });

  test("ha jó authType → beengedi", () => {
    localStorage.setItem("token", "123");
    localStorage.setItem("authType", "admin");

    renderWithRoutes(
      <ProtectedRoute allowedType="admin">
        <div>Védett tartalom</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Védett tartalom")).toBeInTheDocument();
  });

});