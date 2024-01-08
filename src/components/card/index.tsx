import React from 'react';

import style from './card.module.scss';
interface Props {
  className?: any;
  children?: any;
}

const Card = ({ children, className }: Props) => {
  return (
    <>
      <div className={`${style.card} ${className}`}>{children}</div>
    </>
  );
};

export default Card;
