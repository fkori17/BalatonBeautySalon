import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

    test("megjelenik a modal", async () => {
        api.get
            .mockResolvedValueOnce({ data: customers })
            .mockResolvedValueOnce({ data: services });

        render(
            <TreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
            />
        );

        expect(await screen.findByText("Új kezelés hozzáadása")).toBeInTheDocument();
    });

    test("betölti az adatokat (customers + services)", async () => {
        api.get
            .mockResolvedValueOnce({ data: customers })
            .mockResolvedValueOnce({ data: services });

        render(
            <TreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
            />
        );

        expect(await screen.findByText(/Teszt Anna/)).toBeInTheDocument();
        expect(await screen.findByText(/Géllakkozás/)).toBeInTheDocument();
    });

    test("validáció működik (nincs customer + service)", async () => {
        api.get
            .mockResolvedValueOnce({ data: customers })
            .mockResolvedValueOnce({ data: services });

        render(
            <TreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
            />
        );

        await screen.findByText(/Új kezelés hozzáadása/);

        const submitBtn = await screen.findByRole("button", { name: /mentés/i });
        fireEvent.click(submitBtn);

        expect(
            await screen.findByText("Ügyfél kiválasztása kötelező.")
        ).toBeInTheDocument();
    });

    test("service hozzáadás működik", async () => {
        api.get
            .mockResolvedValueOnce({ data: customers })
            .mockResolvedValueOnce({ data: services });

        render(
            <TreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
            />
        );

        fireEvent.click(await screen.findByText(/Géllakkozás/));

        expect(await screen.findByText("3000 Ft")).toBeInTheDocument();
    });

    test("sikeres mentés működik", async () => {
        api.get
            .mockResolvedValueOnce({ data: customers })
            .mockResolvedValueOnce({ data: services });

        api.post.mockResolvedValue({});

        render(
            <TreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
            />
        );

        fireEvent.click(await screen.findByText(/Teszt Anna/));

        fireEvent.click(screen.getByText(/Géllakkozás/));

        fireEvent.click(await screen.findByRole("button", { name: /mentés/i }));

        await waitFor(() => expect(api.post).toHaveBeenCalled());

        expect(onHide).toHaveBeenCalled();
        expect(onSuccess).toHaveBeenCalled();
    });

    test("loading spinner megjelenik", async () => {
        api.get.mockImplementation(() => new Promise(() => { }));

        render(<TreatmentModal show={true} onHide={onHide} onSuccess={onSuccess} />);

        expect(
            await screen.findByText((_, el) =>
                el?.classList.contains("spinner-border")
            )
        ).toBeInTheDocument();
    });
});