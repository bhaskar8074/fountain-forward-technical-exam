import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchData,
  setConditionFilter,
  setDurationFilter,
  setCurrentPage,
  setRowsPerPage,
  setChartFilter,
  applyFilters,
} from './redux/inventorySlice';
import DashboardCards from './components/DashboardCards';
import Charts from './components/Charts';
import HistoryLog from './components/HistoryLog';
import Navbar from './components/Navbar';
import FilterSection from './components/FilterSection'; // Import the new FilterSection
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const {
    data, // Use this for unfiltered data
    filteredData,
    conditionFilter,
    durationFilter,
    currentPage,
    rowsPerPage,
    chartFilter,
  } = useSelector((state) => state.inventory);

  // State for managing filter sidebar visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // State for managing selected dealer
  const [selectedDealer, setSelectedDealer] = useState('');

  // Initial application of filters to include all conditions and durations
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch, conditionFilter, durationFilter]); // Apply filters when these change

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Use `data` for initial unfiltered display
  const getInventoryCount = (type) => {
    return data.filter((item) => item.condition === type).length;
  };

  const getAverageMSRP = (type) => {
    const items = data.filter((item) => item.condition === type);
    if (items.length === 0) return 0;
    const totalMSRP = items.reduce(
      (sum, item) => sum + parseFloat(item.price.replace(' USD', '')),
      0
    );
    return (totalMSRP / items.length).toFixed(2);
  };

  const getTotalInventoryCount = () => {
    return data.length;
  };

  const getTotalAverageMSRP = () => {
    if (data.length === 0) return 0;
    const totalMSRP = data.reduce(
      (sum, item) => sum + parseFloat(item.price.replace(' USD', '')),
      0
    );
    return (totalMSRP / data.length).toFixed(2);
  };

  const getChartData = () => {
    const dateCounts = {};
    const dateMsrps = {};

    filteredData.forEach((item) => {
      const date = new Date(item.timestamp);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const intervalStartDay = Math.floor((day - 1) / 10) * 10 + 1;
      const intervalStart = new Date(year, month, intervalStartDay);
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(intervalStartDay).padStart(2, '0')}`;

      if (!dateCounts[formattedDate]) {
        dateCounts[formattedDate] = 0;
        dateMsrps[formattedDate] = [];
      }

      dateCounts[formattedDate]++;
      dateMsrps[formattedDate].push(parseFloat(item.price.replace(' USD', '')));
    });

    const labels = Object.keys(dateCounts);
    labels.sort((a, b) => new Date(a) - new Date(b));

    const inventoryCount = labels.map((label) => dateCounts[label]);
    const averageMsrp = labels.map((label) => {
      const totalMsrp = dateMsrps[label].reduce((sum, price) => sum + price, 0);
      return (totalMsrp / dateMsrps[label].length).toFixed(2);
    });

    return { labels, inventoryCount, averageMsrp };
  };

  const { labels, inventoryCount, averageMsrp } = getChartData();

  const inventoryCountData = {
    labels,
    datasets: [
      {
        label: 'Inventory Count',
        backgroundColor: 'orange',
        data: inventoryCount,
      },
    ],
  };

  const averageMsrpData = {
    labels,
    datasets: [
      {
        label: 'Average MSRP (USD)',
        backgroundColor: 'orange',
        data: averageMsrp,
      },
    ],
  };

  return (
    <div className="App">
      <Navbar />
      <div className="header-section">
        <h1>Inventory</h1>
        <div className="dealer-filter-wrapper">
          <select
            value={selectedDealer}
            onChange={(e) => setSelectedDealer(e.target.value)}
            className="dealer-select"
          >
            <option value="">Select Dealer</option>
            {/* Populate the options with actual dealer names */}
            <option value="dealer1">AAA MITSUBISHI DEALER</option>
            <option value="dealer2">BBB FORD DEALER</option>
            <option value="dealer3">CCC TOYOTA DEALER</option>
          </select>
          <button className="filter-button" onClick={toggleFilter}>
            FILTER DATA BY
          </button>
        </div>
      </div>
      {isFilterVisible && (
        <FilterSection
          conditionFilter={conditionFilter}
          setConditionFilter={(filters) => dispatch(setConditionFilter(filters))}
          durationFilter={durationFilter}
          setDurationFilter={(filters) => dispatch(setDurationFilter(filters))}
          applyFilters={() => {
            dispatch(applyFilters());
            toggleFilter(); // Optionally close the sidebar after applying filters
          }}
        />
      )}
      <DashboardCards
        getInventoryCount={getInventoryCount}
        getAverageMSRP={getAverageMSRP}
        getTotalInventoryCount={getTotalInventoryCount}
        getTotalAverageMSRP={getTotalAverageMSRP}
      />
      <Charts
        inventoryCountData={inventoryCountData}
        averageMsrpData={averageMsrpData}
        handleChartFilterChange={(filter) => dispatch(setChartFilter(filter))}
      />
      <HistoryLog
        filteredData={filteredData}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handleNextPage={() => dispatch(setCurrentPage(currentPage + 1))}
        handlePreviousPage={() => dispatch(setCurrentPage(currentPage - 1))}
        handleRowsPerPageChange={(event) => {
          dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
          dispatch(setCurrentPage(1)); // Reset to first page when rows per page changes
        }}
        totalPages={Math.ceil(filteredData.length / rowsPerPage)}
      />
    </div>
  );
};

export default App;
