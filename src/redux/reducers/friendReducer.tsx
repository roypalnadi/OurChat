import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface DrawerState {
  value: any[];
}

const initialState: DrawerState = {
  value: [],
};

export const friendReducer = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    makeZero: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {add, makeZero} = friendReducer.actions;

export default friendReducer.reducer;
