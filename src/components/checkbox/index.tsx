import React from 'react';
import style from './checkbox.module.scss';
interface Props {
  label?: string;
  inputLabel?: string;
  id?: string;
  name?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: any;
  inputRef?: any;
  labelClass?: any;
  checkboxClass?: any;
  error?: boolean;
}

const Checkbox = ({
  id,
  name,
  label,
  inputLabel,
  error,
  inputRef,
  labelClass,
  checkboxClass,
  handleChange,
  checked,
}: Props) => {
  return (
    <div style={{ display: 'flex' }}>
      <label style={{ marginRight: '10px' }}>{label}</label>
      <label
        className={`${style.container} ${labelClass}`}
        style={{ color: error ? '#ff5050' : '' }}
        htmlFor={id}
      >
        {inputLabel}
        <input
          type="checkbox"
          name={name}
          ref={inputRef}
          id={id}
          onChange={handleChange}
          checked={checked}
        />
        <span
          className={`${style.checkMark} ${checkboxClass}`}
          style={{ borderColor: error ? '#ff5050' : '' }}
        ></span>
      </label>
    </div>
  );
};

export default Checkbox;
