import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditCustomerModal from "./EditCustomerModal";
import api from "../api/axios";

jest.mock("../api/axios");

describe("EditCustomerModal", () => {
  const onHide = jest.fn();
  const onSuccess = jest.fn();

  const customer = {
    id: 1,
    email: "teszt@test.hu",
    name: "Teszt Elek",
    phone: "+36301234567",
    loyal: true,
    password: "password123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModal = () =>
    render(
      <EditCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onSuccess={onSuccess}
      />
    );

  test("megjelenik a modal", () => {
    renderModal();
    expect(screen.getByText("Ügyfél szerkesztése")).toBeInTheDocument();
  });

  test("betölti a customer adatokat", () => {
    renderModal();

    expect(screen.getByDisplayValue("teszt@test.hu")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Teszt Elek")).toBeInTheDocument();
    expect(screen.getByDisplayValue("+36301234567")).toBeInTheDocument();
  });

  test("validáció működik", async () => {
    renderModal();

    const nameInput = screen.getByLabelText(/név/i);

    await userEvent.clear(nameInput);
    await userEvent.click(screen.getByRole("button", { name: /mentés/i }));

    expect(api.put).not.toHaveBeenCalled();
    expect(screen.getByText(/kötelező/i)).toBeInTheDocument();
  });

  test("sikeres mentés működik", async () => {
    api.put.mockResolvedValue({});

    renderModal();

    const nameInput = screen.getByLabelText(/név/i);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Teszt Béla");

    await userEvent.click(screen.getByRole("button", { name: /mentés/i }));

    expect(api.put).toHaveBeenCalledWith(
      expect.stringContaining("/1"),
      expect.objectContaining({
        name: "Teszt Béla",
      })
    );

    expect(onSuccess).toHaveBeenCalled();
    expect(onHide).toHaveBeenCalled();
  });

  test("hiba eset toast jelenik meg", async () => {
    api.put.mockRejectedValue({});

    renderModal();

    await userEvent.click(screen.getByRole("button", { name: /mentés/i }));

    expect(
      await screen.findByText("Hiba történt a mentés során")
    ).toBeInTheDocument();
  });
});