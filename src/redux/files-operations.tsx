import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FileFormValues } from '../types';

axios.defaults.baseURL = 'https://files-storage-backend.onrender.com';

export const allFiles = createAsyncThunk(
  'files/getFiles',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/files`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching files:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addFile = createAsyncThunk(
  'files/addFile',
  async (file: FileFormValues, thunkAPI) => {
    try {
      const response = await axios.post(`/api/files`, file);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
