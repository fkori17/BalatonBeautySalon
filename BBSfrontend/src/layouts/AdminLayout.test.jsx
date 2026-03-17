import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";

jest.mock("../components/AdminSidebar", () => ({ children }) => (
  <div>
    <div>Sidebar</div>
    {children}
  </div>
));

describe("AdminLayout", () => {
  test("megjelenik a sidebar és az outlet tartalom", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<div>Oldal tartalom</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Oldal tartalom")).toBeInTheDocument();
  });
});