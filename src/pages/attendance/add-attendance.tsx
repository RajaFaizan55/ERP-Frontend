import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'components/modal';
import Input from 'components/input';
import Radio from 'components/radio';
import Button from 'components/button';
import Select from 'components/select';
import NavLinks from 'components/nav-links';
import DatePicker from 'components/date-picker';
import MobileButton from 'components/button/mobile-button';

import AttendanceService from 'services/attendance-service';
import NotificationService from 'services/notification-service';

import style from './attendance.module.scss';
import back from 'assets/employee-page/Group 1992.svg';
import tickIcon from 'assets/mobile-view/tickIcon.svg';
import { mySocket } from 'app';

interface Props {
  open?: any;
  setOpen?: any;
  getAttendanceData: () => void;
  attendanceId: string;
  setAttendanceId: Dispatch<SetStateAction<string>>;
  employeeIds: any;
}

const AddAttendance = ({
  open,
  setOpen,
  getAttendanceData,
  attendanceId,
  setAttendanceId,
  employeeIds,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, reset, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const addNotification = async (data: any) => {
    await NotificationService.addNotification({
      employeeId: data.employeeId,
      module: data.module,
      description: data.description,
    });

    mySocket.emit('send_notification', {
      employeeId: data.employeeId,
      room: '123456789',
    });
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    if (attendanceId) {
      const res = await AttendanceService.updateAttendance(attendanceId, data);
      if (res.status === 200) {
        setOpen(false);
        setAttendanceId('');
        getAttendanceData();
        addNotification({
          employeeId: data.employeeId,
          module: 'Attendance',
          description:
            data.status === 'Present'
              ? `Attendance Updated! ${data.employeeId} logins at ${data.loginTime}`
              : `Attendance Updated! ${data.employeeId} is absent`,
        });
      }
      setIsLoading(false);
    } else {
      const res = await AttendanceService.addAttendance(data);

      if (res.status === 200) {
        setOpen(false);
        getAttendanceData();
        addNotification({
          employeeId: data.employeeId,
          module: 'Attendance',
          description:
            data.status === 'Present'
              ? `${data.employeeId} logins at ${data.loginTime}`
              : `${data.employeeId} is absent`,
        });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (attendanceId) {
      const getCurrentAttendance = async (id: string) => {
        const res = await AttendanceService.getAttendanceById(id);
        if (res.status === 200) {
          reset({
            ...res.data,
            date: new Date(res.data.date),
          });
        }
      };
      getCurrentAttendance(attendanceId);
    } else {
      reset({});
    }
  }, [attendanceId, reset]);

  return (
    <>
      <Modal
        open={open}
        className={style.modalWrapper}
        handleClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.modal}>
            <NavLinks links={[{ title: 'Attendance Details', left: '30px' }]} />
            <img
              src={back}
              alt=""
              className={style.img}
              onClick={() => setOpen(false)}
            />
          </div>

          <div className={style.add}>
            <Select
              label="Employee ID"
              name="employeeId"
              options={employeeIds}
              inputRef={register}
              placeHolder="Select Employee Id"
              error={errors?.employeeId}
              errorMessage={errors?.employeeId?.message}
            />
            <Input
              name="loginTime"
              label="Login Time"
              type="time"
              placeholder="Login Time"
              inputRef={register}
              error={errors?.loginTime}
              errorMessage={errors?.loginTime?.message}
            />
            <Input
              name="logoutTime"
              label="Logout Time"
              type="time"
              placeholder="Logout Time"
              inputRef={register}
              error={errors?.logoutTime}
              errorMessage={errors?.logoutTime?.message}
            />
            <DatePicker
              label="Date"
              name="date"
              id="1"
              placeholder="Date"
              control={control}
              error={errors?.date}
            />
            <div style={{ marginTop: '12px' }}>
              <label className={style.label}>Status</label>

              <div className={style.radio}>
                <Radio
                  name="status"
                  label="Present"
                  radioValue={'Present'}
                  radioRef={register}
                  error={errors?.status}
                  errorMessage={errors?.status?.message}
                />
                <div className={style.sec}>
                  <Radio
                    name="status"
                    label="Absent"
                    radioValue={'Absent'}
                    radioRef={register}
                    error={errors?.status}
                    errorMessage={errors?.status?.message}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.webBtnDiv}>
            <Button
              text="Save Details"
              btnClass={style.btn}
              type="submit"
              isLoading={isLoading}
            />
          </div>

          <div className={style.mobileBtnDiv}>
            <MobileButton
              mobileIcon={tickIcon}
              btnClass={style.mobileBtn}
              type="submit"
              isLoading={isLoading}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddAttendance;

const schema = yup
  .object()
  .shape({
    employeeId: yup.string().required(),
    status: yup.string().required(),
    loginTime: yup.string().when('status', {
      is: 'Present',
      then: yup.string().required(),
    }),
    logoutTime: yup.string().optional(),
    date: yup.date().required(),
  })
  .required();
