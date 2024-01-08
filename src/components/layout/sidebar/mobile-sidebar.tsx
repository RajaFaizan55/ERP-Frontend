import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { adminListArr, employeeListArr } from './list-script';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setLogout } from 'store';

import style from './sidebar.module.scss';

import logoutImg from 'assets/navbar-sidebar/Logout.svg';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
interface ListArr {
  path: string;
  active: string;
  title: string;
  img1: string;
  img2: string;
}

const MobileSidebar = ({ open, setOpen }: Props) => {
  const [sideBarListArr, setSideBarListArr] = useState<ListArr[] | []>([]);
  const [pathName, setPathName] = useState<string>('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (pathname === '/') {
      setPathName('dashboard');
    } else {
      const tempPath = pathname?.split('/')[1];
      setPathName(tempPath);
    }
  }, [pathname]);

  useEffect(() => {
    if (currentUser?.role) {
      if (currentUser?.role !== 'Employee') {
        setSideBarListArr([...adminListArr]);
      } else {
        setSideBarListArr([...employeeListArr]);
      }
    }
  }, [currentUser?.role]);

  const handleLogout = () => {
    dispatch(setLogout(''));
  };

  const handleNavigate = (path: string, active: string) => {
    if (active === 'employee') {
      currentUser?.role === 'Employee'
        ? navigate(`${path}/${currentUser?.id}`)
        : navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div
      style={{
        width: open ? '250px' : '0px',
        transition: 'all 0.5s ease-in-out',
      }}
      className={style.sidebarWrapper}
    >
      {/* / RoutesList/ */}
      <div className={style.listWrapperDiv}>
        <ul className={style.ul1}>
          {sideBarListArr?.map((ele, index: number) => (
            <li
              key={index}
              onClick={() => {
                handleNavigate(ele.path, ele.active);
                setOpen(false);
              }}
              style={{
                borderLeft: ele.active.includes(pathName)
                  ? '4px solid #ffffff'
                  : '4px solid transparent',
              }}
            >
              <img src={ele.img1} alt="!error" />
              <p
                style={{
                  marginBottom: '0px',
                }}
              >
                {ele.title}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout  */}
      <div className={style.logoutDiv} style={{ paddingLeft: '13px' }}>
        <div onClick={handleLogout}>
          <img
            src={logoutImg}
            alt="!error"
            style={{ width: '23px', height: '23px' }}
          />
          <p
            style={{
              marginBottom: '0px',
            }}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
