import React, { useState } from 'react';

import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import style from './date.module.scss';
import date from '../../assets/employee-page/calendar-line.png';

interface Props {
  label?: string;
  id?: string;
  name?: any;
  control?: any;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  dateVal?: any;
  error?: any;
  setDateVal?: any;
  setCalendar?: any;
  setLabel?: any;
  required?: boolean;
  datePickerRef?: any;
  variant?: any;
}

const DatePicker1 = ({
  error,
  name,
  control,
  label,
  setLabel,
  placeholder,
  variant,
  setCalendar,
  id,
}: Props) => {
  const [state, setState] = useState<any>({
    start: moment().subtract(6, 'days'),
    end: moment(),
  });
  const { start, end } = state;
  const labelStart = moment(start).format('MMMM D, YYYY');
  const labelEnd = moment(end).format('MMMM D, YYYY');
  const handleCallback = (start: any, end: any, label: any) => {
    const tempStart = moment(start).format();
    const tempEnd = moment(end).format();
    setState({ start: tempStart, end: tempEnd });
    if (setLabel) {
      setLabel(label);
    }
  };

  return (
    <>
      <div className={style.main}>
        <label
          style={{
            color: error ? '#ff5050' : '#6E6D6D',
          }}
        >
          {label}
        </label>
        <div
          className={style.inpDiv}
          style={{
            border: error ? '1px solid #ff5050' : ' 1px solid #d9d9d9',
            color: error ? '#ff5050' : '#6e6d6d',
          }}
        >
          {/* <Controller
            name={name}
            control={control}
            defaultValue={null}
            rules={{ required: true }}
            render={({ onChange, value }) => ( */}
          <div style={{ background: 'red' }}>
            <DateRangePicker
              initialSettings={{
                ...initialSettings[variant],
              }}
              onCallback={handleCallback}
              onApply={() => setCalendar(state)}
            >
              <div id="reportrange">
                <span>{labelStart}</span>
                <span style={{ color: 'red' }}>&nbsp;&#8211;&nbsp;</span>
                <span>{labelEnd}</span>
              </div>
            </DateRangePicker>
          </div>
          {/* )}
          /> */}

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
        {/* <div style={{ color: 'red' }}>
            {errors.birthDate && 'please select'}
          </div> */}
      </div>
    </>
  );
};

export default DatePicker1;

const initialSettings: any = {
  single: {
    singleDatePicker: true,
    startDate: moment().subtract(29, 'days').format(),
  },
  double: {
    startDate: moment().subtract(6, 'days').toDate(),
    endDate: moment().toDate(),
    ranges: {
      Today: [moment().toDate(), moment().toDate()],
      Yesterday: [
        moment().subtract(1, 'days').toDate(),
        moment().subtract(1, 'days').toDate(),
      ],
      'Last 7 Days': [moment().subtract(6, 'days').toDate(), moment().toDate()],
      'Last 30 Days': [
        moment().subtract(29, 'days').toDate(),
        moment().toDate(),
      ],
      'This Month': [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
      ],
      'Last Month': [
        moment().subtract(1, 'month').startOf('month').toDate(),
        moment().subtract(1, 'month').endOf('month').toDate(),
      ],
    },
  },
};
