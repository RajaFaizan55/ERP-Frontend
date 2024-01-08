import React from 'react';
import Loading from '../loading';

import style from './button.module.scss';

interface Props {
  mobileIcon?: string;
  handleClick?: () => void;
  type?: any;
  isLoading?: boolean;
  btnClass?: string;
  disabled?: any;
  btnLoaderClass?: string;
  className?: any;
}

const MobileButton = ({
  mobileIcon,
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
      {/* Mobile Screen MobileButton */}
      <button
        className={`${style.btn2} ${btnClass}`}
        type={type}
        onClick={handleClick && handleClick}
        disabled={isLoading || disabled ? true : false}
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        {isLoading ? (
          <Loading loaderClass={btnLoaderClass} />
        ) : (
          <>
            {mobileIcon && (
              <img src={mobileIcon} alt="" className={style.img} />
            )}
          </>
        )}
      </button>
    </>
  );
};

export default MobileButton;
