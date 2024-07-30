 import { createSlice } from '@reduxjs/toolkit';
import { DashboardTypes } from '../types';
import {
  fetchDashboards,
  addDashboard,
  deleteDashboard,
  editDashboard,
} from '../redux/dashboards-operations';


const initialState: DashboardTypes[] = [];

const dashboardsSlice = createSlice({
  name: 'dashboards',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDashboards.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchDashboards.rejected, (state, action) => {
      console.error('Failed to fetch dashboards:', action.error.message);
    });

    builder.addCase(addDashboard.fulfilled, (state, action) => {
      
      state.push(action.payload);
    });
    builder.addCase(deleteDashboard.fulfilled, (state, action) => {
      return state.filter(dashboard => dashboard._id !== action.payload);
    });
    builder.addCase(editDashboard.fulfilled, (state, action) => {
      const updatedDashboard = action.payload;
      const index = state.findIndex(
        dashboard => dashboard._id === updatedDashboard._id
      );
      if (index !== -1) {
        state[index] = updatedDashboard;
      }
    });
  },
});

export const dashboardsReducer = dashboardsSlice.reducer