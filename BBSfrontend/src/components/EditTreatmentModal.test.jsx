import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditTreatmentModal from "./EditTreatmentModal";
import api from "../api/axios";

jest.mock("../api/axios");

describe("EditTreatmentModal", () => {
    const onHide = jest.fn();
    const onSuccess = jest.fn();

    const treatment = {
        id: 1,
        customer: "Teszt Elek",
        description: "régi megjegyzés",
        realprice: 5000,
        services: [{ id: 1, name: "Hajvágás", price: 3000, piece: 1 }],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    test("megjelenik a modal", async () => {
        api.get.mockResolvedValue({ data: [] });

        render(
            <EditTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        expect(await screen.findByText("Kezelés szerkesztése")).toBeInTheDocument();
        expect(screen.getByText("Teszt Elek")).toBeInTheDocument();
    });

    test("betölti a treatment adatokat", async () => {
        api.get.mockResolvedValue({ data: [] });

        render(
            <EditTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        expect(await screen.findByDisplayValue("régi megjegyzés")).toBeInTheDocument();
        expect(screen.getByDisplayValue("3000")).toBeInTheDocument();
    });

    test("validáció működik (nincs service)", async () => {
        api.get.mockResolvedValue({ data: [] });
        window.alert = jest.fn();

        render(
            <EditTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={{ ...treatment, services: [] }}
            />
        );

        await screen.findByText("Kezelés szerkesztése");

        fireEvent.click(screen.getByRole("button", { name: /mentés/i }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalled();
        });
    });

    test("sikeres mentés működik", async () => {
        api.get.mockResolvedValue({ data: [] });
        api.put.mockResolvedValue({});

        render(
            <EditTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        await screen.findByText("Kezelés szerkesztése");

        fireEvent.click(screen.getByRole("button", { name: /mentés/i }));

        await waitFor(() => expect(api.put).toHaveBeenCalled());

        expect(onSuccess).toHaveBeenCalled();
        expect(onHide).toHaveBeenCalled();
    });

    test("loading spinner megjelenik", async () => {
        api.get.mockResolvedValue({ data: [] });

        api.put.mockImplementation(() => new Promise(() => { }));

        render(
            <EditTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        await screen.findByText("Kezelés szerkesztése");

        fireEvent.click(screen.getByRole("button", { name: /mentés/i }));

        await waitFor(() => {
            expect(document.querySelector(".spinner-border")).toBeInTheDocument();
        });
    });

    test("hiba eset alert", async () => {
        api.get.mockResolvedValue({ data: [] });
        api.put.mockRejectedValue({});

        window.alert = jest.fn();

        render(
            <EditTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        await screen.findByText("Kezelés szerkesztése");

        fireEvent.submit(document.querySelector("form"));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalled();
        });
    });
});