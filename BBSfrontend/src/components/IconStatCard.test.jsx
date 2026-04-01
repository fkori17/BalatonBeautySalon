import React from "react";
import { render, screen } from "@testing-library/react";
import IconStatCard from "./IconStatCard";

const MockIcon = () => <svg data-testid="mock-icon" />;

describe("IconStatCard", () => {
  test("megjeleníti az értéket, címet és ikont", () => {
    render(<IconStatCard icon={MockIcon} value="25" title="Teszt cím" />);

    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("Teszt cím")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  test("számként kapott value-t is megjeleníti", () => {
    render(<IconStatCard icon={MockIcon} value={42} title="Szám teszt" />);

    expect(screen.getByText("42")).toBeInTheDocument();
  });

  test("nem törik el ha nincs icon", () => {
    render(<IconStatCard value="10" title="Ikon nélkül" />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Ikon nélkül")).toBeInTheDocument();
  });
});