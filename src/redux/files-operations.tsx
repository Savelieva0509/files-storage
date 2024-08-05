import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://files-storage-backend.onrender.com';

export const allFiles = createAsyncThunk(
  'files/getFiles',
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `/api/files?page=${page}&limit=${limit}`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addFile = createAsyncThunk(
  'files/addFile',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post('/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addFileWithPromise =
  (formData: FormData) => async (dispatch: any) => {
    const resultAction = await dispatch(addFile(formData));
    if (addFile.fulfilled.match(resultAction)) {
      return { success: true, data: resultAction.payload };
    } else {
      return { success: false, error: resultAction.payload };
    }
  };

export const updateDownloadCount = createAsyncThunk(
  'files/updateDownloadCount',
  async ({ id, count }: { id: string; count: number }, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/files/${id}/download`, {
        downloadCount: count,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
