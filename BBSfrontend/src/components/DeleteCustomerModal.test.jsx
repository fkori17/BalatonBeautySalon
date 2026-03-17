import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  test("megjelenik ha van customer", () => {
    render(
      <DeleteCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onConfirm={onConfirm}
      />
    );

    expect(screen.getByText("Ügyfél törlése")).toBeInTheDocument();
    expect(screen.getByText("Teszt Elek")).toBeInTheDocument();
    expect(screen.getByText("teszt@test.hu")).toBeInTheDocument();
  });

  test("nem jelenik meg ha nincs customer", () => {
    const { container } = render(
      <DeleteCustomerModal
        show={true}
        onHide={onHide}
        customer={null}
        onConfirm={onConfirm}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test("Mégse gomb működik", () => {
    render(
      <DeleteCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(screen.getByText("Mégse"));

    expect(onHide).toHaveBeenCalled();
  });

  test("Törlés gomb meghívja onConfirm-ot", () => {
    render(
      <DeleteCustomerModal
        show={true}
        onHide={onHide}
        customer={customer}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(screen.getByText("Törlés"));

    expect(onConfirm).toHaveBeenCalledWith(1);
  });
});