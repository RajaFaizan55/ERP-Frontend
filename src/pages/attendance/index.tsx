/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Button from 'components/button';
import NavLinks from 'components/nav-links';
import AddAttendance from './add-attendance';
import CardContainer from 'components/card-container';
import Pagination from 'components/pagination';
import DeletePopup from 'components/delete-modal';
import { useAppSelector } from 'store/hooks';
import NewTable from 'components/table/new-table';
import MobileButton from 'components/button/mobile-button';
import Loading from 'components/loading';

import { columns } from './attendance-helper';
import AttendanceService from 'services/attendance-service';
import EmployeeService from 'services/employee-service';
import { Employee } from 'interfaces/employee';

import style from './attendance.module.scss';
import addSvg from 'assets/logo5.svg';
import plusIcon from 'assets/mobile-view/plusIcon.svg';

export interface AttendanceInt {
  id: string;
  date: string;
  employeeId: string;
  loginTime: string;
  logoutTime: string;
  name: string;
  status: string;
  totalHours: string;
}
const Attendance = () => {
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [attendanceId, setAttendanceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeIds, setEmployeeIds] = useState<string[] | []>([]);
  const [attendances, setAttendances] = useState<AttendanceInt[] | []>([]);
  const [columnsArr, setColumnsArr] = useState<any>([]);
  const { currentUser } = useAppSelector((state) => state.app);
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);

  const getAttendanceData = async () => {
    setLoading(true);
    const res = await AttendanceService.getAllAttendance({
      pageSize,
      page,
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(sorts && { sorts: JSON.stringify(sorts) }),
    });
    if (res.status === 200) {
      if (res.data.data?.length > 0) {
        const temp = [...res.data.data];
        temp.forEach((ele: any) => {
          ele.date = moment(ele.date).format('MM/DD/YYYY');
        });
        setAttendances(temp);
        setCount(res?.data?.count);
      }
      if (res.data.data?.length < 1 && page > 0) {
        setPage((pre) => pre - 1);
      }
    }
    setLoading(false);
  };

  const deleteAttendance = async () => {
    setDeleteLoader(true);
    const res = await AttendanceService.deleteAttendance(attendanceId);
    if (res.status === 200) {
      getAttendanceData();

      setDeleteModalOpen(false);
      setAttendanceId('');
    }
    setDeleteLoader(false);
  };

  useEffect(() => {
    if (currentUser?.role && currentUser?.role === 'Employee') {
      const tempArr = [...columns];
      tempArr.splice(tempArr.length - 1);
      setColumnsArr([...tempArr]);
    }
  }, [currentUser?.role]);

  useEffect(() => {
    getAttendanceData();
  }, [page, pageSize, filters, sorts]);

  useEffect(() => {
    const getEmployeeIds = async () => {
      const res = await EmployeeService.getAllEmployees({ pageSize: 1000 });
      if (res.status === 200) {
        const ids: string[] = [];

        res.data.employees.forEach((employee: Employee) => {
          ids.push(employee.employeeId);
        });
        setEmployeeIds(ids);
      }
    };
    currentUser?.role !== 'Employee' && getEmployeeIds();
  }, []);

  return (
    <>
      <CardContainer>
        <NavLinks links={[{ title: 'Attendance Details', left: '31px' }]} />
        {loading && (
          <div className={style.loaderDiv}>
            <Loading loaderClass={style.loadingStyle} />
          </div>
        )}

        <div style={{ padding: '0 10px' }}>
          <NewTable
            columns={columnsArr?.length ? columnsArr : columns}
            rows={attendances}
            tableHeight={style.tableHeight}
            handleDelete={(id: string) => setAttendanceId(id)}
            handleEdit={(id: string) => {
              setOpen(true);
              setAttendanceId(id);
            }}
            handleModalOpen={() => setDeleteModalOpen(true)}
            apiCall={AttendanceService.getAllAttendance}
            filters={filters}
            setFilters={setFilters}
            sorts={sorts}
            setSorts={setSorts}
            minWidth="1508px"
          />
        </div>
        <div>
          <Pagination
            setPage={setPage}
            count={count}
            pageSize={pageSize}
            page={page}
          />
          {currentUser?.role !== 'Employee' && (
            <>
              <div className={style.addBtnDiv}>
                <div className={style.addBtnChildDiv}>
                  <Button
                    text="Add Attendance"
                    icon={addSvg}
                    handleClick={() => {
                      setOpen(true);
                      setAttendanceId('');
                    }}
                  />
                </div>
              </div>

              <div>
                <MobileButton
                  mobileIcon={plusIcon}
                  handleClick={() => {
                    setOpen(true);
                    setAttendanceId('');
                  }}
                />
              </div>
            </>
          )}
        </div>
      </CardContainer>
      {open && (
        <AddAttendance
          open={open}
          setOpen={setOpen}
          getAttendanceData={() => {
            getAttendanceData();
          }}
          attendanceId={attendanceId}
          setAttendanceId={setAttendanceId}
          employeeIds={employeeIds}
        />
      )}
      {deleteModalOpen && (
        <DeletePopup
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          handleDelete={() => {
            deleteAttendance();
          }}
          btnLoader={deleteLoader}
        />
      )}
    </>
  );
};
export default Attendance;
