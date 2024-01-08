import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Chart from 'react-apexcharts';
import moment from 'moment';

import ExpenseService from 'services/expense-service';

import { columns, total, options } from './explore-helper';

import style from '../expense.module.scss';
import DatePicker from 'components/date-picker';
import NewTable from 'components/table/new-table';

const Explore = ({ setIsLoading }: any) => {
  const [dateRange, setDateRange] = useState({
    fromDate: moment().subtract(6, 'days').format(),
    toDate: moment().format(),
    category: '',
  });
  const [tableRows, setTableRows] = useState<any>([]);
  const [donutSeries, setDonutSeries] = useState<any>([]);
  const [totalData, setTotalData] = useState([...total]);
  const [donutOption] = useState<any>(options(getChartSeriesData));
  const { control } = useForm();

  function getChartSeriesData(config: any) {
    setDateRange({ ...dateRange, category: config?.dataPointIndex });
  }

  const handleDateChange = (value: string, name: string) => {
    setDateRange({ ...dateRange, [name]: value });
  };

  useEffect(() => {
    const temp = [...donutSeries][0]?.data[dateRange.category]?.x || '';
    const getExploreData = async () => {
      setIsLoading(true);
      const params = {
        startDate: dateRange?.fromDate,
        endDate: dateRange?.toDate,
        category: temp,
      };
      const res = await ExpenseService.getExplore(params);
      if (res.status === 200) {
        setTableRows([...res?.data?.expenses]);
        setDonutSeries([{ data: [...res?.data?.chart] }]);
        setTotalData([...res?.data?.totalAmount]);
      }
      setIsLoading(false);
    };
    getExploreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  return (
    <>
      <div className={style.explore}>
        <div className={style.table}>
          <NewTable
            columns={columns}
            rows={tableRows}
            total={totalData}
            minWidth="603px"
            tableHeight={style.tableHeight}
          />
        </div>
        <div className={style.chartDiv}>
          <div className={style.datePicker}>
            <DatePicker
              label="From"
              name="fromDate"
              className={style.date}
              id="1"
              placeholder="To"
              control={control}
              defaultVal={new Date(dateRange?.fromDate)}
              maxDate={new Date(dateRange?.toDate)}
              handleChange={handleDateChange}
            />

            <DatePicker
              label="To"
              name="toDate"
              className={style.date}
              id="2"
              placeholder="From"
              control={control}
              defaultVal={new Date(dateRange?.toDate)}
              minDate={new Date(dateRange?.fromDate)}
              handleChange={handleDateChange}
            />
          </div>

          <Chart type="treemap" series={donutSeries} options={donutOption} />
        </div>
      </div>
    </>
  );
};

export default Explore;
