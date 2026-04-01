import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomerModal from "./CustomerModal";
import api from "../api/axios";

jest.mock("../api/axios");

describe("CustomerModal", () => {
  const onHide = jest.fn();
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModal = () =>
    render(<CustomerModal show={true} onHide={onHide} onSuccess={onSuccess} />);

  const fillForm = async () => {
    await userEvent.type(screen.getByLabelText(/email/i), "teszt@test.hu");
    await userEvent.type(screen.getByLabelText(/password/i), "12345678");
    await userEvent.type(screen.getByLabelText(/name/i), "Teszt Elek");
    await userEvent.type(screen.getByLabelText(/phone/i), "123456789");
  };

  test("megjelenik ha show=true", () => {
    renderModal();
    expect(screen.getByText("Új ügyfél hozzáadása")).toBeInTheDocument();
  });

  test("validáció működik (üres submit)", async () => {
    renderModal();

    await userEvent.click(screen.getByText("Mentés"));

    expect(await screen.findByText("Érvényes email kötelező.")).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  test("sikeres mentés működik", async () => {
    api.post.mockResolvedValue({});

    renderModal();

    await fillForm();
    await userEvent.click(screen.getByText("Mentés"));

    expect(api.post).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  test("hiba eset toast megjelenik", async () => {
    api.post.mockRejectedValue({
      response: { data: { message: "Hiba történt" } },
    });

    renderModal();

    await fillForm();
    await userEvent.click(screen.getByText("Mentés"));

    expect(await screen.findByText("Hiba történt")).toBeInTheDocument();
  });
});