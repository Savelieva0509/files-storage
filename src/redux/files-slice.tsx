import { createSlice } from '@reduxjs/toolkit';
import { FileTypes } from '../types';
import { allFiles, addFile } from './files-operations';

export interface FilesState {
  files: FileTypes[];
}

const initialState: FilesState = {
  files: [],
};


const filesSlice = createSlice({
  name: 'files',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(allFiles.fulfilled, (state, action) => {
      state.files = action.payload;
      console.log('Files updated in state:', state.files); 
    });
    builder.addCase(allFiles.rejected, (state, action) => {
      console.error('Failed to fetch files:', action.error.message);
    });
    builder.addCase(addFile.fulfilled, (state, action) => {
      state.files.push(action.payload);
    });
  },
});

export const filesReducer = filesSlice.reducer;