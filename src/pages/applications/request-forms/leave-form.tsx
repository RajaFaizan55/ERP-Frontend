import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'components/modal';
import NavLinks from 'components/nav-links';
import Button from 'components/button';
import ApplicationService from 'services/application-service';
import NotificationService from 'services/notification-service';

import style from './request.module.scss';
import cross from 'assets/employee-page/Path 306.svg';
import moment from 'moment';
import { mySocket } from 'app';

interface Props {
  openLeave: boolean;
  setOpenLeave: any;
  cardsData: any;
  formType: { type: string };
  update?: boolean;
  applicationData?: any;
  getAllApplications?: any;
}

const LeaveForm = ({
  openLeave,
  setOpenLeave,
  cardsData,
  formType,
  update,
  applicationData,
  getAllApplications,
}: Props) => {
  const lastWeek = new Date().setDate(new Date().getDate() + 7);
  const oneMonth = new Date().setDate(new Date().getDate() + 30);

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, control, reset, setValue } = useForm({
    resolver: yupResolver(validations[formType?.type]),
    mode: 'all',
  });

  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const { currentUser } = useAppSelector((state: any) => state.app);

  const addNotification = async (data: any) => {
    await NotificationService.addNotification({
      employeeId: data.employeeId,
      module: data.module,
      description: data.description,
    });

    mySocket.emit('send_notification', {
      employeeId: data.employeeId,
      room: '123456789',
      executive: data.executive,
    });
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const temp = { ...data };
    for (const key in temp) {
      if (key === 'employeeId' || key === 'reason' || !temp[key]) {
        delete temp[key];
      }
    }
    const finalPayload = {
      type: formType?.type,
      reason: data?.reason,
      employeeId: data?.employeeId,
      applicationData: { ...temp },
    };

    if (!update) {
      const res = await ApplicationService.applyApplication(finalPayload);
      if (res.status === 201) {
        setOpenLeave(false);
        addNotification({
          employeeId: finalPayload.employeeId,
          module: finalPayload.type,
          description: `${finalPayload.employeeId} applied for ${finalPayload.type}`,
          executive: true,
        });
      }
      setLoading(false);
    } else {
      const res = await ApplicationService.updateApplication({
        ...finalPayload,
        _id: applicationData?._id,
      });
      if (res.status === 200) {
        getAllApplications();
        setOpenLeave(false);
        addNotification({
          employeeId: finalPayload.employeeId,
          module: finalPayload.type,
          description: `${finalPayload.type} updated! ${finalPayload.employeeId} applied for ${finalPayload.type}`,
          executive: true,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'Employee') {
      setValue('employeeId', currentUser?.employeeId);
    }
  }, [currentUser, setValue]);

  useEffect(() => {
    if (update) {
      let type: any = formType?.type;
      if (type === 'Advance Salary' || type === 'Gate Pass') {
        type = type.split(' ');
        type = [type[0]?.toLocaleLowerCase(), type[1]].join('');
      } else {
        type = type?.toLocaleLowerCase();
      }
      if (type === 'leave') {
        return reset({
          ...applicationData[type],
          startDate: new Date(applicationData[type]?.startDate),
          endDate: new Date(applicationData[type]?.endDate),
          reason: applicationData?.reason,
          employeeId: applicationData?.employeeId,
        });
      }
      if (type === 'resignation') {
        return reset({
          ...applicationData[type],
          resignationDate: new Date(applicationData[type]?.resignationDate),
          lastWorkingDate: new Date(applicationData[type]?.lastWorkingDate),
          reason: applicationData?.reason,
          employeeId: applicationData?.employeeId,
        });
      }

      if (applicationData)
        return reset({
          ...applicationData[type],
          reason: applicationData?.reason,
          employeeId: applicationData?.employeeId,
        });
    }
  }, [update, reset, applicationData, formType]);

  const handleDateChange = (e: string, name: string) => {
    setDate({ ...date, [name]: e });
  };

  return (
    <>
      <Modal
        open={openLeave}
        className={style.modalWrapper}
        handleClose={() => setOpenLeave(false)}
      >
        <div className={style.modal}>
          <NavLinks links={[{ title: `${formType?.type}`, left: '50px' }]} />
          <img
            src={cross}
            alt=""
            className={style.img}
            style={{ cursor: 'pointer' }}
            onClick={() => setOpenLeave(false)}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.mainPadding}>
            <div className={style.grid}>
              {cardsData?.map((ele: any, index: any) => {
                const Component = ele.component;

                return (
                  <div
                    key={index}
                    style={{
                      gridColumn:
                        ele.key === 'textArea' || ele.key === 'table'
                          ? '1 / -1'
                          : '',
                    }}
                  >
                    {ele.key === 'select' ? (
                      <Component
                        name="leaveType"
                        label={ele.label}
                        placeHolder={ele.placeholder}
                        options={ele.options}
                        inputRef={register}
                        error={errors?.leaveType ? true : false}
                        errorMessage={errors?.leaveType?.message}
                      />
                    ) : (
                      <Component
                        name={ele.name}
                        type={ele.type}
                        control={ele?.key === 'date' ? control : ''}
                        label={ele.label}
                        minDate={
                          formType.type === 'Loan' ||
                          formType.type === 'Resignation'
                            ? moment().toDate()
                            : ele?.name === 'resignationDate' ||
                              ele?.name === 'lastWorkingDate' ||
                              ele?.name === 'endDate'
                            ? date.startDate || new Date()
                            : ele?.name === 'startDate' && new Date()
                        }
                        maxDate={
                          formType.type === 'Resignation'
                            ? ele?.key === 'date' &&
                              (ele?.name === 'resignationDate' ||
                                ele?.name === 'lastWorkingDate') &&
                              oneMonth
                            : ele?.key === 'date' &&
                              (ele?.name === 'startDate' ||
                                ele?.name === 'endDate') &&
                              lastWeek
                        }
                        placeholder={ele.placeholder}
                        inputRef={ele.key !== 'date' ? register : ''}
                        error={errors[ele?.name]}
                        errorMessage={errors[ele?.name]?.message}
                        handleChange={ele?.key === 'date' && handleDateChange}
                        id={index}
                        required={ele?.type === 'time' && ele?.required}
                        readOnly={
                          ele?.name === 'employeeId' &&
                          currentUser?.role === 'Employee'
                            ? true
                            : false
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className={style.buttonDiv}>
              <Button
                text="Apply"
                btnClass={style.btn}
                type="submit"
                isLoading={loading}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default LeaveForm;

const validations: any = {
  Leave: yup.object().shape({
    startDate: yup.string().required('From date is required'),
    endDate: yup.string().required('To date is required'),
    employeeId: yup.string().required('Employee Id is required'),
    reason: yup.string().required('Reason is required'),
    leaveType: yup.string().required('Leave type is required'),
  }),

  Resignation: yup.object().shape({
    employeeId: yup.string().required('Employee Id is required'),

    reason: yup.string().required('Description is required'),
    resignationDate: yup.string().required('Resignation date is required'),
    lastWorkingDate: yup.string().required('Last working date is required'),
  }),
  Loan: yup.object().shape({
    requiredAmount: yup.string().required('Amount is required'),
    employeeId: yup.string().required('Employee Id is required'),
    reason: yup.string().required('Description is required'),
    loanDate: yup.string().required('Loan date is required'),
  }),

  'Advance Salary': yup.object().shape({
    employeeId: yup.string().required('Employee Id is required'),
    requiredAmount: yup.string().required('Required amount is required'),
    reason: yup.string().required('Reason is required'),
  }),

  'Gate Pass': yup.object().shape({
    employeeId: yup.string().required('Employee Id is required'),
    timeOut: yup.string().required('Time Out is required'),
    timeIn: yup.string().required('Time In is required'),
    reason: yup.string().required('Reason is required'),
  }),

  Stationary: yup.object().shape({
    employeeId: yup.string().required('Employee Id is required'),
    reason: yup.string().required('Description is required'),
    // stationaryDate: yup.string().required('Date is required'),
  }),

  Uniform: yup.object().shape({
    employeeId: yup.string().required('Employee Id is required'),
    reason: yup.string().required('Description is required'),
    // uniformDate: yup.string().required('Date is required'),
  }),

  Others: yup.object().shape({
    employeeId: yup.string().required('Employee Id is required'),
    reason: yup.string().required('Description is required'),
    subject: yup.string().required('Subject is required'),
  }),
};
