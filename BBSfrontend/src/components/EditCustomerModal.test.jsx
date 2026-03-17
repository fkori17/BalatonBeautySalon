import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
    password: "password123"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("megjelenik a modal", () => {
    render(
      <EditCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onSuccess={onSuccess}
      />
    );

    expect(screen.getByText("Ügyfél szerkesztése")).toBeInTheDocument();
  });

  test("betölti a customer adatokat", () => {
    render(
      <EditCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onSuccess={onSuccess}
      />
    );

    expect(screen.getByDisplayValue("teszt@test.hu")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Teszt Elek")).toBeInTheDocument();
    expect(screen.getByDisplayValue("+36301234567")).toBeInTheDocument();
  });

  test("validáció működik", async () => {
    render(
      <EditCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onSuccess={onSuccess}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Teszt Elek"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Mentés"));

    await waitFor(() => {
      expect(screen.getByText("Ügyfél szerkesztése")).toBeInTheDocument();
    });
  });

  test("sikeres mentés működik", async () => {
    api.put.mockResolvedValue({});

    render(
      <EditCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onSuccess={onSuccess}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Teszt Elek"), {
      target: { value: "Teszt Béla" },
    });

    fireEvent.click(screen.getByText("Mentés"));

    await waitFor(() => expect(api.put).toHaveBeenCalled());

    expect(onSuccess).toHaveBeenCalled();
    expect(onHide).toHaveBeenCalled();
  });

  test("hiba eset toast jelenik meg", async () => {
    api.put.mockRejectedValue({});

    render(
      <EditCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onSuccess={onSuccess}
      />
    );

    fireEvent.click(screen.getByText("Mentés"));

    expect(
      await screen.findByText("Hiba történt a mentés során")
    ).toBeInTheDocument();
  });
});