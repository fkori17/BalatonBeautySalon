import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import api from "../api/axios";
jest.mock("../api/axios");
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe("Login komponens", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("megjeleníti a login formot és a logót", () => {
    renderLogin();
    expect(screen.getByText("Balaton Beauty Salon")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jelszó")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /bejelentkezés/i })).toBeInTheDocument();
  });

  test("sikeres bejelentkezés menti a tokent és navigál", async () => {
    const mockToken = "fake-token";
    api.post.mockResolvedValueOnce({ data: { token: mockToken } });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Jelszó"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /bejelentkezés/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/login", {
        email: "test@example.com",
        password: "password123",
      });
      expect(localStorage.getItem("token")).toBe(mockToken);
      expect(localStorage.getItem("authType")).toBe("user");
      expect(mockedNavigate).toHaveBeenCalledWith("/user");
    });
  });

  test("hibás bejelentkezés esetén hibaüzenetet mutat", async () => {
    api.post.mockRejectedValueOnce(new Error("Unauthorized"));

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "wrong@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Jelszó"), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByRole("button", { name: /bejelentkezés/i }));

    expect(await screen.findByText("Hibás email cím vagy jelszó!")).toBeInTheDocument();
  });

  test("az elfelejtett jelszó modal megnyílik és működik", async () => {
    api.post.mockResolvedValueOnce({}); 

    renderLogin();

    fireEvent.click(screen.getByText("Elfelejtett jelszó?"));
    expect(screen.getByText("Add meg az email címed, és küldünk egy jelszó-visszaállító linket.")).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email cím");
    fireEvent.change(emailInput, { target: { value: "reset@test.com" } });

    fireEvent.click(screen.getByText("Email küldése"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/forgot-password", { email: "reset@test.com" });
      expect(screen.getByText(/A jelszó-visszaállító linket elküldtük/i)).toBeInTheDocument();
    });
  });

  test("jelszó láthatósága vált gombra kattintva", () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("Jelszó");
    
    expect(passwordInput).toHaveAttribute("type", "password");
    const toggleBtn = screen.getByPlaceholderText("Jelszó").nextSibling;
    fireEvent.click(toggleBtn);

    expect(passwordInput).toHaveAttribute("type", "text");
  });
});