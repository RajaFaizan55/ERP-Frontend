import { useEffect, useState } from 'react';

import io from 'socket.io-client';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  setCurrentUser,
  setNotificationCount,
  setNotificationData,
} from 'store';
import Routes from 'routes';

import AuthService from 'services/auth-service';
import NotificationService from 'services/notification-service';

// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const ENDPOINT =
  process.env.REACT_APP_API_IS_DEV === 'true'
    ? process.env.REACT_APP_SOCKET_URL_DEV
    : process.env.REACT_APP_SOCKET_URL_PRODUCTION;

export const mySocket = io(ENDPOINT || 'https://erp.sprintx.net', {
  transports: ['websocket'],
});

const App = () => {
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();
  const { user_id, currentUser, token } = useAppSelector((state) => state?.app);

  const fetchNotificationsData = async () => {
    const res = await NotificationService.getAllNotifications();
    if (res.status === 200) {
      dispatch(
        setNotificationData({ count: res?.data.count, rows: res?.data.data }),
      );
    }
  };

  useEffect(() => {
    const fetchUserData = async (id: string | number) => {
      setLoader(true);
      const res = await AuthService.getUserData?.(id);
      dispatch(setCurrentUser(res?.data));
      setLoader(false);
    };

    if (token && user_id) {
      fetchUserData(user_id);
      fetchNotificationsData();
    }
  }, [dispatch, token, user_id]);

  mySocket.emit('join_room', '123456789');

  useEffect(() => {
    if (currentUser && currentUser?.employeeId) {
      mySocket.on('receive_notification', async (data) => {
        if (
          data?.executive &&
          currentUser.role &&
          currentUser.role !== 'Employee'
        ) {
          fetchNotificationsData();
          dispatch(setNotificationCount());
        } else if (currentUser.employeeId === data.employeeId) {
          // console.log('receive_notification', data);
          fetchNotificationsData();
          dispatch(setNotificationCount());
        }
      });
    }
  }, [currentUser]);

  return (
    <>
      <Routes token={token} role={currentUser?.role} loader={loader} />
    </>
  );
};

export default App;
