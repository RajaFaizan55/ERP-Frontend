import React from 'react';
import style from './input.module.scss';

interface Props {
  label?: string;
  onChange?: (e: any) => void;
  value?: string;
  name?: string;
  option?: any;
  control?: any;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  icon?: string;
  inputClass?: string;
  iconClass?: string;
  onClick?: () => void;
  onBlur?: () => void;
  containerClass?: string;
  error?: any;
  list?: any;
  errorMessage?: string;
  inputRef?: any;
  readOnly?: boolean;
  isDisable?: boolean;
  id?: string;
  step?: string;
  required?: boolean;
  star?: string;
  extension?: string;
  files?: any[];
}

const Input = ({
  label,
  onChange,
  value,
  name,
  list,
  onClick,
  onBlur,
  type,
  placeholder,
  error,
  errorMessage,
  icon,
  files,
  inputClass,
  iconClass,
  containerClass,
  inputRef,
  readOnly,
  isDisable,
  required,
  id,
  step,
  star,
  extension,
  ...restOfProps
}: Props) => {
  return (
    <>
      <div className={`${style.inputContainer} ${containerClass}`}>
        {label && (
          <label>
            {label}
            <span style={{ color: 'red' }}>{star}</span>
          </label>
        )}
        <div style={{ position: 'relative' }}>
          <input
            className={inputClass}
            list={list}
            style={{
              border: error ? '1px solid #ff5050' : ' 1px solid #d9d9d9',
              color: error ? '#ff5050' : '#6e6d6d',
              backgroundColor: readOnly || isDisable ? '#ddd' : '#fff',
            }}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            ref={inputRef}
            readOnly={readOnly || false}
            disabled={isDisable || false}
            step={step}
            onBlur={onBlur}
            required={required && required}
            accept={extension}
            {...restOfProps}
          />
          {icon && (
            <img
              className={`${style.icon} ${iconClass}`}
              style={{ cursor: 'pointer' }}
              src={icon}
              alt=""
              onClick={onClick}
            />
          )}
        </div>
        {error && errorMessage && (
          <span className={style.errorMessage}>{errorMessage}</span>
        )}
      </div>
    </>
  );
};

export default Input;
