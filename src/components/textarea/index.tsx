import React from 'react';

import style from './textarea.module.scss';

interface Props {
  error?: any;
  inputRef?: any;
  control?: any;
  option?: any;
  errorMessage?: any;
  name?: string;
  placeholder?: string;
  label?: string;
}

const TextArea = ({
  error,
  inputRef,
  errorMessage,
  label,
  name,
  placeholder,
}: Props) => {
  return (
    <>
      <div className={style.note}>
        <label>{label}</label>
        <textarea
          style={{
            borderColor: error ? '#ff5050' : '',
          }}
          placeholder={placeholder}
          name={name}
          ref={inputRef}
          rows={6}
        ></textarea>
        {error ? (
          <span className={style.errorMessage}>{errorMessage}</span>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default TextArea;
