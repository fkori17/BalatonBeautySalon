import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TreatmentModal from "./TreatmentModal";
import api from "../api/axios";

jest.mock("../api/axios");

describe("TreatmentModal", () => {
  const onHide = jest.fn();
  const onSuccess = jest.fn();

  const customers = [
    { id: 1, name: "Teszt Anna", email: "teszt@test.hu" },
  ];

  const services = [
    { id: 1, name: "Géllakkozás", price: 3000, active: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockInitialData = () => {
    api.get
      .mockResolvedValueOnce({ data: customers })
      .mockResolvedValueOnce({ data: services });
  };

  const renderModal = () =>
    render(
      <TreatmentModal
        show={true}
        onHide={onHide}
        onSuccess={onSuccess}
      />
    );

  test("megjelenik a modal", async () => {
    mockInitialData();
    renderModal();

    expect(await screen.findByText("Új kezelés hozzáadása")).toBeInTheDocument();
  });

  test("betölti az adatokat", async () => {
    mockInitialData();
    renderModal();

    expect(await screen.findByText(/Teszt Anna/)).toBeInTheDocument();
    expect(await screen.findByText(/Géllakkozás/)).toBeInTheDocument();
  });

  test("validáció működik", async () => {
    mockInitialData();
    renderModal();

    await userEvent.click(await screen.findByRole("button", { name: /mentés/i }));

    expect(
      await screen.findByText("Ügyfél kiválasztása kötelező.")
    ).toBeInTheDocument();

    expect(api.post).not.toHaveBeenCalled();
  });

  test("service hozzáadás működik", async () => {
    mockInitialData();
    renderModal();

    await userEvent.click(await screen.findByText(/Géllakkozás/));

    expect(await screen.findByText("3000 Ft")).toBeInTheDocument();
  });

  test("sikeres mentés működik", async () => {
    mockInitialData();
    api.post.mockResolvedValue({});

    renderModal();

    await userEvent.click(await screen.findByText(/Teszt Anna/));
    await userEvent.click(screen.getByText(/Géllakkozás/));
    await userEvent.click(await screen.findByRole("button", { name: /mentés/i }));

    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        customerId: 1,
      })
    );

    expect(onHide).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  test("loading spinner megjelenik", async () => {
    api.get.mockImplementation(() => new Promise(() => {}));

    renderModal();

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });
});