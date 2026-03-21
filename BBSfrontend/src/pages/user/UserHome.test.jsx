import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserHome from "./UserHome";
import api from "../../api/axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../api/axios");

jest.mock("../../context/LoadingContext", () => ({
  useLoading: () => ({
    setLoading: jest.fn(),
  }),
}));

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const renderUserHome = () =>
  render(
    <BrowserRouter>
      <UserHome />
    </BrowserRouter>
  );

describe("UserHome komponens", () => {

  const mockLastTreatment = {
    id: 1,
    created_at: "2024-05-20T10:00:00Z",
    description: "Szuper vágás",
    services: [
      { name: "Hajmosás", pivot: { piece: 1 } },
      { name: "Hajvágás", pivot: { piece: 1 } },
    ],
  };

  const mockStats = {
    username: "Teszt Elek",
    next_visit: "2024. 06. 15.",
    total_treatments: 5,
    member_since: "2023-10-01T00:00:00Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    api.get.mockImplementation((url) => {

      if (url === "/treatments/me/last")
        return Promise.resolve({ data: mockLastTreatment });

      if (url === "/treatments/me/stats")
        return Promise.resolve({ data: mockStats });

    });
  });

  test("megjeleníti az üdvözlő szöveget és statokat", async () => {

    renderUserHome();

    expect(await screen.findByText(/Teszt Elek/i)).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2024. 06. 15.")).toBeInTheDocument();

  });

  test("utolsó kezelés megjelenik", async () => {

    renderUserHome();

    expect(await screen.findByText(/Hajmosás/i)).toBeInTheDocument();
    expect(screen.getByText(/Hajvágás/i)).toBeInTheDocument();

  });

  test("Megtekintés megnyitja a modalt", async () => {

    renderUserHome();

    fireEvent.click(await screen.findByText("Megtekintés"));

    expect(await screen.findByText("Kezelés részletei")).toBeInTheDocument();

  });

  test("modal navigál treatments oldalra", async () => {

    renderUserHome();

    fireEvent.click(await screen.findByText("Megtekintés"));

    fireEvent.click(screen.getByText(/kezeléseimhez/i));

    expect(mockedNavigate).toHaveBeenCalledWith("/user/treatments");

  });

  test("üres állapot ha nincs kezelés", async () => {

    api.get.mockImplementation((url) => {

      if (url === "/treatments/me/last")
        return Promise.resolve({ data: null });

      if (url === "/treatments/me/stats")
        return Promise.resolve({
          data: { ...mockStats, total_treatments: 0 },
        });

    });

    renderUserHome();

    expect(
      await screen.findByText(/még nincs rögzített kezelésed/i)
    ).toBeInTheDocument();

  });

});