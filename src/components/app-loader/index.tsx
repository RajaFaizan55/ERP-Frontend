import React from 'react';

import Loading from 'components/loading';

import style from './app-loader.module.scss';
import sprintXLogo from 'assets/sprintXLogo.png';

const AppLoader = () => {
  return (
    <div className={style.container}>
      <Loading loaderClass={style.loaderClass} />
      <img src={sprintXLogo} alt="logo" style={{ width: '100px  ' }} />
    </div>
  );
};

export default AppLoader;
