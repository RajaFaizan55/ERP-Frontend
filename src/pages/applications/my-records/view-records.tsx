/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { mySocket } from 'app';

import Modal from 'components/modal';
import Button from 'components/button';
import NavLinks from 'components/nav-links';
import LeaveForm from '../request-forms/leave-form';

import { useAppSelector } from 'store/hooks';
import ApplicationService from 'services/application-service';
import NotificationService from 'services/notification-service';
import cross from 'assets/employee-page/Path 306.svg';
import style from './records.module.scss';
import editIcon from 'assets/editIcon.svg';
import deleteIcon from 'assets/deleteIcon.svg';
import { cardsData } from '../request-forms/applications.helper';

interface Props {
  open?: any;
  setOpen?: any;
  currentApplicationId: string;
  getAllApplications: () => void;
}

interface Application {
  _id: string;
  applicationDate: string;
  employeeId: string;
  name: string;
  reason: string;
  status: string;
  type: string;
}

const ViewRecords = ({
  open,
  setOpen,
  currentApplicationId,
  getAllApplications,
}: Props) => {
  const { currentUser } = useAppSelector((state) => state.app);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [isLoadingAccepted, setIsLoadingAccepted] = useState<boolean>(false);
  const [isLoadingRejected, setIsLoadingRejected] = useState<boolean>(false);

  const [applicationData, setApplicationData] =
    useState<Application>(applicationInitial);

  const getApplication = async () => {
    const res = await ApplicationService.getApplicationById(
      currentApplicationId,
    );
    if (res.status === 200) {
      let temp = res?.data?.application;
      temp &&
        (temp.applicationDate = moment(temp?.applicationDate).format(
          'MM/DD/YYYY',
        ));
      setApplicationData(temp);
    }
  };

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

  const updateApplication = async (status: string) => {
    if (status === 'Accepted') {
      setIsLoadingAccepted(true);
    } else {
      setIsLoadingRejected(true);
    }
    const temp: any = applicationData;
    let tempType: any = temp.type
      .split(' ')
      .join()
      .replace(/\,/g, '')
      .split('');
    tempType[0] = tempType[0].toLowerCase();
    tempType = tempType.join().replace(/\,/g, '');
    const applicationDataObj = temp[tempType];
    delete temp[tempType];
    const res = await ApplicationService.updateApplication({
      _id: temp._id,
      employeeId: temp.employeeId,
      reason: temp.reason,
      type: temp.type,
      applicationData: applicationDataObj,
      status,
    });
    if (res.status === 200) {
      getAllApplications();
      setOpen(false);
      addNotification({
        employeeId: temp.employeeId,
        module: temp.type,
        description: `${temp.employeeId} your ${temp.type} application has been ${status}`,
      });
    }
    if (status === 'Accepted') {
      setIsLoadingAccepted(false);
    } else {
      setIsLoadingRejected(false);
    }
  };

  const deleteApplication = async () => {
    const res = await ApplicationService.deleteApplication(
      currentApplicationId,
    );

    if (res.status === 200) {
      getAllApplications();
      setOpen(false);
    }
  };

  useEffect(() => {
    if (currentApplicationId) getApplication();
  }, [currentApplicationId]);

  return (
    <>
      <Modal
        open={open}
        className={style.modalWrapper}
        handleClose={() => setOpen(false)}
      >
        <form>
          <div className={style.modal}>
            <NavLinks links={[{ title: 'Record', left: '65px' }]} />

            <img
              src={cross}
              alt=""
              className={style.img}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            />
            {applicationData?.status && applicationData?.status === 'Pending' && (
              <div className={style.icons} style={{ marginTop: '50px' }}>
                <>
                  <img
                    className={style.pencilIcon}
                    onClick={() => {
                      setOpen(false);
                      setOpenEdit(true);
                    }}
                    src={editIcon}
                    alt="editIcon"
                  />
                  <img
                    onClick={() => {
                      deleteApplication();
                    }}
                    className={style.trashIcon}
                    src={deleteIcon}
                    alt="deleteIcon"
                  />
                </>
              </div>
            )}
          </div>

          <div className={style.view}>
            <h2>Apply For {applicationData?.type}</h2>
            <p>{applicationData?.reason}</p>
            <h5>Name: {applicationData?.name}</h5>
            <h5>Employee ID: {applicationData?.employeeId}</h5>
            <h5>
              Status:{' '}
              <span style={{ color: status[applicationData?.status] }}>
                {applicationData?.status}
              </span>
            </h5>
            <h5>Date: {applicationData?.applicationDate}</h5>
          </div>
          {applicationData?.status === 'Pending' &&
            (currentUser?.role === 'Admin' ||
              currentUser?.role === 'Human Resource') && (
              <div className={style.btnDiv}>
                <Button
                  text={'Rejected'}
                  btnClass={style.btn}
                  type="button"
                  isLoading={isLoadingRejected}
                  handleClick={() => {
                    updateApplication('Rejected');
                  }}
                />
                <Button
                  text={'Accepted'}
                  type="button"
                  btnClass={style.acceptBtn}
                  isLoading={isLoadingAccepted}
                  handleClick={() => {
                    updateApplication('Accepted');
                  }}
                />
              </div>
            )}
        </form>
      </Modal>

      {openEdit && (
        <LeaveForm
          openLeave={openEdit}
          setOpenLeave={setOpenEdit}
          cardsData={
            cardsData.find((x: any) => x.type === applicationData?.type)?.form
          }
          formType={{ type: applicationData?.type }}
          update={true}
          applicationData={applicationData}
          getAllApplications={getAllApplications}
        />
      )}
    </>
  );
};

export default ViewRecords;

const applicationInitial = {
  _id: '',
  applicationDate: '',
  employeeId: '',
  name: '',
  reason: '',
  status: '',
  type: '',
};

const status: any = {
  Accepted: '#57b993',
  Rejected: '#ff2020',
};
