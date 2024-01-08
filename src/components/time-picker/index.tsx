import React from 'react';

import Input from 'components/input';

import style from './time.module.scss';
import time from 'assets/employee-page/13-Clock.png';

interface Props {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;

  inputRef?: any;
}

const TimePicker = ({ placeholder, label, name, inputRef }: Props) => {
  return (
    <>
      <div className={style.main}>
        <div className={style.inpDiv}>
          <Input
            label={label}
            type="time"
            id="time"
            placeholder={placeholder}
            name={name}
            inputRef={inputRef}
          />
          <label htmlFor="time">
            <div className={style.icon}>
              <img src={time} alt="" />
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default TimePicker;
