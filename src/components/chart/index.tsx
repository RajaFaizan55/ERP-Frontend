import Chart from 'react-apexcharts';

import style from './chart.module.scss';

interface Props {
  children: any;
  options: any;
  series: any;
  type: any;
}

const CustomChart = ({
  children,
  options,
  series,
  type,
}: Props): JSX.Element => {
  return (
    <div className={style.margin}>
      <Chart options={options} series={series} type={type} width="100%" />
      {children}
    </div>
  );
};

export default CustomChart;
