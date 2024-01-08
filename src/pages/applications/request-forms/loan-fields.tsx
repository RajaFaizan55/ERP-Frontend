import React from 'react';

import style from './request.module.scss';

interface Props {
  onChange?: (e: any) => void;
  value?: string;
  name?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

const LoanFields = ({
  onChange,
  value,
  name,
  placeholder,
  type,
  ...restOfProps
}: Props) => {
  return (
    <>
      <input
        name={name}
        type={type}
        className={style.input}
        placeholder={placeholder}
        {...restOfProps}
      />
    </>
  );
};

export default LoanFields;
