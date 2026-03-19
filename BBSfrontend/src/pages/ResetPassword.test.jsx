import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import api from "../api/axios";

jest.mock("../api/axios");
const renderWithParams = (token = "test-token", email = "test@test.hu") => {
  return render(
    <MemoryRouter initialEntries={[`/reset-password?token=${token}&email=${email}`]}>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<div>Bejelentkezés Oldal</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ResetPassword komponens", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("megjelennek a szükséges beviteli mezők", () => {
    renderWithParams();
    expect(screen.getByText("Új jelszó megadása")).toBeInTheDocument();
    expect(screen.getByLabelText("Új jelszó")).toBeInTheDocument();
    expect(screen.getByLabelText("Jelszó megerősítése")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /jelszó frissítése/i })).toBeInTheDocument();
  });

  test("hibaüzenetet küld, ha a két jelszó nem egyezik", async () => {
    renderWithParams();

    fireEvent.change(screen.getByLabelText("Új jelszó"), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText("Jelszó megerősítése"), { target: { value: "masikjelszo" } });
    
    fireEvent.click(screen.getByRole("button", { name: /jelszó frissítése/i }));

    expect(await screen.findByText("A két jelszó nem egyezik!")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  test("sikeres jelszóvisszaállítás esetén üzenetet mutat és átirányít", async () => {
    api.post.mockResolvedValueOnce({});
    renderWithParams("secret-token", "user@email.hu");

    fireEvent.change(screen.getByLabelText("Új jelszó"), { target: { value: "NewPassword123" } });
    fireEvent.change(screen.getByLabelText("Jelszó megerősítése"), { target: { value: "NewPassword123" } });

    fireEvent.click(screen.getByRole("button", { name: /jelszó frissítése/i }));
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/reset-password", {
        token: "secret-token",
        email: "user@email.hu",
        password: "NewPassword123",
        password_confirmation: "NewPassword123",
      });
    });

    expect(screen.getByText(/Sikeres jelszóvisszaállítás/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Bejelentkezés Oldal")).toBeInTheDocument();
    }, { timeout: 6000 });
  });

  test("megjeleníti a szerveroldali hibaüzenetet", async () => {
    const errorMessage = "A link lejárt vagy érvénytelen.";
    api.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } }
    });

    renderWithParams();

    fireEvent.change(screen.getByLabelText("Új jelszó"), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText("Jelszó megerősítése"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /jelszó frissítése/i }));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});