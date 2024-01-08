import React, { useState } from 'react';

import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import style from './date.module.scss';
import date from 'assets/employee-page/calendar-line.png';

interface Props {
  setCalendar?: any;
  variant?: any;
}

const DatePicker1 = ({ variant, setCalendar }: Props) => {
  // const navigate = useNavigate();
  const [state, setState] = useState<any>({
    start: moment().subtract(6, 'days'),
    end: moment(),
  });
  const { start, end } = state;
  const labelStart = moment(start).format('MMMM D, YYYY');
  const labelEnd = moment(end).format('MMMM D, YYYY');

  const handleCallback = (start: any, end: any) => {
    const tempStart = moment(start).format();
    const tempEnd = moment(end).format();
    setState({ start: tempStart, end: tempEnd });
  };

  return (
    <>
      <div className={style.datePickerContainer}>
        <DateRangePicker
          initialSettings={{
            ...initialSettings[variant],
          }}
          onCallback={handleCallback}
          onApply={() => setCalendar(state)}
        >
          <div className={style.contentDivContainer}>
            <div className={style.contentDiv}>
              <span>{labelStart}</span>
              <span>&nbsp;&#8211;&nbsp;</span>
              <span>{labelEnd}</span>
            </div>
            <div className={style.iconDiv}>
              <img src={date} alt="" />
            </div>
          </div>
        </DateRangePicker>
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
