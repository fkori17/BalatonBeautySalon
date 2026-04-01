import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminLogin from "./AdminLogin";
import api from "../api/axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("../api/axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AdminLogin", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  const renderLogin = () =>
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

  test("megjelenik az oldal", () => {
    renderLogin();

    expect(screen.getByText("Balaton Beauty Salon")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jelszó")).toBeInTheDocument();
  });

  test("validáció működik (üres submit)", async () => {
    renderLogin();

    await user.click(screen.getByText("Bejelentkezés"));

    expect(
      await screen.findByText("Kérlek, add meg az email címed!")
    ).toBeInTheDocument();
  });

  test("sikeres login működik", async () => {
    api.post.mockResolvedValue({ data: { token: "test-token" } });

    renderLogin();

    await user.type(screen.getByPlaceholderText("Email"), "admin@test.hu");
    await user.type(screen.getByPlaceholderText("Jelszó"), "12345678");
    await user.click(screen.getByText("Bejelentkezés"));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "admin@test.hu",
      password: "12345678",
    }));

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "test-token");
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  test("hibás login alertet dob", async () => {
    api.post.mockRejectedValue({});

    renderLogin();

    await user.type(screen.getByPlaceholderText("Email"), "admin@test.hu");
    await user.type(screen.getByPlaceholderText("Jelszó"), "12345678");
    await user.click(screen.getByText("Bejelentkezés"));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Hibás belépési adatok")
    );
  });
});