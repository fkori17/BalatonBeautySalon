import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Treatments from "./Treatments";
import api from "../../api/axios";

jest.mock("../../api/axios");

jest.mock("../../components/TreatmentModal", () => () => <div />);
jest.mock("../../components/EditTreatmentModal", () => ({ show }) =>
    show ? <div>Edit modal</div> : null
);
jest.mock("../../components/DeleteTreatmentModal", () => ({ show }) =>
    show ? <div>Delete modal</div> : null
);

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe("Treatments oldal", () => {
    const mockTreatments = [
        {
            id: 1,
            customer: "Teszt Anna",
            date: "2026-03-01",
            services: [{ name: "Géllakkozás", piece: 1 }],
            realprice: 5000,
            description: "Megjegyzés 1",
        },
        {
            id: 2,
            customer: "Teszt Béla",
            date: "2026-03-02",
            services: [{ name: "Műköröm", piece: 2 }],
            realprice: 8000,
            description: "",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        api.get.mockResolvedValue({ data: mockTreatments });
    });

    test("loading spinner megjelenik", () => {
        render(<Treatments />);

        expect(document.querySelector(".spinner-border")).toBeInTheDocument();
    });

    test("kezelések megjelennek betöltés után", async () => {
        render(<Treatments />);

        await screen.findByText("Teszt Anna");

        expect(screen.getByText("Teszt Anna")).toBeInTheDocument();
        expect(screen.getByText("Teszt Béla")).toBeInTheDocument();
    });

    test("keresés működik", async () => {
        render(<Treatments />);

        await screen.findByText("Teszt Anna");

        const input = screen.getByPlaceholderText("Keresés ügyfél név alapján…");

        fireEvent.change(input, { target: { value: "Anna" } });

        expect(screen.getByText("Teszt Anna")).toBeInTheDocument();
        expect(screen.queryByText("Teszt Béla")).not.toBeInTheDocument();
    });

    test("edit gomb megnyitja modalt", async () => {
        render(<Treatments />);

        await screen.findByText("Teszt Anna");

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[1]);

        expect(screen.getByText("Edit modal")).toBeInTheDocument();
    });

    test("delete gomb megnyitja modalt", async () => {
        render(<Treatments />);

        await screen.findByText("Teszt Anna");

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[2]);

        expect(screen.getByText("Delete modal")).toBeInTheDocument();
    });
});