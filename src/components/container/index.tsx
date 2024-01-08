import React from 'react';
import style from './container.module.scss';

interface Props {
  children?: any;
  container?: any;
}

const Container = ({ children, container }: Props) => {
  return (
    <div className={`${style.container} ${container}`} id="container">
      {children}
    </div>
  );
};

export default Container;
