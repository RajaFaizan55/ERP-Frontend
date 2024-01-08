import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { adminListArr } from './list-script';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setLogout } from 'store';

import style from './sidebar.module.scss';
import leftArrow from 'assets/navbar-sidebar/leftArrow.svg';
import rightArrow from 'assets/navbar-sidebar/rightArrow.svg';
import logo from 'assets/mobile-view/sprintx.svg';

import logoImg2 from 'assets/navbar-sidebar/logoImg2.svg';
import logoutImg from 'assets/navbar-sidebar/Logout.svg';
import profileImg from 'assets/navbar-sidebar/profileImg.png';
import profileImg2 from 'assets/navbar-sidebar/profileImg2.svg';

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

const Sidebar = ({ open, setOpen }: Props) => {
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
      const setList = adminListArr?.filter((ele: any) =>
        ele.role.includes(currentUser?.role),
      );
      setSideBarListArr([...setList]);
    }
  }, [currentUser?.role]);

  const handleLogout = () => {
    dispatch(setLogout(''));
  };

  const handleNavigate = (path: string, active: string) => {
    if (active === 'employee' && currentUser?.role === 'Employee') {
      navigate(`${path}/${currentUser?.id}`);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div
        style={{ width: !open ? '250px' : '75px', transition: 'all 0.3s' }}
        className={style.sidebarWrapper}
      >
        <div className={style.sidebarHeader}>
          <div className={style.arrowDiv}>
            <img
              src={!open ? leftArrow : rightArrow}
              alt="!error"
              onClick={() => setOpen(!open)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={style.logoImgDiv}>
            {!open ? (
              <img src={logo} alt="!error" className={style.img} />
            ) : (
              <img
                src={logoImg2}
                alt="!error"
                style={{ position: 'relative', left: '3px', marginTop: '10px' }}
              />
            )}
          </div>

          <div className={style.profileImgDiv}>
            {!open ? (
              <img
                src={currentUser?.img ? currentUser?.img : profileImg}
                alt="!error"
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <img
                src={currentUser?.img ? currentUser?.img : profileImg2}
                alt="!error"
                style={{
                  marginTop: '20px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>

          <div
            className={style.profileContentDiv}
            style={{ display: !open ? 'block' : 'none' }}
          >
            <h1>{`${currentUser?.firstName} ${currentUser?.lastName}`}</h1>
            <p style={{ color: '#57B993' }}>{currentUser?.designation}</p>
          </div>
        </div>

        {/* / RoutesList/ */}
        <div className={style.listWrapperDiv}>
          <ul className={style.ul1}>
            {sideBarListArr?.map((ele, index: number) => (
              <li
                key={index}
                onClick={() => handleNavigate(ele.path, ele.active)}
                style={{
                  borderLeft: ele.active.includes(pathName)
                    ? '4px solid #57b993'
                    : '4px solid transparent',
                }}
              >
                <img
                  src={ele.active.includes(pathName) ? ele.img2 : ele.img1}
                  alt="!error"
                />
                <p
                  style={{
                    visibility: !open ? 'visible' : 'hidden',
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
        <div className={style.logoutDiv} style={{ paddingLeft: '24px' }}>
          <div onClick={handleLogout}>
            <img src={logoutImg} alt="!error" />
            <p
              style={{
                visibility: !open ? 'visible' : 'hidden',
                marginBottom: '0px',
              }}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
