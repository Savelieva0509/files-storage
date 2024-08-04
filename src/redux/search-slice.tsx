import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchFormValues } from '../types';

const initialState: SearchFormValues = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
