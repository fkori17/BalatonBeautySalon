import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteCustomerModal from "./DeleteCustomerModal";

describe("DeleteCustomerModal", () => {
  const onHide = jest.fn();
  const onConfirm = jest.fn();

  const customer = {
    id: 1,
    name: "Teszt Elek",
    email: "teszt@test.hu",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModal = (props = {}) =>
    render(
      <DeleteCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onConfirm={onConfirm}
        {...props}
      />
    );

  test("megjelenik ha van customer", () => {
    renderModal();

    expect(screen.getByText("Ügyfél törlése")).toBeInTheDocument();
    expect(screen.getByText("Teszt Elek")).toBeInTheDocument();
    expect(screen.getByText("teszt@test.hu")).toBeInTheDocument();
  });

  test("nem jelenik meg ha nincs customer", () => {
    renderModal({ customer: null });

    expect(screen.queryByText("Ügyfél törlése")).not.toBeInTheDocument();
  });

  test("Mégse gomb működik", async () => {
    renderModal();

    await userEvent.click(screen.getByRole("button", { name: /mégse/i }));

    expect(onHide).toHaveBeenCalledTimes(1);
  });

  test("Törlés gomb meghívja onConfirm-ot", async () => {
    renderModal();

    await userEvent.click(screen.getByRole("button", { name: /törlés/i }));

    expect(onConfirm).toHaveBeenCalledWith(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});