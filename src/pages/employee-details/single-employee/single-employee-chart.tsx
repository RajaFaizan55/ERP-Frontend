import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import { options } from './employee-data-helper';

import style from './single-employee.module.scss';

interface Props {
  chartData: any;
}

const SingleEmployeeChart = ({ chartData }: Props) => {
  const [donutSeries, setDonutSeries] = useState([0, 0, 0, 0]);
  const [donutOption] = useState<any>(options);

  useEffect(() => {
    if (chartData && Object.keys(chartData)?.length > 0) {
      const { present, absent, holidays, vacations }: any = { ...chartData };
      const tempArr = [];
      tempArr.push(
        present?.percentage,
        absent?.percentage,
        holidays?.percentage,
        vacations?.percentage,
      );
      setDonutSeries([...tempArr]);
    }
  }, [chartData]);

  return (
    <div className={style.attendanceBorder}>
      <h2 className={style.attendance}>Attendance Details</h2>
      <div className={style.chart}>
        <div className={style.chartDiv}>
          <h2 style={{ marginTop: '20px' }}>Attendance Details</h2>
          <Chart type="donut" series={donutSeries} options={donutOption} />
          <div className={style.innerChatDiv}>
            <h5 className={style.value}>
              {chartData?.present?.percentage
                ? chartData?.present?.percentage
                : 0}
              %
            </h5>
          </div>
        </div>
        <div>
          <div className={style.flex1}>
            <div
              className={style.legendShape}
              style={{ backgroundColor: '#57B993' }}
            ></div>
            <p className={style.legend1}>Present</p>
            <p className={style.legend}>
              {chartData?.present?.days ? chartData?.present?.days : 0}
            </p>
          </div>
          <div className={style.flex1}>
            <div
              className={style.legendShape}
              style={{ backgroundColor: '#F55E5E' }}
            ></div>
            <p className={style.legend1}>Absent</p>
            <p className={style.legend}>
              {chartData?.absent?.days ? chartData?.absent?.days : 0}
            </p>
          </div>
          <div className={style.flex1}>
            <div
              className={style.legendShape}
              style={{ backgroundColor: '#ffbd08' }}
            ></div>
            <p className={style.legend1}>Holidays</p>
            <p className={style.legend}>
              {chartData?.holidays?.days ? chartData?.holidays?.days : 0}
            </p>
          </div>
          <div className={style.flex1}>
            <div
              className={style.legendShape}
              style={{ backgroundColor: '#31A6FF' }}
            ></div>
            <p className={style.legend1}>Vacations</p>
            <p className={style.legend}>
              {chartData?.vacations?.days ? chartData?.vacations?.days : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEmployeeChart;
