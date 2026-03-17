import React from "react";
import { render, screen } from "@testing-library/react";
import IconStatCard from "./IconStatCard";

const MockIcon = () => <svg data-testid="mock-icon" />;

describe("IconStatCard", () => {
  test("megjelenik az érték", () => {
    render(<IconStatCard icon={MockIcon} value="25" title="Teszt cím" />);

    expect(screen.getByText("25")).toBeInTheDocument();
  });

  test("megjelenik a title", () => {
    render(<IconStatCard icon={MockIcon} value="10" title="Felhasználók" />);

    expect(screen.getByText("Felhasználók")).toBeInTheDocument();
  });

  test("icon megjelenik", () => {
    render(<IconStatCard icon={MockIcon} value="5" title="Statisztika" />);

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  test("minden prop együtt működik", () => {
    render(<IconStatCard icon={MockIcon} value="99" title="Összesen" />);

    expect(screen.getByText("99")).toBeInTheDocument();
    expect(screen.getByText("Összesen")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });
});