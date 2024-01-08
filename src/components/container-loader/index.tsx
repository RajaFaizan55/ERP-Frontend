import React from 'react';
import Loading from 'components/loading';

import style from './container-loader.module.scss';

const ContainerLoader = () => {
  return (
    <div className={style.container}>
      <Loading loaderClass={style.loaderClass} />
    </div>
  );
};

export default ContainerLoader;
