import { DashboardsState } from '../types';
import { TasksState } from './tasks-slice';

export const getDashboards = (state: DashboardsState) => state.dashboards;

export const getLastDashboardId = (state: DashboardsState) => {
  const dashboards = state.dashboards;

  if (dashboards.length > 0) {
    return dashboards[dashboards.length - 1]._id;
  } else {
    return '';
  }
};

export const getTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
