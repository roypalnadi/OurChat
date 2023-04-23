import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface DrawerState {
  value: boolean;
}

const initialState: DrawerState = {
  value: true,
};

export const splashReducer = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {isLoading} = splashReducer.actions;

export default splashReducer.reducer;
