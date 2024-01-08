import React from 'react';
import style from './radio.module.scss';
interface Props {
  label?: string;
  htmlFor?: string;
  id?: string;
  name?: string;
  handleClick?: () => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: any;
  radioRef?: any;
  radioValue?: number | string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

const Radio = ({
  label,
  htmlFor,
  id,
  handleClick,
  name,
  handleChange,
  checked,
  radioRef,
  radioValue,
  error,
  errorMessage,
  className,
}: Props) => {
  return (
    <div>
      <label
        className={`${style.container} ${className}`}
        htmlFor={htmlFor}
        style={{
          color:
            label === 'Active' || label === 'Present'
              ? '#57B993'
              : label === 'Inactive' || label === 'Absent'
              ? '#FE3A3A'
              : error
              ? 'red'
              : '#6E6D6D',
          fontSize: '16px',
        }}
      >
        {label}
        <input
          type="radio"
          name={name}
          id={id}
          onClick={handleClick}
          onChange={handleChange}
          checked={checked}
          ref={radioRef}
          value={radioValue}
        />
        <span
          className={style.checkMark}
          style={{ borderColor: error ? 'red' : '#B9B9B9' }}
        ></span>
      </label>
    </div>
  );
};

export default Radio;
