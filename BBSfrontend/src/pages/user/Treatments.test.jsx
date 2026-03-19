import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Treatments from "./Treatments";
import api from "../../api/axios";
import { LoadingContext } from "../../context/LoadingContext";

jest.mock("../../api/axios");

const renderTreatments = () => {
  const setLoading = jest.fn();
  return render(
    <LoadingContext.Provider value={{ setLoading }}>
      <Treatments />
    </LoadingContext.Provider>
  );
};

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
    api.get.mockResolvedValue({ data: mockTreatments });
  });

  test("megjeleníti a kezelések listáját az API-ból", async () => {
    renderTreatments();
    expect(await screen.findByText("2024. 05. 10.")).toBeInTheDocument();
    
    expect(screen.getByText("Hajvágás, Szakáll igazítás (2x)")).toBeInTheDocument();

    expect(screen.getByText("Első teszt kezelés")).toBeInTheDocument();
  });

  test("megnyílik a modal a részletek gombra kattintva", async () => {
    renderTreatments();
    const detailsBtn = await screen.findByTitle("Részletek megtekintése");
    fireEvent.click(detailsBtn);
    expect(screen.getByText("Kezelés részletei")).toBeInTheDocument();
    const modalDate = screen.getAllByText("2024. 05. 10.");
    expect(modalDate.length).toBeGreaterThan(0);
  });

  test("bezáródik a modal a Bezárás gombra kattintva", async () => {
    renderTreatments();
    
    const detailsBtn = await screen.findByTitle("Részletek megtekintése");
    fireEvent.click(detailsBtn);

    const closeBtn = screen.getByText("Bezárás");
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByText("Kezelés részletei")).not.toBeInTheDocument();
    });
  });

  test("helyesen kezeli, ha nincsenek szolgáltatások", async () => {
    api.get.mockResolvedValue({ 
      data: [{ id: 2, created_at: "2024-05-11T10:00:00Z", services: [] }] 
    });
    
    renderTreatments();
    
    expect(await screen.findByText("-")).toBeInTheDocument();
  });
});