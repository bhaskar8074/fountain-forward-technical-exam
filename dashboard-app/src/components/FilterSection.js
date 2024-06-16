import React, { useState } from "react";

const FilterSection = ({
  conditionFilter,
  setConditionFilter,
  durationFilter,
  setDurationFilter,
  applyFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="filter-container">
      <div className="filter-sidebar">
        <div className="filter-header">
          <h2>Filter Data By</h2>
          <button className="close-button" onClick={toggleFilter}>
            ×
          </button>
        </div>
        <div className="filter-content">
          <h3>MAKE</h3>
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                value="ford"
                checked={conditionFilter === "ford"}
                onChange={(e) => setConditionFilter(e.target.value)}
              />
              Ford
            </label>
            <label>
              <input
                type="checkbox"
                value="cadillac"
                checked={conditionFilter === "cadillac"}
                onChange={(e) => setConditionFilter(e.target.value)}
              />
              Cadillac
            </label>
            <label>
              <input
                type="checkbox"
                value="jeep"
                checked={conditionFilter === "jeep"}
                onChange={(e) => setConditionFilter(e.target.value)}
              />
              Jeep
            </label>
          </div>
          <h3>DURATION</h3>
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                value="last-month"
                checked={durationFilter === "last-month"}
                onChange={(e) => setDurationFilter(e.target.value)}
              />
              Last Month
            </label>
            <label>
              <input
                type="checkbox"
                value="this-month"
                checked={durationFilter === "this-month"}
                onChange={(e) => setDurationFilter(e.target.value)}
              />
              This Month
            </label>
            <label>
              <input
                type="checkbox"
                value="last-3-months"
                checked={durationFilter === "last-3-months"}
                onChange={(e) => setDurationFilter(e.target.value)}
              />
              Last 3 Months
            </label>
            <label>
              <input
                type="checkbox"
                value="last-6-months"
                checked={durationFilter === "last-6-months"}
                onChange={(e) => setDurationFilter(e.target.value)}
              />
              Last 6 Months
            </label>
            <label>
              <input
                type="checkbox"
                value="this-year"
                checked={durationFilter === "this-year"}
                onChange={(e) => setDurationFilter(e.target.value)}
              />
              This Year
            </label>
            <label>
              <input
                type="checkbox"
                value="last-year"
                checked={durationFilter === "last-year"}
                onChange={(e) => setDurationFilter(e.target.value)}
              />
              Last Year
            </label>
          </div>
          <div className="filter-actions">
            <button className="apply-button" onClick={applyFilters}>
              APPLY FILTER
            </button>
            <button
              className="reset-button"
              onClick={() => {
                setConditionFilter("");
                setDurationFilter("");
              }}
            >
              REMOVE ALL FILTERS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
