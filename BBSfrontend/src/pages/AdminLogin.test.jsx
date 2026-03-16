import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("megjelenik az oldal", () => {
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    expect(screen.getByText("Balaton Beauty Salon")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jelszó")).toBeInTheDocument();
  });

  test("validáció működik (üres submit)", async () => {
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Bejelentkezés"));

    expect(await screen.findByText("Kérlek, add meg az email címed!")).toBeInTheDocument();
  });

  test("sikeres login működik", async () => {
    api.post.mockResolvedValue({
      data: { token: "test-token" },
    });

    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "admin@test.hu" },
    });

    fireEvent.change(screen.getByPlaceholderText("Jelszó"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByText("Bejelentkezés"));

    await waitFor(() => expect(api.post).toHaveBeenCalled());

    expect(localStorage.getItem("token")).toBe("test-token");
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  test("hibás login alertet dob", async () => {
    window.alert = jest.fn();

    api.post.mockRejectedValue({});

    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "admin@test.hu" },
    });

    fireEvent.change(screen.getByPlaceholderText("Jelszó"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByText("Bejelentkezés"));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Hibás belépési adatok")
    );
  });
});