import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import api from "../api/axios";

jest.mock("../api/axios");

const renderWithParams = (
  token = "test-token",
  email = "test@test.hu"
) => {

  return render(

    <MemoryRouter
      initialEntries={[
        `/reset-password?token=${token}&email=${email}`
      ]}
    >

      <Routes>

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/login"
          element={<div>Bejelentkezés Oldal</div>}
        />

      </Routes>

    </MemoryRouter>

  );

};

describe("ResetPassword", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("megjelennek az input mezők", () => {

    renderWithParams();

    expect(
      screen.getByText("Új jelszó megadása")
    ).toBeInTheDocument();

    const inputs = screen.getAllByDisplayValue("");

    expect(inputs.length).toBe(2);

    expect(
      screen.getByRole("button", {
        name: /jelszó frissítése/i
      })
    ).toBeInTheDocument();

  });


  test("hiba ha a két jelszó nem egyezik", async () => {

    renderWithParams();

    const inputs = screen.getAllByDisplayValue("");

    fireEvent.change(inputs[0], {
      target: { value: "password123" }
    });

    fireEvent.change(inputs[1], {
      target: { value: "masikjelszo" }
    });

    fireEvent.click(

      screen.getByRole("button", {
        name: /jelszó frissítése/i
      })

    );

    expect(
      await screen.findByText(/nem egyezik/i)
    ).toBeInTheDocument();

    expect(api.post).not.toHaveBeenCalled();

  });


  test("sikeres reset átirányít loginra", async () => {

    api.post.mockResolvedValue({});

    renderWithParams(
      "secret-token",
      "user@email.hu"
    );

    const inputs = screen.getAllByDisplayValue("");

    fireEvent.change(inputs[0], {
      target: { value: "NewPassword123" }
    });

    fireEvent.change(inputs[1], {
      target: { value: "NewPassword123" }
    });

    fireEvent.click(

      screen.getByRole("button", {
        name: /jelszó frissítése/i
      })

    );

    await waitFor(() => {

      expect(api.post).toHaveBeenCalledWith(

        "/reset-password",

        {

          token: "secret-token",

          email: "user@email.hu",

          password: "NewPassword123",

          password_confirmation: "NewPassword123"

        }

      );

    });

    expect(

      await screen.findByText(/sikeres/i)

    ).toBeInTheDocument();

    await waitFor(() => {

      expect(
        screen.getByText(/Sikeres jelszóvisszaállítás/i)
      ).toBeInTheDocument();

    });

  });


  test("backend hiba megjelenik", async () => {

    const errorMessage =
      "A link lejárt vagy érvénytelen.";

    api.post.mockRejectedValue({

      response: {

        data: {

          message: errorMessage

        }

      }

    });

    renderWithParams();

    const inputs = screen.getAllByDisplayValue("");

    fireEvent.change(inputs[0], {
      target: { value: "password123" }
    });

    fireEvent.change(inputs[1], {
      target: { value: "password123" }
    });

    fireEvent.click(

      screen.getByRole("button", {
        name: /jelszó frissítése/i
      })

    );

    expect(

      await screen.findByText(errorMessage)

    ).toBeInTheDocument();

  });

});