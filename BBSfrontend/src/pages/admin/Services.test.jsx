import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Services from "./Services";
import api from "../../api/axios";

jest.mock("../../api/axios");

jest.mock("../../components/ServiceModal", () => ({ show }) =>
    show ? <div>Modal nyitva</div> : null
);

describe("Services oldal", () => {
    const mockServices = [
        { id: 1, name: "Műkörömépítés", price: 5000, active: true },
        { id: 2, name: "Géllakkozás", price: 12000, active: false },
    ];

    beforeEach(() => {
        jest.clearAllMocks();

        api.get.mockImplementation(() =>
            Promise.resolve({ data: mockServices })
        );

        api.patch.mockImplementation(() =>
            Promise.resolve({ data: { active: false } })
        );
    });

    test("loading spinner megjelenik", async () => {
        render(<Services />);

        expect(document.querySelector(".spinner-border")).toBeInTheDocument();

        await waitFor(() =>
            expect(document.querySelector(".spinner-border")).not.toBeInTheDocument()
        );
    });

    test("szolgáltatások megjelennek betöltés után", async () => {
        render(<Services />);

        await screen.findByText("Műkörömépítés");

        expect(screen.getByText("Géllakkozás")).toBeInTheDocument();
    });

    test("aktív és inaktív külön jelenik meg", async () => {
        render(<Services />);

        await screen.findByText("Műkörömépítés");

        expect(screen.getByText("Aktív szolgáltatások")).toBeInTheDocument();
        expect(screen.getByText("Inaktív szolgáltatások")).toBeInTheDocument();
    });

    test("toggle működik", async () => {
        render(<Services />);

        await screen.findByText("Műkörömépítés");

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[2]);

        await waitFor(() =>
            expect(api.patch).toHaveBeenCalledWith("/admin/services/1/toggle")
        );
    });

    test("edit gomb megnyitja modalt", async () => {
        render(<Services />);

        await screen.findByText("Műkörömépítés");

        const editButtons = screen.getAllByTitle("Szerkesztés");
        fireEvent.click(editButtons[0]);

        expect(screen.getByText("Modal nyitva")).toBeInTheDocument();
    });
});