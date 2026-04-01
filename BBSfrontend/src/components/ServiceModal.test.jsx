import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServiceModal from "./ServiceModal";
import api from "../api/axios";

jest.mock("../api/axios");

describe("ServiceModal", () => {
  const onHide = jest.fn();
  const onSuccess = jest.fn();

  const service = {
    id: 1,
    name: "Hajvágás",
    price: 3000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModal = (props = {}) =>
    render(
      <ServiceModal
        show={true}
        onHide={onHide}
        onSuccess={onSuccess}
        {...props}
      />
    );

  test("megjelenik új szolgáltatás módban", () => {
    renderModal();
    expect(screen.getByText("Új szolgáltatás")).toBeInTheDocument();
  });

  test("megjelenik szerkesztés módban", () => {
    renderModal({ service });

    expect(screen.getByText("Szolgáltatás szerkesztése")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Hajvágás")).toBeInTheDocument();
    expect(screen.getByDisplayValue("3000")).toBeInTheDocument();
  });

  test("validáció működik (üres submit)", async () => {
    renderModal();

    await userEvent.click(screen.getByRole("button", { name: /mentés/i }));

    expect(
      await screen.findByText("Adj meg egy szolgáltatás nevet!")
    ).toBeInTheDocument();

    expect(api.post).not.toHaveBeenCalled();
  });

  test("új szolgáltatás mentése (POST)", async () => {
    api.post.mockResolvedValue({});

    renderModal();

    await userEvent.type(
      screen.getByLabelText(/szolgáltatás neve/i),
      "Festés"
    );

    await userEvent.type(
      screen.getByLabelText(/ár/i),
      "5000"
    );

    await userEvent.click(screen.getByRole("button", { name: /mentés/i }));

    expect(api.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        name: "Festés",
        price: 5000,
      })
    );

    expect(onHide).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  test("szerkesztés mentése (PUT)", async () => {
    api.put.mockResolvedValue({});

    renderModal({ service });

    const nameInput = screen.getByLabelText(/szolgáltatás neve/i);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Hajvágás PRO");

    await userEvent.click(screen.getByRole("button", { name: /mentés/i }));

    expect(api.put).toHaveBeenCalledWith(
      expect.stringContaining("/1"),
      expect.objectContaining({
        name: "Hajvágás PRO",
      })
    );

    expect(onHide).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  test("loading állapot megjelenik", async () => {
    api.post.mockImplementation(() => new Promise(() => {}));

    renderModal();

    await userEvent.type(
      screen.getByLabelText(/szolgáltatás neve/i),
      "Teszt"
    );

    await userEvent.type(
      screen.getByLabelText(/ár/i),
      "1000"
    );

    await userEvent.click(screen.getByRole("button", { name: /mentés/i }));

    expect(await screen.findByText("Folyamatban...")).toBeInTheDocument();
  });
});