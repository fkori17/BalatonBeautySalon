import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminSidebar from "./AdminSidebar";
import { MemoryRouter } from "react-router-dom";

const mockLogout = jest.fn();

jest.mock("../hooks/useLogout", () => () => mockLogout);

const renderSidebar = (props = {}) =>
  render(
    <MemoryRouter>
      <AdminSidebar {...props} />
    </MemoryRouter>
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AdminSidebar tesztek", () => {

  test("megjelenik az admin felület szöveg", () => {
    renderSidebar();
    expect(screen.getByText("Admin felület")).toBeInTheDocument();
  });

  test("megjelennek a menüpontok", () => {
    renderSidebar();

    expect(screen.getByText("Kezdőlap")).toBeInTheDocument();
    expect(screen.getByText("Kezelések")).toBeInTheDocument();
    expect(screen.getByText("Ügyfelek")).toBeInTheDocument();
    expect(screen.getByText("Szolgáltatások")).toBeInTheDocument();
    expect(screen.getByText("Statisztikák")).toBeInTheDocument();
  });

  test("logout meghívódik kattintásra", async () => {
    renderSidebar();

    await userEvent.click(screen.getByText("Kijelentkezés"));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("hamburger menü megnyílik kattintásra", async () => {
    renderSidebar();

    const button = screen.getByRole("button", { name: /menu|menü/i });

    await userEvent.click(button);

    expect(screen.getAllByText("Admin felület").length).toBeGreaterThan(1);
  });

});