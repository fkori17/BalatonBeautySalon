import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminSidebar from "./AdminSidebar";
import { MemoryRouter } from "react-router-dom";

const mockLogout = jest.fn();

jest.mock("../hooks/useLogout", () => () => mockLogout);

describe("AdminSidebar tesztek", () => {

  test("megjelenik az admin felület szöveg", () => {
    render(
      <MemoryRouter>
        <AdminSidebar>TESZT</AdminSidebar>
      </MemoryRouter>
    );

    expect(screen.getAllByText("Admin felület")[0]).toBeInTheDocument();
  });

  test("megjelennek a menüpontok", () => {
    render(
      <MemoryRouter>
        <AdminSidebar />
      </MemoryRouter>
    );

    expect(screen.getByText("Kezdőlap")).toBeInTheDocument();
    expect(screen.getByText("Kezelések")).toBeInTheDocument();
    expect(screen.getByText("Ügyfelek")).toBeInTheDocument();
    expect(screen.getByText("Szolgáltatások")).toBeInTheDocument();
    expect(screen.getByText("Statisztikák")).toBeInTheDocument();
  });

  test("logout meghívódik kattintásra", async () => {
    render(
      <MemoryRouter>
        <AdminSidebar />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByText("Kijelentkezés");
    await userEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("hamburger menü megnyílik kattintásra", async () => {
    render(
      <MemoryRouter>
        <AdminSidebar />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "☰" });

    await userEvent.click(button);

    expect(screen.getAllByText("Admin felület")[1]).toBeInTheDocument();
  });

});