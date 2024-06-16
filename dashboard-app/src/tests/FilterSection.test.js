import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterSection from '../components/FilterSection'; // Adjust the import path as per your project structure

describe('FilterSection Component', () => {
  const mockSetConditionFilter = jest.fn();
  const mockSetDurationFilter = jest.fn();
  const mockApplyFilters = jest.fn();

  beforeEach(() => {
    render(
      <FilterSection
        conditionFilter=""
        setConditionFilter={mockSetConditionFilter}
        durationFilter=""
        setDurationFilter={mockSetDurationFilter}
        applyFilters={mockApplyFilters}
      />
    );
  });

  test('renders FilterSection component', () => {
    expect(screen.getByText('Filter Data By')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(9); // 6 condition + 6 duration checkboxes
    expect(screen.getByText('APPLY FILTER')).toBeInTheDocument();
    expect(screen.getByText('REMOVE ALL FILTERS')).toBeInTheDocument();
  });

  test('selects condition filter', () => {
    const fordCheckbox = screen.getByLabelText('Ford');
    fireEvent.click(fordCheckbox);
    expect(mockSetConditionFilter).toHaveBeenCalledWith('ford');
  });

  test('selects duration filter', () => {
    const lastMonthCheckbox = screen.getByLabelText('Last Month');
    fireEvent.click(lastMonthCheckbox);
    expect(mockSetDurationFilter).toHaveBeenCalledWith('last-month');
  });

  test('applies filters', () => {
    fireEvent.click(screen.getByText('APPLY FILTER'));
    expect(mockApplyFilters).toHaveBeenCalled();
  });

  test('removes all filters', () => {
    fireEvent.click(screen.getByText('REMOVE ALL FILTERS'));
    expect(mockSetConditionFilter).toHaveBeenCalledWith('');
    expect(mockSetDurationFilter).toHaveBeenCalledWith('');
  });
});
