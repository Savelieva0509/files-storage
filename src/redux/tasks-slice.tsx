import { createSlice } from '@reduxjs/toolkit';
import { TaskTypes } from '../types';
import {
  fetchTasksForBoard,
  addTask,
  deleteTask,
  editTask,
  moveTask,
} from './tasks-operations';

export interface TasksState {
  tasks: TaskTypes[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTasksForBoard.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasksForBoard.rejected, (state, action) => {
      console.error('Failed to fetch tasks:', action.error.message);
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task._id !== taskId);
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      const editedTask = action.payload;
      const index = state.tasks.findIndex(task => task._id === editedTask._id);
      if (index !== -1) {
        state.tasks[index] = editedTask;
      } else {
        console.error(`Task with id ${editedTask._id} not found`);
      }
    });
    builder.addCase(moveTask.fulfilled, (state, action) => {
      const { _id, destination } = action.payload;
      const index = state.tasks.findIndex(task => task._id === _id);
      if (index !== -1) {
        state.tasks[index].status = destination;
      } else {
        console.error(`Task with id ${_id} not found`);
      }
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
