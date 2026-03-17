import React from "react";
import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard", () => {

  test("megjelenik a title", () => {
    render(<StatCard title="Összes kezelés" value="25" />);

    expect(screen.getByText("Összes kezelés")).toBeInTheDocument();
  });

  test("megjelenik a value", () => {
    render(<StatCard title="Teszt" value="99" />);

    expect(screen.getByText("99")).toBeInTheDocument();
  });

});