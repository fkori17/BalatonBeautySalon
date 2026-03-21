import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Treatments from "./Treatments";
import api from "../../api/axios";

jest.mock("../../api/axios");

jest.mock("../../context/LoadingContext", () => ({
  useLoading: () => ({
    setLoading: jest.fn(),
  }),
}));

const renderTreatments = () => render(<Treatments />);

describe("Treatments komponens", () => {

  const mockTreatments = [
    {
      id: 1,
      created_at: "2024-05-10T10:00:00Z",
      description: "Első teszt kezelés",
      services: [
        { name: "Hajvágás", piece: 1 },
        { name: "Szakáll igazítás", piece: 2 },
      ],
    },
  ];

  beforeEach(() => {

    jest.clearAllMocks();

    api.get.mockResolvedValue({
      data: mockTreatments,
    });

  });

  test("megjeleníti kezeléseket", async () => {

    renderTreatments();

    expect(await screen.findByText(/2024/)).toBeInTheDocument();

    expect(
      screen.getByText(/Hajvágás/i)
    ).toBeInTheDocument();

  });

  test("modal megnyílik", async () => {

    renderTreatments();

    fireEvent.click(
      await screen.findByTitle(/részletek/i)
    );

    expect(
      await screen.findByText(/kezelés részletei/i)
    ).toBeInTheDocument();

  });

  test("modal bezárható", async () => {

    renderTreatments();

    fireEvent.click(
      await screen.findByTitle(/részletek/i)
    );

    fireEvent.click(
      screen.getByText(/bezárás/i)
    );

    await waitFor(() => {

      expect(
        screen.queryByText(/kezelés részletei/i)
      ).not.toBeInTheDocument();

    });

  });

  test("kezeli ha nincs service", async () => {

    api.get.mockResolvedValue({
      data: [
        {
          id: 2,
          created_at: "2024-05-11",
          services: [],
        },
      ],
    });

    renderTreatments();

    expect(await screen.findAllByText("-")).not.toHaveLength(0);

  });

});