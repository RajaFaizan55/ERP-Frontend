import React from 'react';
import Loading from '../loading';

import style from './button.module.scss';

interface Props {
  text?: string;
  icon?: string;
  handleClick?: () => void;
  type?: any;
  isLoading?: boolean;
  btnClass?: string;
  disabled?: any;
  btnLoaderClass?: string;
  className?: any;
}

const Button = ({
  text,
  icon,
  handleClick,
  type,
  className,
  isLoading,
  btnClass,
  disabled,
  btnLoaderClass,
}: Props) => {
  return (
    <>
      <button
        className={`${style.btnEl} ${btnClass}`}
        type={type}
        onClick={handleClick}
        disabled={isLoading || disabled ? true : false}
        style={{
          pointerEvents: isLoading || disabled ? 'none' : 'auto',
        }}
      >
        {isLoading ? (
          <Loading loaderClass={btnLoaderClass} />
        ) : (
          <>
            {text && (
              <span className={`${style.btnTitle} ${className}`}>{text}</span>
            )}
            {icon && <img src={icon} alt="" className={style.img} />}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
