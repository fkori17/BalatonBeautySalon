import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

    test("megjelenik", () => {
        render(
            <DeleteTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        expect(screen.getByText("Kezelés törlése")).toBeInTheDocument();
        expect(screen.getByText(/Teszt Elek/)).toBeInTheDocument();
    });

    test("Mégse működik", () => {
        render(
            <DeleteTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        fireEvent.click(screen.getByText("Mégse"));

        expect(onHide).toHaveBeenCalled();
    });

    test("sikeres törlés működik", async () => {
        api.delete.mockResolvedValue({});

        render(
            <DeleteTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        fireEvent.click(screen.getByText("Végleges törlés"));

        await waitFor(() => expect(api.delete).toHaveBeenCalled());

        expect(onSuccess).toHaveBeenCalledWith("Kezelés sikeresen törölve!");
        expect(onHide).toHaveBeenCalled();
    });

    test("loading spinner megjelenik", async () => {
        api.delete.mockImplementation(() => new Promise(() => { }));

        render(
            <DeleteTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        fireEvent.click(screen.getByText("Végleges törlés"));

        expect(
            await screen.findByText((_, el) =>
                el?.classList.contains("spinner-border")
            )
        ).toBeInTheDocument();
    });

    test("hiba eset alert", async () => {
        window.alert = jest.fn();
        api.delete.mockRejectedValue({});

        render(
            <DeleteTreatmentModal
                show={true}
                onHide={onHide}
                onSuccess={onSuccess}
                treatment={treatment}
            />
        );

        fireEvent.click(screen.getByText("Végleges törlés"));

        await waitFor(() =>
            expect(window.alert).toHaveBeenCalledWith("Hiba történt a törléskor.")
        );
    });
});