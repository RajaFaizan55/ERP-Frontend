import React, { useState } from 'react';

import Navbar from './navbar';
import Sidebar from './sidebar';
import ContainerLoader from 'components/container-loader';
import { useAppSelector } from 'store/hooks';

import style from './layout.module.scss';
import MobileSidebar from './sidebar/mobile-sidebar';
import MobileNavbar from './navbar/mobile-navbar';

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const { containerLoader } = useAppSelector((state) => state.app);

  return (
    <>
      <div className={style.downMd}>
        <div className={style.layoutWrapper}>
          <header>
            <Sidebar setOpen={setOpen} open={open} />
          </header>

          <main
            style={{
              marginLeft: open ? '85px' : '260px',
              transition: 'all 0.3s',
              position: 'relative',
            }}
          >
            <Navbar />
            {containerLoader ? <ContainerLoader /> : children}
          </main>
        </div>
      </div>
      <div className={style.upMd}>
        <div className={style.layoutWrapper} style={{ overflowX: 'hidden' }}>
          <MobileNavbar open={open} setOpen={setOpen} />
          <header style={{ left: open ? '' : '-100%' }}>
            <MobileSidebar setOpen={setOpen} open={open} />
          </header>
          <main
            style={{
              marginLeft: open ? '200px' : '0px',
              transition: 'all 0.3s',
              position: 'relative',
              transform: open ? 'scaleY(0.9)' : '',
              borderRadius: open ? '5px' : '0px',
              width: '100%',
            }}
          >
            {containerLoader ? <ContainerLoader /> : children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
