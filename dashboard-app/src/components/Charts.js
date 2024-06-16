import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = ({ inventoryCountData, averageMsrpData, handleChartFilterChange }) => {
  return (
    <>
      <div className="chart-container">
        <h2>Inventory Count</h2>
        <div className="chart-buttons">
          <button onClick={() => handleChartFilterChange("new")}>NEW</button>
          <button onClick={() => handleChartFilterChange("used")}>USED</button>
          <button onClick={() => handleChartFilterChange("cpo")}>CPO</button>
        </div>
        <div className="chart-wrapper">
          <Bar
            data={inventoryCountData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { ticks: { autoSkip: false } },
              },
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Inventory Count Over Time" },
              },
            }}
          />
        </div>
      </div>
      <div className="chart-container">
        <h2>Average MSRP (USD)</h2>
        <div className="chart-buttons">
          <button onClick={() => handleChartFilterChange("new")}>NEW</button>
          <button onClick={() => handleChartFilterChange("used")}>USED</button>
          <button onClick={() => handleChartFilterChange("cpo")}>CPO</button>
        </div>
        <div className="chart-wrapper">
          <Bar
            data={averageMsrpData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { ticks: { autoSkip: false } },
              },
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Average MSRP Over Time" },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Charts;
