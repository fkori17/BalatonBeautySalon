import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteTreatmentModal from "./DeleteTreatmentModal";
import api from "../api/axios";

jest.mock("../api/axios");

describe("DeleteTreatmentModal", () => {
  const onHide = jest.fn();
  const onSuccess = jest.fn();

  const treatment = {
    id: 5,
    customer: "Teszt Elek",
    date: "2025-03-10",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModal = () =>
    render(
      <DeleteTreatmentModal
        show={true}
        onHide={onHide}
        onSuccess={onSuccess}
        treatment={treatment}
      />
    );

  test("megjelenik", () => {
    renderModal();

    expect(screen.getByText("Kezelés törlése")).toBeInTheDocument();
    expect(screen.getByText(/Teszt Elek/)).toBeInTheDocument();
  });

  test("Mégse működik", async () => {
    renderModal();

    await userEvent.click(screen.getByRole("button", { name: /mégse/i }));

    expect(onHide).toHaveBeenCalledTimes(1);
  });

  test("sikeres törlés működik", async () => {
    api.delete.mockResolvedValue({});

    renderModal();

    await userEvent.click(
      screen.getByRole("button", { name: /végleges törlés/i })
    );

    expect(api.delete).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith("Kezelés sikeresen törölve!");
    expect(onHide).toHaveBeenCalled();
  });

  test("loading spinner megjelenik", async () => {
    api.delete.mockImplementation(() => new Promise(() => {}));

    renderModal();

    await userEvent.click(
      screen.getByRole("button", { name: /végleges törlés/i })
    );

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  test("hiba eset alert", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    api.delete.mockRejectedValue({});

    renderModal();

    await userEvent.click(
      screen.getByRole("button", { name: /végleges törlés/i })
    );

    expect(alertSpy).toHaveBeenCalledWith("Hiba történt a törléskor.");
  });
});