import { configureStore } from '@reduxjs/toolkit';
import { filesReducer } from './files-slice';
import { searchReducer } from './search-slice';


export const store = configureStore({
  reducer: {
    files: filesReducer,
    search: searchReducer
  },
});
