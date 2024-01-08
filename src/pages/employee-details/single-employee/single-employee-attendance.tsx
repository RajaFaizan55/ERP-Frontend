import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import moment from 'moment';

import { columns } from './employee-data-helper';
import Pagination from 'components/pagination';
import NewTable from 'components/table/new-table';
import style from './single-employee.module.scss';

interface Props {
  attendanceData: [];
  setPage: Dispatch<SetStateAction<number>>;
  count: number;
  pageSize: number;
  page: number;
}

const SingleEmployeeAttendance = ({
  attendanceData = [],
  setPage,
  count,
  pageSize,
  page,
}: Props) => {
  const [tableRow, setTableRow] = useState<any>([]);

  useEffect(() => {
    if (attendanceData?.length) {
      const temp = [...attendanceData];
      temp.forEach((ele: any) => {
        ele.date = moment(ele.date).format('DD/MM/YYYY');
      });
      setTableRow([...temp]);
    }
  }, [attendanceData]);

  return (
    <>
      <div className={style.attendanceTableDown}>
        <NewTable columns={columns} rows={tableRow} />
      </div>
      {count > pageSize && (
        <Pagination
          setPage={setPage}
          count={count}
          pageSize={pageSize}
          page={page}
        />
      )}
    </>
  );
};

export default SingleEmployeeAttendance;
