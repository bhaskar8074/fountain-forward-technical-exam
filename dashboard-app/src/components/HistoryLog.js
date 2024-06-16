import React, { useEffect, useState } from "react";

// Function to aggregate and process the data
const aggregateData = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString();

    // Initialize the date group if it doesn't exist
    if (!acc[date]) {
      acc[date] = {
        date,
        new_inventory: 0,
        new_total_msrp: 0,
        new_average_msrp: 0,
        used_inventory: 0,
        used_total_msrp: 0,
        used_average_msrp: 0,
        new_count: 0,
        used_count: 0,
      };
    }

    // Convert price from string to number
    const price = parseFloat(item.price.replace(' USD', ''));

    // Update the aggregated data
    if (item.condition === 'new') {
      acc[date].new_inventory += 1;
      acc[date].new_total_msrp += price;
      acc[date].new_count += 1;
    } else {
      acc[date].used_inventory += 1;
      acc[date].used_total_msrp += price;
      acc[date].used_count += 1;
    }

    return acc;
  }, {});

  // Calculate averages
  Object.keys(groupedData).forEach((date) => {
    const entry = groupedData[date];
    if (entry.new_inventory > 0) {
      entry.new_average_msrp = entry.new_total_msrp / entry.new_count;
    }
    if (entry.used_inventory > 0) {
      entry.used_average_msrp = entry.used_total_msrp / entry.used_count;
    }
  });

  return Object.values(groupedData);
};

const HistoryLog = ({
  filteredData,
  currentPage,
  rowsPerPage,
  handleNextPage,
  handlePreviousPage,
  handleRowsPerPageChange,
  totalPages,
}) => {
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    setTransformedData(aggregateData(filteredData));
  }, [filteredData]);

  const displayedData = transformedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="history-log">
      <h2>History Log</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>New Inventory</th>
            <th>New Total MSRP</th>
            <th>New Average MSRP</th>
            <th>Used Inventory</th>
            <th>Used Total MSRP</th>
            <th>Used Average MSRP</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.new_inventory}</td>
              <td>${item.new_total_msrp.toFixed(2)}</td>
              <td>${item.new_average_msrp.toFixed(2)}</td>
              <td>{item.used_inventory}</td>
              <td>${item.used_total_msrp.toFixed(2)}</td>
              <td>${item.used_average_msrp.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <div className="pagination-controls">
          <label htmlFor="rows-per-page">Rows per page:</label>
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HistoryLog;
