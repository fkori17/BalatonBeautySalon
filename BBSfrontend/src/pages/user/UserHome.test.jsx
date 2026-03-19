import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserHome from "./UserHome";
import api from "../../api/axios";
import { LoadingContext } from "../../context/LoadingContext";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../api/axios");
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const renderUserHome = () => {
  const setLoading = jest.fn();
  return render(
    <LoadingContext.Provider value={{ setLoading }}>
      <BrowserRouter>
        <UserHome />
      </BrowserRouter>
    </LoadingContext.Provider>
  );
};

describe("UserHome komponens", () => {
  const mockLastTreatment = {
    id: 1,
    created_at: "2024-05-20T10:00:00Z",
    description: "Szuper vágás",
    services: [
      { name: "Hajmosás", pivot: { piece: 1 } },
      { name: "Hajvágás", pivot: { piece: 1 } }
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
      if (url === "/treatments/me/last") return Promise.resolve({ data: mockLastTreatment });
      if (url === "/treatments/me/stats") return Promise.resolve({ data: mockStats });
      return Promise.reject(new Error("Ismeretlen URL"));
    });
  });

  test("megjeleníti az üdvözlő szöveget és a statisztikákat", async () => {
    renderUserHome();

    expect(await screen.findByText(/Üdvözlünk, Teszt Elek!/i)).toBeInTheDocument();
    
    expect(screen.getByText("5")).toBeInTheDocument(); 
    expect(screen.getByText("2024. 06. 15.")).toBeInTheDocument(); 
    expect(screen.getByText("2023. 10. 01.")).toBeInTheDocument();
  });

  test("megjeleníti az utolsó kezelés adatait", async () => {
    renderUserHome();

    expect(await screen.findByText("2024. 05. 20.")).toBeInTheDocument();
    expect(screen.getByText(/Hajmosás/i)).toBeInTheDocument();
    expect(screen.getByText(/Hajvágás/i)).toBeInTheDocument();
  });

  test("a Megtekintés gomb megnyitja a modalt", async () => {
    renderUserHome();
    
    const viewBtn = await screen.findByText("Megtekintés");
    fireEvent.click(viewBtn);

    expect(screen.getByText("Kezelés részletei")).toBeInTheDocument();
    expect(screen.getByText(/Szuper vágás/i)).toBeInTheDocument();
  });

  test("a modal gombja átnavigál a kezelések oldalra", async () => {
    renderUserHome();
    
    const viewBtn = await screen.findByText("Megtekintés");
    fireEvent.click(viewBtn);

    const jumpBtn = screen.getByText("Ugrás a kezeléseimhez");
    fireEvent.click(jumpBtn);

    expect(mockedNavigate).toHaveBeenCalledWith("/user/treatments");
  });

  test("megjeleníti az üres állapotot, ha nincs kezelés", async () => {
    api.get.mockImplementation((url) => {
      if (url === "/treatments/me/last") return Promise.resolve({ data: null });
      if (url === "/treatments/me/stats") return Promise.resolve({ data: { ...mockStats, total_treatments: 0 } });
      return Promise.resolve({ data: {} });
    });

    renderUserHome();

    expect(await screen.findByText("Még nincs rögzített kezelésed.")).toBeInTheDocument();
  });
});