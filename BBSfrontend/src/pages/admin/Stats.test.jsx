import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Stats from "./Stats";
import api from "../../api/axios";

jest.mock("../../api/axios");

jest.mock("recharts", () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    BarChart: ({ children }) => <div>{children}</div>,
    Bar: ({ children }) => <div>{children}</div>,
    XAxis: () => <div />,
    YAxis: () => <div />,
    Tooltip: () => <div />,
    CartesianGrid: () => <div />,
    LabelList: () => <div />,
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("Stats oldal", () => {
    const mockData = {
        customers: {
            total: 100,
            returning: 60,
            active: 50,
            new_this_month: 10,
        },
        financial: {
            total_revenue: 500000,
            revenue_365: 400000,
            revenue_month: 50000,
            daily_avg: 15000,
        },
        treatments: {
            total: 300,
            last_30_days: 40,
            daily_avg: 2,
            avg_services: 3,
        },
        charts: {
            new_customers: [],
            treatments: [],
            revenue: [],
            avg_cart: [],
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();

        api.get.mockImplementation(() =>
            Promise.resolve({ data: mockData })
        );
    });

    test("loading megjelenik", async () => {
        render(<Stats />);

        await waitFor(() => {
            expect(screen.getByText("Statisztikák")).toBeInTheDocument();
        });
    });

    test("adatok megjelennek API után", async () => {
        render(<Stats />);

        await screen.findByText("Statisztikák");

        expect(screen.getByText("Ügyfél Statisztikák")).toBeInTheDocument();
        expect(screen.getByText("Pénzügyi Statisztikák")).toBeInTheDocument();
        expect(screen.getByText("Kezelés Statisztikák")).toBeInTheDocument();
    });

    test("stat kártyák renderelődnek", async () => {
        render(<Stats />);

        await screen.findByText("Összes ügyfél");

        expect(screen.getByText("100 fő")).toBeInTheDocument();
        expect(screen.getByText("60 fő")).toBeInTheDocument();
        expect(screen.getByText("300 db")).toBeInTheDocument();
    });

    test("hiba eset fallback jelenik meg", async () => {
        api.get.mockImplementationOnce(() => Promise.reject());

        render(<Stats />);

        await waitFor(() =>
            expect(
                screen.getByText("Nem sikerült betölteni az adatokat.")
            ).toBeInTheDocument()
        );
    });
});