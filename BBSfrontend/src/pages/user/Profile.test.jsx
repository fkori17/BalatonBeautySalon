import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import api from "../../api/axios";
import { LoadingContext } from "../../context/LoadingContext";
import { BrowserRouter } from "react-router-dom";
jest.mock("../../api/axios");
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));
const renderProfile = () => {
  const setLoading = jest.fn();
  return render(
    <LoadingContext.Provider value={{ setLoading }}>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </LoadingContext.Provider>
  );
};

describe("Profile komponens", () => {
  const mockUser = {
    name: "Teszt Felhasználó",
    email: "teszt@email.hu",
    phone: "+36301234567",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    api.get.mockResolvedValue({ data: mockUser });
  });

  test("betölti és megjeleníti a felhasználói adatokat", async () => {
    renderProfile();

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockUser.phone)).toBeInTheDocument();
    });
  });

  test("validációs hiba ha üresek a jelszó mezők", async () => {
    renderProfile();
    await waitFor(() => screen.getByText("Jelszó mentése"));
    
    const saveButton = screen.getByText("Jelszó mentése");
    fireEvent.click(saveButton);
    expect(await screen.findByText("Minden mező kitöltése kötelező!")).toBeInTheDocument();
  });

  test("hibaüzenet ha az új jelszavak nem egyeznek", async () => {
    renderProfile();
    await waitFor(() => screen.getByText("Jelszó mentése"));

    const inputs = screen.getAllByRole("textbox", { type: "password" });
    const passwordInputs = screen.getAllByPlaceholderText(""); 
    
    fireEvent.change(screen.getByLabelText("Jelenlegi jelszó"), { target: { value: "old123" } });
    fireEvent.change(screen.getByLabelText("Új jelszó"), { target: { value: "new123456" } });
    fireEvent.change(screen.getByLabelText("Új jelszó újra"), { target: { value: "masvalami" } });

    fireEvent.click(screen.getByText("Jelszó mentése"));

    expect(await screen.findByText("Az új jelszavak nem egyeznek!")).toBeInTheDocument();
  });

  test("sikeres jelszómódosítás után átnavigál a loginra", async () => {
    api.post.mockResolvedValue({});
    renderProfile();
    await waitFor(() => screen.getByText("Jelszó mentése"));

    fireEvent.change(screen.getByLabelText("Jelenlegi jelszó"), { target: { value: "old123" } });
    fireEvent.change(screen.getByLabelText("Új jelszó"), { target: { value: "new123456" } });
    fireEvent.change(screen.getByLabelText("Új jelszó újra"), { target: { value: "new123456" } });

    fireEvent.click(screen.getByText("Jelszó mentése"));

    await waitFor(() => {
      expect(screen.getByText(/Jelszó sikeresen módosítva/i)).toBeInTheDocument();
    });
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/login"), { timeout: 2000 });
  });
});