import { createSlice } from '@reduxjs/toolkit';
import { FileTypes } from '../types';
import { allFiles, addFile } from './files-operations';
import { FilesStateTypes } from '../types';

const initialState: FilesStateTypes = {
  files: [],
  countFiles: 0,
  loading: false,
  error: null,
};

const filesSlice = createSlice({
  name: 'files',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(allFiles.pending, state => {
      state.loading = true;
    });
    builder.addCase(allFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.countFiles = action.payload.countFiles;
      state.files = action.payload.files.sort((a: FileTypes, b: FileTypes) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    });
    builder.addCase(allFiles.rejected, (state, action) => {
      state.loading = false;
    });
    builder
      .addCase(addFile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.unshift(action.payload);
        state.error = null;
      })
      .addCase(addFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const filesReducer = filesSlice.reducer;
