import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';
import { Notification } from '../interfaces/notifications';

const currentUser = {
  id: '',
  userName: '',
  employeeId: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  img: '',
  designation: '',
};

const notificationData = {
  count: 0,
  rows: [
    {
      _id: '',
      name: '',
      module: '',
      employeeId: '',
      description: '',
      date: '',
      reads: [],
      employee: [{ img: '' }],
    },
  ],
};

export interface AppSliceState {
  currentUser: User;
  token: string;
  user_id: string;
  loading: boolean;
  containerLoader: boolean;
  notificationCount: number;
  notificationData: Notification;
}

const sessionNotifyCount = Number(sessionStorage.getItem('notificationCount'));

const initialState: AppSliceState = {
  currentUser,
  token: localStorage.getItem('token') || '',
  user_id: localStorage.getItem('user_id') || '',
  loading: false,
  containerLoader: false,
  notificationCount: sessionNotifyCount || 0,
  notificationData,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setContainerLoader(state, action: PayloadAction<boolean>) {
      state.containerLoader = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      localStorage.setItem('user_id', action.payload);
      state.user_id = action.payload;
    },
    setNotificationCount(state) {
      const count = state.notificationCount + 1;
      sessionStorage.setItem('notificationCount', count?.toString());
      state.notificationCount = state.notificationCount + 1;
    },
    setNotificationReset(state) {
      sessionStorage.removeItem('notificationCount');
      state.notificationCount = 0;
    },
    setNotificationData(state, action: PayloadAction<Notification>) {
      state.notificationData = action.payload;
    },
    setLogout(state, action: PayloadAction<string>) {
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      state.user_id = action?.payload;
      state.token = action?.payload;
      state.currentUser = currentUser;
    },
  },
});
