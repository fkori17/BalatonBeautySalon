import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import api from "../api/axios";

jest.mock("../api/axios");

const mockedNavigate = jest.fn();

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe("Login komponens", () => {

  beforeEach(() => {

    jest.clearAllMocks();
    localStorage.clear();

  });


  test("megjeleníti a login formot és a logót", () => {

    renderLogin();

    expect(
      screen.getByText("Balaton Beauty Salon")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Jelszó")
    ).toBeInTheDocument();

  });


  test("sikeres bejelentkezés menti a tokent", async () => {

    api.post.mockResolvedValueOnce({

      data: {
        token: "fake-token"
      }

    });

    renderLogin();

    fireEvent.change(

      screen.getByPlaceholderText("Email"),

      {
        target: {
          value: "test@test.com"
        }
      }

    );

    fireEvent.change(

      screen.getByPlaceholderText("Jelszó"),

      {
        target: {
          value: "password123"
        }
      }

    );

    fireEvent.click(

      screen.getByRole("button", {
        name: /bejelentkezés/i
      })

    );

    await waitFor(() => {

      expect(api.post).toHaveBeenCalledWith(

        "/login",

        {
          email: "test@test.com",
          password: "password123"
        }

      );

      expect(localStorage.getItem("token"))
        .toBe("fake-token");

      expect(localStorage.getItem("authType"))
        .toBe("user");

    });

  });


  test("hibás bejelentkezés esetén hibaüzenetet mutat", async () => {

    api.post.mockRejectedValueOnce(new Error());

    renderLogin();

    fireEvent.change(

      screen.getByPlaceholderText("Email"),

      {
        target: {
          value: "wrong@test.com"
        }
      }

    );

    fireEvent.change(

      screen.getByPlaceholderText("Jelszó"),

      {
        target: {
          value: "wrongpass"
        }
      }

    );

    fireEvent.click(

      screen.getByRole("button", {
        name: /bejelentkezés/i
      })

    );

    expect(

      await screen.findByText(
        "Hibás email cím vagy jelszó!"
      )

    ).toBeInTheDocument();

  });


  test("elfelejtett jelszó modal működik", async () => {

    api.post.mockResolvedValueOnce({});

    renderLogin();

    fireEvent.click(

      screen.getByText("Elfelejtett jelszó?")

    );

    expect(

      screen.getByText(
        /jelszó-visszaállító linket/i
      )

    ).toBeInTheDocument();

    fireEvent.change(

      screen.getByPlaceholderText("Email cím"),

      {
        target: {
          value: "reset@test.com"
        }
      }

    );

    fireEvent.click(

      screen.getByText("Email küldése")

    );

    await waitFor(() => {

      expect(api.post).toHaveBeenCalledWith(

        "/forgot-password",

        {
          email: "reset@test.com"
        }

      );

    });

  });


  test("jelszó láthatóság váltása működik", () => {

    renderLogin();

    const input =
      screen.getByPlaceholderText("Jelszó");

    expect(input.type)
      .toBe("password");

    fireEvent.click(

      input.nextSibling

    );

    expect(input.type)
      .toBe("text");

  });

});