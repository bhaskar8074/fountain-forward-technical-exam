import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Charts from "../components/Charts";
import { Bar } from "react-chartjs-2";

jest.mock("react-chartjs-2", () => ({
  Bar: jest.fn(() => <div>Mocked Bar Chart</div>),
}));

describe("Charts Component", () => {
  const mockInventoryCountData = {
    labels: ["January", "February", "March"],
    datasets: [{ label: "Inventory Count", data: [10, 20, 30] }],
  };

  const mockAverageMsrpData = {
    labels: ["January", "February", "March"],
    datasets: [{ label: "Average MSRP", data: [30000, 35000, 40000] }],
  };

  const mockHandleChartFilterChange = jest.fn();

  test("renders the component with correct elements", () => {
    render(
      <Charts
        inventoryCountData={mockInventoryCountData}
        averageMsrpData={mockAverageMsrpData}
        handleChartFilterChange={mockHandleChartFilterChange}
      />
    );

    expect(screen.getByText("Inventory Count")).toBeInTheDocument();
    expect(screen.getByText("Average MSRP (USD)")).toBeInTheDocument();

    const newButtons = screen.getAllByText("NEW");
    const usedButtons = screen.getAllByText("USED");
    const cpoButtons = screen.getAllByText("CPO");

    expect(newButtons).toHaveLength(2);
    expect(usedButtons).toHaveLength(2);
    expect(cpoButtons).toHaveLength(2);

    expect(screen.getAllByText("Mocked Bar Chart")).toHaveLength(2);
  });

  test("calls handleChartFilterChange with correct parameters when buttons are clicked", () => {
    render(
      <Charts
        inventoryCountData={mockInventoryCountData}
        averageMsrpData={mockAverageMsrpData}
        handleChartFilterChange={mockHandleChartFilterChange}
      />
    );

    fireEvent.click(screen.getAllByText("NEW")[0]);
    expect(mockHandleChartFilterChange).toHaveBeenCalledWith("new");

    fireEvent.click(screen.getAllByText("USED")[1]);
    expect(mockHandleChartFilterChange).toHaveBeenCalledWith("used");

    fireEvent.click(screen.getAllByText("CPO")[0]);
    expect(mockHandleChartFilterChange).toHaveBeenCalledWith("cpo");

    expect(mockHandleChartFilterChange).toHaveBeenCalledTimes(3);
  });
});
