import {configureStore} from '@reduxjs/toolkit';
import accountReducer from './reducers/accountReducer';
import splashReducer from './reducers/splashReducer';
import friendReducer from './reducers/friendReducer';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    splash: splashReducer,
    friend: friendReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
