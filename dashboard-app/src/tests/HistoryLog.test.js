import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HistoryLog from '../components/HistoryLog'; // Adjust the path to your HistoryLog component

describe('HistoryLog Component', () => {
  const mockFilteredData = [
    {
      "id": "1",
      "make": "Ford",
      "model": "Mustang",
      "price": "35000 USD",
      "condition": "new",
      "timestamp": "2023-05-12T14:48:00.000Z"
    },
    {
      "id": "2",
      "make": "Toyota",
      "model": "Camry",
      "price": "28000 USD",
      "condition": "used",
      "timestamp": "2023-06-05T09:15:00.000Z"
    },
    {
      "id": "3",
      "make": "Honda",
      "model": "Civic",
      "price": "25000 USD",
      "condition": "cpo",
      "timestamp": "2023-07-20T16:30:00.000Z"
    }
  ];

  const mockHandleNextPage = jest.fn();
  const mockHandleRowsPerPageChange = jest.fn();

  test('calls handleNextPage when Next button is clicked', () => {
    render(
      <HistoryLog
        filteredData={mockFilteredData}
        currentPage={1}
        rowsPerPage={5}
        handleNextPage={mockHandleNextPage}
        handleRowsPerPageChange={mockHandleRowsPerPageChange}
        totalPages={2} 
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockHandleNextPage).toHaveBeenCalled();
  });

  test('calls handleRowsPerPageChange when rows per page is changed', () => {
    render(
      <HistoryLog
        filteredData={mockFilteredData}
        currentPage={1}
        rowsPerPage={5}
        handleNextPage={mockHandleNextPage}
        handleRowsPerPageChange={mockHandleRowsPerPageChange}
        totalPages={1}
      />
    );

    // Use the label text to find the select element
    fireEvent.change(screen.getByLabelText('Rows per page:'), { target: { value: 10 } });
    expect(mockHandleRowsPerPageChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
