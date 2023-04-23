import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AccountState {
  userName?: string | null | undefined;
  name?: string | null | undefined;
  hasImage?: boolean | null | undefined;
  imageUrl?: string | undefined;
}

const initialState: AccountState = {
  userName: '',
  name: '',
  hasImage: false,
  imageUrl: '',
};

export const accountReducer = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setDataAccount: (state, user: PayloadAction<AccountState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userName = user.payload?.userName;
      state.name = user.payload?.name;
      state.hasImage = user.payload?.hasImage;
      state.imageUrl = user.payload?.imageUrl;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setDataAccount} = accountReducer.actions;

export default accountReducer.reducer;
