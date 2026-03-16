import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminHome from "./AdminHome";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../api/axios", () => ({
    get: jest.fn(),
}));

jest.mock("../../context/LoadingContext", () => ({
    useLoading: () => ({ setLoading: jest.fn() }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

import api from "../../api/axios";

beforeEach(() => {
    jest.clearAllMocks();

    api.get
        .mockResolvedValueOnce({
            data: {
                totalClients: 10,
                activeClients: 5,
                monthlyRevenue: 20000,
                monthlyTreatments: 12,
            },
        })
        .mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    date: "2026-03-01T00:00:00",
                    client: "Kiss Anna",
                    service: "Műkörömépítés",
                    price: 5000,
                },
            ],
        })
        .mockResolvedValue({ data: [] });
});

describe("AdminHome komponens", () => {

    test("statisztikák megjelennek API után", async () => {

        api.get
            .mockResolvedValueOnce({
                data: {
                    totalClients: 10,
                    activeClients: 5,
                    monthlyRevenue: 20000,
                    monthlyTreatments: 12,
                },
            })
            .mockResolvedValueOnce({ data: [] });

        render(
            <MemoryRouter>
                <AdminHome />
            </MemoryRouter>
        );

        expect(await screen.findByText("Összes ügyfél")).toBeInTheDocument();

        expect(await screen.findByText("10")).toBeInTheDocument();
        expect(await screen.findByText("5")).toBeInTheDocument();
        expect(await screen.findByText("20 000 Ft")).toBeInTheDocument();
        expect(await screen.findByText("12")).toBeInTheDocument();
    });

    test("recent kezelések megjelennek", async () => {

        api.get
            .mockResolvedValueOnce({
                data: { totalClients: 1, activeClients: 1, monthlyRevenue: 1, monthlyTreatments: 1 },
            })
            .mockResolvedValueOnce({
                data: [
                    { id: 1, date: "2026-03-01T00:00:00", client: "Teszt Elek", service: "Hajvágás", price: 5000 },
                ],
            });

        render(
            <MemoryRouter>
                <AdminHome />
            </MemoryRouter>
        );

        expect(await screen.findByText("Teszt Elek")).toBeInTheDocument();
        expect(screen.getByText("Hajvágás")).toBeInTheDocument();
    });

    test("összes kezelés gomb navigál", async () => {

        api.get
            .mockResolvedValueOnce({
                data: { totalClients: 1, activeClients: 1, monthlyRevenue: 1, monthlyTreatments: 1 },
            })
            .mockResolvedValueOnce({ data: [] });

        render(
            <MemoryRouter>
                <AdminHome />
            </MemoryRouter>
        );

        const btn = await screen.findByText("Összes kezelés");

        await userEvent.click(btn);

        expect(mockNavigate).toHaveBeenCalledWith("/admin/treatments");
    });

    test("modalok megnyílnak kattintásra", async () => {

        api.get
            .mockResolvedValueOnce({
                data: { totalClients: 1, activeClients: 1, monthlyRevenue: 1, monthlyTreatments: 1 },
            })
            .mockResolvedValueOnce({ data: [] })
            .mockResolvedValue({ data: [] });

        render(
            <MemoryRouter>
                <AdminHome />
            </MemoryRouter>
        );

        const btn = await screen.findByText("+ Új kezelés");

        await userEvent.click(btn);

        expect(await screen.findByText("Új kezelés hozzáadása")).toBeInTheDocument();
    });

});