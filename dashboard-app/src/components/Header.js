import React from 'react';

const Header = ({ conditionFilter, setConditionFilter, durationFilter, setDurationFilter, applyFilters }) => {
  return (
    <header>
      <h1>Inventory</h1>
      <div className="filter-section">
        <select onChange={(e) => setConditionFilter(e.target.value)} value={conditionFilter}>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="cpo">CPO</option>
        </select>
        <select onChange={(e) => setDurationFilter(e.target.value)} value={durationFilter}>
          <option value="">Filter Data By</option>
          <option value="last-month">Last Month</option>
          <option value="this-month">This Month</option>
          <option value="last-3-months">Last 3 Months</option>
          <option value="last-6-months">Last 6 Months</option>
          <option value="this-year">This Year</option>
          <option value="last-year">Last Year</option>
        </select>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
    </header>
  );
};

export default Header;
