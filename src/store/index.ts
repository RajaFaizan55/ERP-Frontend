import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app-splice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export const {
  setCurrentUser,
  setToken,
  setLoading,
  setUserId,
  setLogout,
  setContainerLoader,
  setNotificationCount,
  setNotificationReset,
  setNotificationData,
} = appSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = { app: AppSliceState; employee: EmployeeSliceState };
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
