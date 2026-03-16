import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Customers from "./Customers";
import api from "../../api/axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../api/axios");

jest.mock("../../components/CustomerModal", () => () => <div />);
jest.mock("../../components/EditCustomerModal", () => () => <div />);
jest.mock("../../components/DeleteCustomerModal", () => ({ show }) =>
    show ? <div>Törlés modal</div> : null
);

describe("Customers oldal", () => {
    const mockCustomers = [
        {
            id: 1,
            name: "Teszt Anna",
            email: "anna@test.hu",
            loyal: true,
            created_at: "2026-03-01T00:00:00",
            phone: "123456",
        },
        {
            id: 2,
            name: "Teszt Béla",
            email: "bela@test.hu",
            loyal: false,
            created_at: "2026-03-02T00:00:00",
            phone: "654321",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        api.get.mockResolvedValue({ data: mockCustomers });
    });

    test("betöltés felirat működik", async () => {
        render(
            <MemoryRouter>
                <Customers />
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.queryByText("Betöltés...")).not.toBeInTheDocument()
        );
    });

    test("ügyfelek megjelennek API után", async () => {
        render(
            <MemoryRouter>
                <Customers />
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.queryByText("Betöltés...")).not.toBeInTheDocument()
        );

        expect(screen.getByText("Teszt Anna")).toBeInTheDocument();
        expect(screen.getByText("Teszt Béla")).toBeInTheDocument();
    });
    test("keresés működik", async () => {
        render(
            <MemoryRouter>
                <Customers />
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.queryByText("Betöltés...")).not.toBeInTheDocument()
        );

        const input = screen.getByPlaceholderText("Keresés név vagy email alapján…");

        fireEvent.change(input, { target: { value: "Anna" } });

        expect(screen.getByText("Teszt Anna")).toBeInTheDocument();
        expect(screen.queryByText("Teszt Béla")).not.toBeInTheDocument();
    });

    test("törlés gomb megnyitja modált", async () => {
        render(
            <MemoryRouter>
                <Customers />
            </MemoryRouter>
        );

        await screen.findByText("Teszt Anna");

        const deleteButtons = screen.getAllByRole("button");
        fireEvent.click(deleteButtons[2]);

        expect(screen.getByText("Törlés modal")).toBeInTheDocument();
    });
});