/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { navbarTitleList } from './navbar-title-script';

import style from './navbar.module.scss';
import Container from 'components/container';
import NotificationMenu from '../notification-menu';

import notificationImg from 'assets/navbar-sidebar/Notification.svg';
import notificationHoveredIcon from 'assets/logo11.svg';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setNotificationReset } from 'store';

const Navbar = () => {
  const [notificationHover, setNotificationHover] = useState(false);
  const [notificationMenu, setNotificationMenu] = useState(false);
  const { notificationCount } = useAppSelector((state) => state?.app);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    navbarTitleList.map((ele: any) => {
      if (pathname?.includes(ele?.path)) {
        setTitle(ele.title);
      }
    });
  }, [pathname]);

  return (
    <>
      <Container>
        <div className={style.container}>
          <nav>
            <h1>{title}</h1>
            <div className={style.rightDiv}>
              <div className={style.searchDiv}>
                <input type="text" placeholder="Search" />
                <div className={style.searchIconDiv}>
                  <svg
                    id="search-line"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24.35"
                    height="24.97"
                    viewBox="0 0 24.35 24.97"
                  >
                    <path
                      id="Path_99"
                      data-name="Path 99"
                      d="M9.819,0a9.819,9.819,0,0,1,7.153,16.544.776.776,0,0,1,.087.074l7.069,7.059A.757.757,0,0,1,23.06,24.75l-7.069-7.059a.766.766,0,0,1-.114-.145A9.819,9.819,0,1,1,9.819,0Zm5.845,3.974a8.266,8.266,0,1,0,2.421,5.845,8.24,8.24,0,0,0-2.421-5.845Z"
                      transform="translate(0)"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{ position: 'relative' }}
                className={style.notificationDiv}
              >
                {notificationCount > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      backgroundColor: 'red',
                      color: 'white',
                      fontSize: '10px',
                      borderRadius: '50%',
                      display: 'flex',
                      top: '-10px',
                      right: '-10px',
                      width: '20px',
                      height: '20px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span>
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  </div>
                )}
                <img
                  src={
                    notificationHover
                      ? notificationHoveredIcon
                      : notificationImg
                  }
                  alt=""
                  onMouseEnter={() => {
                    setNotificationHover(true);
                  }}
                  onMouseLeave={() => {
                    setNotificationHover(false);
                  }}
                  onClick={() => {
                    dispatch(setNotificationReset());
                    setNotificationMenu((prev) => !prev);
                  }}
                />
                {notificationMenu && (
                  <NotificationMenu setNotificationMenu={setNotificationMenu} />
                )}
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
