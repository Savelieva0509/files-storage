import { createSlice } from '@reduxjs/toolkit';
import { FileTypes } from '../types';
import { allFiles, addFile } from './files-operations';
import { FilesStateTypes } from '../types';

const initialState: FilesStateTypes = {
  files: [],
  countFiles: 0,
  loading: false,
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
      console.log('Files updated in state:', state.files);
    });
    builder.addCase(allFiles.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addFile.fulfilled, (state, action) => {
      state.files.unshift(action.payload);
    });
  },
});

export const filesReducer = filesSlice.reducer;
