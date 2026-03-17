import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSidebar from "./UserSidebar";
import { MemoryRouter } from "react-router-dom";

const mockLogout = jest.fn();
jest.mock("../hooks/useLogout", () => () => mockLogout);

jest.mock("../api/axios", () => ({
  get: jest.fn(),
}));

import api from "../api/axios";

describe("UserSidebar tesztek", () => {

  test("loading szöveg jelenik meg először", async () => {
    api.get.mockResolvedValueOnce({ data: { name: "Teszt Elek" } });

    render(
      <MemoryRouter>
        <UserSidebar />
      </MemoryRouter>
    );

    expect(screen.getAllByText("Betöltés...")[0]).toBeInTheDocument();

    await screen.findAllByText("Teszt Elek");
  });

  test("felhasználó neve megjelenik API után", async () => {
    api.get.mockResolvedValueOnce({ data: { name: "Teszt Elek" } });

    render(
      <MemoryRouter>
        <UserSidebar />
      </MemoryRouter>
    );

    expect(await screen.findAllByText("Teszt Elek")).toHaveLength(2);
  });

  test("menüpontok megjelennek", async () => {
    api.get.mockResolvedValueOnce({ data: { name: "Teszt Elek" } });

    render(
      <MemoryRouter>
        <UserSidebar />
      </MemoryRouter>
    );

    await screen.findByText("Kezdőlap");

    expect(screen.getByText("Kezeléseim")).toBeInTheDocument();
    expect(screen.getByText("Profilom")).toBeInTheDocument();
    expect(screen.getByText("Kapcsolat")).toBeInTheDocument();
  });

  test("logout működik", async () => {
    api.get.mockResolvedValueOnce({ data: { name: "Teszt Elek" } });

    render(
      <MemoryRouter>
        <UserSidebar />
      </MemoryRouter>
    );

    await screen.findByText("Kijelentkezés");

    await userEvent.click(screen.getByText("Kijelentkezés"));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("mobil menü megnyílik", async () => {
    api.get.mockResolvedValueOnce({ data: { name: "Teszt Elek" } });

    render(
      <MemoryRouter>
        <UserSidebar />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "☰" });

    await userEvent.click(button);

    expect(await screen.findAllByText("Teszt Elek")).toHaveLength(3);
  });

});