import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { setNotificationData } from 'store';
// import io from 'socket.io-client';

import { notifications } from './helper';
import Button from 'components/button';
import style from './notification.module.scss';
import profile1 from 'assets/img1.svg';
import RefreshIcon from 'assets/refresh.svg';
import NotificationService from 'services/notification-service';
import { useAppSelector, useAppDispatch } from 'store/hooks';
interface Props {
  setNotificationMenu?: any;
}

const NotificationMenu = ({ setNotificationMenu }: Props) => {
  const [notificationsArr, setNotificationsArr] = useState<any[]>([]);
  const [notificationsDataCount, setNotificationsDataCount] = useState<any>(0);
  const [arrayLength, setArrayLength] = useState<any>(0);
  const [page, setPage] = useState<any>(0);
  const [isLoading, setIsLoading] = useState<any>(false);

  const { notificationData } = useAppSelector((state) => state?.app);
  const dispatch = useAppDispatch();

  const handleMore = async () => {
    setIsLoading(true);
    const res = await NotificationService.getAllNotifications({ page: page });
    if (res.status === 200) {
      const todaysData = res.data.data.filter(
        (item: any) =>
          moment(new Date(item.date)).format('YYYY-MM-DD') ===
          moment(new Date()).format('YYYY-MM-DD'),
      );
      const olderData = res.data.data.filter(
        (item: any) =>
          moment(new Date(item.date)).format('YYYY-MM-DD') !==
          moment(new Date()).format('YYYY-MM-DD'),
      );
      setNotificationsArr([
        {
          title: 'Today',
          posts: [...notificationsArr[0].posts, ...todaysData],
        },
        { title: 'Older', posts: [...notificationsArr[1].posts, ...olderData] },
      ]);

      setArrayLength(arrayLength + todaysData.length + olderData.length);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page !== 0) {
      handleMore();
    }
  }, [page]);

  useEffect(() => {
    const todaysData = notificationData.rows.filter(
      (item) =>
        moment(new Date(item.date)).format('YYYY-MM-DD') ===
        moment(new Date()).format('YYYY-MM-DD'),
    );
    const olderData = notificationData.rows.filter(
      (item) =>
        moment(new Date(item.date)).format('YYYY-MM-DD') !==
        moment(new Date()).format('YYYY-MM-DD'),
    );
    setNotificationsArr([
      { title: 'Today', posts: todaysData },
      { title: 'Older', posts: olderData },
    ]);
    setArrayLength(todaysData.length + olderData.length);
    setNotificationsDataCount(notificationData.count);
  }, [notificationData]);

  const refreshNotifications = async () => {
    const res = await NotificationService.getAllNotifications();
    if (res.status === 200) {
      dispatch(
        setNotificationData({ count: res?.data.count, rows: res?.data.data }),
      );
    }
  };

  return (
    <div
      className={style.mainDiv}
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
        setNotificationMenu(false);
      }}
    >
      <div
        className={style.notificationMenuMain}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className={style.notificationMenuTitle}>Notifications</span>
          <img
            className={style.refreshImg}
            src={RefreshIcon}
            alt={''}
            onClick={refreshNotifications}
          />
        </div>
        <div className={style.notificationMenuDayContainer}>
          {notificationsArr.length > 0 &&
            notificationsArr.map(({ title, posts }) => (
              // {notifications.map(({ title, posts }) => (
              <div className={style.notificationMenuDay} key={title}>
                <span className={style.notificationMenuDayTitle}>
                  {title === 'Today' && posts.length === 0
                    ? 'No Notifications Today'
                    : title}
                </span>
                {posts.map(
                  ({ _id, name, date, employee, description }: any) => (
                    <div className={style.notificationMenuPost} key={_id}>
                      <div className={style.profileContainer}>
                        <img
                          className={style.profileImg}
                          src={employee[0]?.img ? employee[0]?.img : profile1}
                          alt={'profile' + _id}
                        />
                      </div>
                      <div className={style.notificationPostContent}>
                        <div className={style.notificationPostContentHead}>
                          <span className={style.postUserName}>{name}</span>
                          <span className={style.postDate}>
                            {moment(new Date(date)).format('ll')}
                          </span>
                        </div>
                        <span className={style.postText}>{description}</span>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ))}
          <div></div>
        </div>

        {arrayLength < 10 || arrayLength === notificationsDataCount ? (
          ''
        ) : (
          <Button
            text={'Load More'}
            btnClass={style.loadMoreBtn}
            className={style.btnText}
            btnLoaderClass={style.btnLoader}
            type="button"
            handleClick={() => setPage(page + 1)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default NotificationMenu;
