import { configureStore } from '@reduxjs/toolkit';
import { filesReducer } from './files-slice';


export const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});
