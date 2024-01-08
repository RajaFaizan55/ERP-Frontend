import React from 'react';

import style from './progress.module.scss';

interface Props {
  value: number;
  maxVal?: string | number;
  id?: string;
  className?: any;
}

const ProgressBar = ({ value, maxVal, id, className }: Props) => {
  return (
    <div className={`${style.wrapper} ${className}`}>
      <p>Progress </p>
      <progress id={id} value={value} max={maxVal}></progress>
    </div>
  );
};

export default ProgressBar;
