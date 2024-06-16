import React from 'react';  // Add this line to import React
import { render, screen } from '@testing-library/react';
import DashboardCards from '../components/DashboardCards';
import '@testing-library/jest-dom/extend-expect';

// Mock functions to return sample data
const mockGetInventoryCount = jest.fn((type) => {
  const counts = { new: 100, used: 200, cpo: 50 };
  return counts[type];
});

const mockGetAverageMSRP = jest.fn((type) => {
  const msrps = { new: 35000, used: 25000, cpo: 30000 };
  return msrps[type];
});

const mockGetTotalInventoryCount = jest.fn(() => 350);
const mockGetTotalAverageMSRP = jest.fn(() => 30000);

test('should render DashboardCards with correct data', () => {
  // Render the component with mock functions
  render(
    <DashboardCards
      getInventoryCount={mockGetInventoryCount}
      getAverageMSRP={mockGetAverageMSRP}
      getTotalInventoryCount={mockGetTotalInventoryCount}
      getTotalAverageMSRP={mockGetTotalAverageMSRP}
    />
  );

  // Assertions to check if the elements have the correct content
  expect(screen.getByTestId('unit-count-new')).toHaveTextContent('100');
  expect(screen.getByTestId('msrp-new')).toHaveTextContent('$35000');
  expect(screen.getByTestId('unit-count-used')).toHaveTextContent('200');
  expect(screen.getByTestId('msrp-used')).toHaveTextContent('$25000');
  expect(screen.getByTestId('unit-count-cpo')).toHaveTextContent('50');
  expect(screen.getByTestId('msrp-cpo')).toHaveTextContent('$30000');
  expect(screen.getByTestId('unit-count-total')).toHaveTextContent('350');
  expect(screen.getByTestId('msrp-total')).toHaveTextContent('$30000');
});
