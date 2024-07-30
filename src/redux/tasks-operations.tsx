import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskFormValues } from '../types';

axios.defaults.baseURL = 'https://task-managment-boards-backend.onrender.com';

export const fetchTasksForBoard = createAsyncThunk(
  'task/getAllTasksForBoard',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await axios.get(`/api/boards/${boardId}/tasks`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'task/addTask',
  async (task: TaskFormValues, thunkAPI) => {
    try {
      console.log('Title:', task.title);
      const response = await axios.post(
        `/api/boards/${task.boardId}/tasks`,
        task
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (
    { boardId, taskId }: { boardId: string; taskId: string },
    thunkAPI
  ) => {
    try {
      await axios.delete(`/api/boards/${boardId}/tasks/${taskId}`);
      return taskId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'task/editTask',
  async (
    {
      boardId,
      taskId,
      title,
      text,
      status,
    }: {
      boardId: string;
      taskId: string;
      title: string;
      text: string;
      status: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `/api/boards/${boardId}/tasks/${taskId}`,
        { title, text, status, boardId }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const moveTask = createAsyncThunk(
  'task/updateTaskStatusById',
  async (
    {
      boardId,
      taskId,
      status,
    }: { boardId: string; taskId: string; status: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/api/boards/${boardId}/tasks/${taskId}`,
        { status }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
