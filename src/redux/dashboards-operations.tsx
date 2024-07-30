import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://task-managment-boards-backend.onrender.com';

export const fetchDashboards = createAsyncThunk(
  'dashboards/fetchDashboards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/boards');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addDashboard = createAsyncThunk(
  'dashboards/addDashboard',
  async (title: string, thunkAPI) => {
    try {
      const response = await axios.post('/api/boards', { title });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteDashboard = createAsyncThunk(
  'dashboards/deleteDashboard',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/api/boards/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editDashboard = createAsyncThunk(
  'dashboards/editDashboard',
  async ({ id, title }: { id: string; title: string }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/boards/${id}`, { title });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
