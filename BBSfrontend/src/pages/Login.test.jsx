import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import api from "../api/axios";

jest.mock("../api/axios");

describe("Login komponens", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderLogin = () =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

  test("megjeleníti a login formot és a logót", () => {
    renderLogin();

    expect(screen.getByText("Balaton Beauty Salon")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Jelszó")).toBeInTheDocument();
  });

  test("sikeres bejelentkezés menti a tokent és authType-ot", async () => {
    api.post.mockResolvedValueOnce({ data: { token: "fake-token" } });

    renderLogin();

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Jelszó"), "password123");
    await user.click(screen.getByRole("button", { name: /bejelentkezés/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/login", {
        email: "test@test.com",
        password: "password123",
      });
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(localStorage.getItem("authType")).toBe("user");
    });
  });

  test("hibás bejelentkezés esetén hibaüzenetet mutat", async () => {
    api.post.mockRejectedValueOnce(new Error());

    renderLogin();

    await user.type(screen.getByPlaceholderText("Email"), "wrong@test.com");
    await user.type(screen.getByPlaceholderText("Jelszó"), "wrongpass");
    await user.click(screen.getByRole("button", { name: /bejelentkezés/i }));

    expect(
      await screen.findByText("Hibás email cím vagy jelszó!")
    ).toBeInTheDocument();
  });

  test("elfelejtett jelszó modal működik és küld API hívást", async () => {
    api.post.mockResolvedValueOnce({});

    renderLogin();

    await user.click(screen.getByText("Elfelejtett jelszó?"));

    expect(
      screen.getByText(/jelszó-visszaállító linket/i)
    ).toBeInTheDocument();

    await user.type(
      screen.getByPlaceholderText("Email cím"),
      "reset@test.com"
    );
    await user.click(screen.getByText("Email küldése"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/forgot-password", {
        email: "reset@test.com",
      });
    });
  });

  test("jelszó láthatóság váltása működik", async () => {
    renderLogin();

    const input = screen.getByPlaceholderText("Jelszó");
    expect(input.type).toBe("password");

    await user.click(input.nextSibling);

    expect(input.type).toBe("text");
  });
});