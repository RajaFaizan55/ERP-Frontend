import React from 'react';

import dayArr from './day-helper';

import style from './day.module.scss';

interface Props {
  dayRef?: any;
  name?: string;
  selectDay: any;
  error: any;
}

const DayPicker = ({ dayRef, name, selectDay, error }: Props) => {
  return (
    <div style={{ paddingTop: '10px' }}>
      <label className={style.labelDay}>Repeat On</label>
      <div className={style.bodyWrapper}>
        {dayArr.map((ele, index) => {
          return (
            <React.Fragment key={index}>
              <input
                className={`${style.hc} ${error && style.error}`}
                type="checkbox"
                name={name}
                ref={dayRef}
                value={ele.value}
                id={`checkbox-button-opt-${ele.value}`}
              />
              <label
                htmlFor={`checkbox-button-opt-${ele.value}`}
                className={style.label}
                onClick={() => selectDay(ele.value)}
              >
                {ele.display}
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DayPicker;
