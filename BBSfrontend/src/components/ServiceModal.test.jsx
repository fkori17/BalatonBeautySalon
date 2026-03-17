import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  test("megjelenik új szolgáltatás módban", () => {
    render(
      <ServiceModal
        show={true}
        onHide={onHide}
        onSuccess={onSuccess}
      />
    );

    expect(screen.getByText("Új szolgáltatás")).toBeInTheDocument();
  });

  test("megjelenik szerkesztés módban", () => {
    render(
      <ServiceModal
        show={true}
        onHide={onHide}
        service={service}
        onSuccess={onSuccess}
      />
    );

    expect(screen.getByText("Szolgáltatás szerkesztése")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Hajvágás")).toBeInTheDocument();
    expect(screen.getByDisplayValue("3000")).toBeInTheDocument();
  });

  test("validáció működik (üres submit)", async () => {
    render(
      <ServiceModal
        show={true}
        onHide={onHide}
        onSuccess={onSuccess}
      />
    );

    fireEvent.click(screen.getByText("Mentés"));

    await waitFor(() => {
      expect(screen.getByText("Adj meg egy szolgáltatás nevet!")).toBeInTheDocument();
    });
  });

  test("új szolgáltatás mentése (POST)", async () => {
    api.post.mockResolvedValue({});

    render(
      <ServiceModal
        show={true}
        onHide={onHide}
        onSuccess={onSuccess}
      />
    );

    fireEvent.change(screen.getByLabelText("Szolgáltatás neve"), {
      target: { value: "Festés" },
    });

    fireEvent.change(screen.getByLabelText("Ár (Ft)"), {
      target: { value: "5000" },
    });

    fireEvent.click(screen.getByText("Mentés"));

    await waitFor(() => expect(api.post).toHaveBeenCalled());

    expect(onHide).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  test("szerkesztés mentése (PUT)", async () => {
    api.put.mockResolvedValue({});

    render(
      <ServiceModal
        show={true}
        onHide={onHide}
        service={service}
        onSuccess={onSuccess}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Hajvágás"), {
      target: { value: "Hajvágás PRO" },
    });

    fireEvent.click(screen.getByText("Mentés"));

    await waitFor(() => expect(api.put).toHaveBeenCalled());

    expect(onHide).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  test("loading állapot megjelenik", async () => {
    api.post.mockImplementation(() => new Promise(() => {}));

    render(
      <ServiceModal
        show={true}
        onHide={onHide}
        onSuccess={onSuccess}
      />
    );

    fireEvent.change(screen.getByLabelText("Szolgáltatás neve"), {
      target: { value: "Teszt" },
    });

    fireEvent.change(screen.getByLabelText("Ár (Ft)"), {
      target: { value: "1000" },
    });

    fireEvent.click(screen.getByText("Mentés"));

    expect(await screen.findByText("Folyamatban...")).toBeInTheDocument();
  });
});