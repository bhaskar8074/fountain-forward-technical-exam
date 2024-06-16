import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching data
export const fetchData = createAsyncThunk('inventory/fetchData', async () => {
  const response = await axios.get('http://localhost:5000/api/inventory');
  return response.data;
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    data: [],
    filteredData: [],
    conditionFilter: '',
    durationFilter: '',
    currentPage: 1,
    rowsPerPage: 5,
    chartFilter: 'new', // Default to 'new'
    status: 'idle',
  },
  reducers: {
    setConditionFilter: (state, action) => {
      state.conditionFilter = action.payload;
      // Apply filters when conditionFilter changes
      state.filteredData = applyAllFilters(state);
    },
    setDurationFilter: (state, action) => {
      state.durationFilter = action.payload;
      // Apply filters when durationFilter changes
      state.filteredData = applyAllFilters(state);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setChartFilter: (state, action) => {
      state.chartFilter = action.payload;
      // Apply filters when chartFilter changes
      state.filteredData = applyAllFilters(state);
    },
    applyFilters: (state) => {
      // Apply all filters when applyFilters action is dispatched
      state.filteredData = applyAllFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        // Apply initial chart filter to fetched data
        state.filteredData = action.payload.filter(item => item.condition === state.chartFilter);
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Helper function to apply all filters
const applyAllFilters = (state) => {
  let filtered = state.data;

  // Apply condition filter if set
  if (state.conditionFilter) {
    filtered = filtered.filter(item => item.condition === state.conditionFilter);
  }

  // Apply duration filter if set
  if (state.durationFilter) {
    const now = new Date();
    const durationMap = {
      'last-month': 1,
      'this-month': 0,
      'last-3-months': 3,
      'last-6-months': 6,
      'this-year': now.getFullYear(),
      'last-year': now.getFullYear() - 1,
    };
    const monthsToSubtract = durationMap[state.durationFilter];

    if (typeof monthsToSubtract === 'number') {
      const filterDate = new Date();
      filterDate.setMonth(filterDate.getMonth() - monthsToSubtract);

      filtered = filtered.filter(
        (item) => new Date(item.timestamp) >= filterDate
      );
    } else if (typeof monthsToSubtract === 'string') {
      filtered = filtered.filter(
        (item) => new Date(item.timestamp).getFullYear() === monthsToSubtract
      );
    }
  }

  // Apply chart filter if set (e.g., 'new', 'used', 'cpo')
  if (state.chartFilter) {
    filtered = filtered.filter(item => item.condition === state.chartFilter);
  }

  return filtered;
};

export const {
  setConditionFilter,
  setDurationFilter,
  setCurrentPage,
  setRowsPerPage,
  setChartFilter,
  applyFilters,
} = inventorySlice.actions;

export default inventorySlice.reducer;
