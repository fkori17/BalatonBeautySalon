import React from "react";
import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard", () => {

  test("megjeleníti a címet és az értéket", () => {
    render(<StatCard title="Összes kezelés" value="25" />);

    expect(screen.getByText("Összes kezelés")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  test("számként kapott value-t is kezeli", () => {
    render(<StatCard title="Teszt" value={42} />);

    expect(screen.getByText("42")).toBeInTheDocument();
  });

});