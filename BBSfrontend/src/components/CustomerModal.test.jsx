import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomerModal from "./CustomerModal";
import api from "../api/axios";

jest.mock("../api/axios");

describe("CustomerModal", () => {
    const onHide = jest.fn();
    const onSuccess = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("megjelenik ha show=true", () => {
        render(<CustomerModal show={true} onHide={onHide} onSuccess={onSuccess} />);
        expect(screen.getByText("Új ügyfél hozzáadása")).toBeInTheDocument();
    });

    test("validáció működik (üres submit)", async () => {
        render(<CustomerModal show={true} onHide={onHide} onSuccess={onSuccess} />);

        fireEvent.click(screen.getByText("Mentés"));

        expect(await screen.findByText("Érvényes email kötelező.")).toBeInTheDocument();
    });

    test("sikeres mentés működik", async () => {
        api.post.mockResolvedValue({});

        render(<CustomerModal show={true} onHide={onHide} onSuccess={onSuccess} />);

        const email = document.querySelector('input[name="email"]');
        const password = document.querySelector('input[name="password"]');
        const name = document.querySelector('input[name="name"]');
        const phone = document.querySelector('input[name="phone"]');

        fireEvent.change(email, { target: { value: "teszt@test.hu" } });
        fireEvent.change(password, { target: { value: "12345678" } });
        fireEvent.change(name, { target: { value: "Teszt Elek" } });
        fireEvent.change(phone, { target: { value: "123456789" } });
        fireEvent.click(screen.getByText("Mentés"));

        await waitFor(() => expect(api.post).toHaveBeenCalled());

        expect(onSuccess).toHaveBeenCalled();
    });

    test("hiba eset toast megjelenik", async () => {
        api.post.mockRejectedValue({
            response: { data: { message: "Hiba történt" } },
        });

        render(<CustomerModal show={true} onHide={onHide} onSuccess={onSuccess} />);

        const email = document.querySelector('input[name="email"]');
        const password = document.querySelector('input[name="password"]');
        const name = document.querySelector('input[name="name"]');
        const phone = document.querySelector('input[name="phone"]');

        fireEvent.change(email, { target: { value: "teszt@test.hu" } });
        fireEvent.change(password, { target: { value: "12345678" } });
        fireEvent.change(name, { target: { value: "Teszt Elek" } });
        fireEvent.change(phone, { target: { value: "123456789" } });

        fireEvent.click(screen.getByText("Mentés"));

        expect(await screen.findByText("Hiba történt")).toBeInTheDocument();
    });
});