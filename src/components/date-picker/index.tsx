import React from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import style from './date.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import date from '../../assets/employee-page/calendar-line.png';

interface Props {
  label?: string;
  id?: string;
  className?: string;
  name?: any;
  control?: any;
  option?: any;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  defaultVal?: any;
  error?: any;
  setDateVal?: any;
  required?: boolean;
  datePickerRef?: any;
  minDate?: any;
  inputRef?: any;
  maxDate?: any;
  handleChange?: any;
  star?: string;
}

const DatePicker = ({
  error,
  name,
  control,
  label,
  className,
  placeholder,
  id,
  minDate,
  maxDate,
  defaultVal,
  handleChange,
  star,
}: Props) => {
  return (
    <>
      <div className={`${style.main} ${className}`}>
        {label && (
          <label className={style.label}>
            {label} <span style={{ color: 'red' }}>{star}</span>
          </label>
        )}
        <div
          className={style.inpDiv}
          style={{
            border: error ? '1px solid #ff5050' : ' 1px solid #d9d9d9',
            color: error ? '#ff5050' : '#6e6d6d',
            height: '45px',
          }}
        >
          <Controller
            name={name}
            control={control}
            defaultValue={defaultVal || null}
            rules={{ required: true }}
            render={({ onChange, value, name }) => (
              <ReactDatePicker
                id={id}
                className={style.datePicker}
                selected={value}
                onChange={(e) => {
                  handleChange?.(e, name);
                  onChange(e);
                }}
                placeholderText={placeholder}
                autoComplete="off"
                minDate={minDate && minDate}
                maxDate={maxDate && maxDate}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                monthsShown={1}
                fixedHeight
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                showPreviousMonths={false}
              />
            )}
          />

          <label htmlFor={id}>
            <div className={style.icon}>
              <img src={date} alt="" />
            </div>
          </label>
        </div>
        {error ? (
          <span className={style.errorMessage}>Date is required</span>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default DatePicker;
