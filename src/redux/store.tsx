import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasks-slice';
import { dashboardsReducer } from './dashboards-slice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    dashboards: dashboardsReducer,
  },
});
