import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "./Profile";
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

const renderProfile = () =>
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );

describe("Profile", () => {

  const mockUser = {

    name: "Teszt Felhasználó",
    email: "teszt@email.hu",
    phone: "+36301234567",

  };

  beforeEach(() => {

    jest.clearAllMocks();

    api.get.mockResolvedValue({
      data: mockUser,
    });

  });

  test("megjeleníti user adatokat", async () => {

    renderProfile();

    expect(await screen.findByDisplayValue(mockUser.name))
      .toBeInTheDocument();

  });

  test("validáció működik", async () => {

    renderProfile();

    fireEvent.click(
      await screen.findByText(/jelszó mentése/i)
    );

    expect(
      await screen.findByText(/kötelező/i)
    ).toBeInTheDocument();

  });

  test("nem egyező jelszó hiba", async () => {

    renderProfile();

    const inputs = await screen.findAllByDisplayValue("");

    fireEvent.change(inputs[0], {
      target: { value: "old123" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "new123456" },
    });

    fireEvent.change(inputs[2], {
      target: { value: "rossz" },
    });

    fireEvent.click(
      await screen.findByText(/jelszó mentése/i)
    );

    expect(
      await screen.findByText(/nem egyeznek/i)
    ).toBeInTheDocument();

  });

  test("sikeres mentés navigál loginra", async () => {

    api.post.mockResolvedValue({});

    renderProfile();

    const inputs = await screen.findAllByDisplayValue("");

    fireEvent.change(inputs[0], {
      target: { value: "old123" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "new123456" },
    });

    fireEvent.change(inputs[2], {
      target: { value: "new123456" },
    });

    fireEvent.click(
      await screen.findByText(/jelszó mentése/i)
    );

    await waitFor(() => {

      expect(mockedNavigate)
        .toHaveBeenCalledWith("/login");

    }, { timeout: 2000 });

  });

});