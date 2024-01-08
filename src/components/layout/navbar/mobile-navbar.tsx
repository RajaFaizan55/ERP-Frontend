/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { navbarTitleList } from './navbar-title-script';

import style from './navbar.module.scss';
import NotificationMenu from '../notification-menu';

import vector from 'assets/mobile-view/Vector.png';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbar = ({ open, setOpen }: Props) => {
  const [notificationMenu, setNotificationMenu] = useState(false);
  const [tittleHiddenShow, setTittleHiddenShow] = useState(false);
  const [title, setTitle] = useState('');

  const { pathname } = useLocation();

  const handleMouseEnter = () => {
    if (window.innerWidth < 500) {
      setTittleHiddenShow(true);
    }
  };

  useEffect(() => {
    navbarTitleList.map((ele: any) => {
      if (ele.path === pathname) {
        setTitle(ele.title);
      }
    });
  }, [pathname]);

  return (
    <>
      <nav>
        <div className={style.container}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className={style.navIcon1}
              onClick={() => setOpen(!open)}
              style={{ marginTop: open ? '-14px' : '-4px' }}
            >
              <span
                className={style.span1}
                style={{
                  top: open ? '10px' : '0px',
                  transform: open ? 'rotate(135deg)' : '',
                  width: open ? '65%' : '100%',
                }}
              ></span>
              <span
                className={style.span2}
                style={{
                  left: open ? '-60px' : '',
                  opacity: open ? '0' : '',
                  width: open ? '65%' : '100%',
                }}
              ></span>
              <span
                className={style.span3}
                style={{
                  top: open ? '10px' : '12px',
                  transform: open ? 'rotate(-135deg)' : '',
                  width: open ? '65%' : '100%',
                }}
              ></span>
            </div>
            <h1
              style={{
                opacity: tittleHiddenShow ? '0' : '1',
                width: tittleHiddenShow ? '0' : 'auto',
                marginLeft: tittleHiddenShow ? '0px' : '30px',
                transition: 'all 0.2s',
              }}
            >
              {title}
            </h1>
          </div>

          <div className={style.rightDiv}>
            <div
              className={style.searchDiv}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setTittleHiddenShow(false)}
            >
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

            <div className={style.notificationDiv}>
              <img
                src={vector}
                alt=""
                onClick={() => {
                  setNotificationMenu((prev) => !prev);
                }}
              />
              {notificationMenu && (
                <NotificationMenu setNotificationMenu={setNotificationMenu} />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;
