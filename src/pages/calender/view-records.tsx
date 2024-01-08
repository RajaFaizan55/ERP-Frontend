/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { Dispatch, SetStateAction } from 'react';

import Modal from 'components/modal';
import NavLinks from 'components/nav-links';

import style from '../applications/my-records/records.module.scss';
import editIcon from 'assets/editIcon.svg';
import deleteIcon from 'assets/deleteIcon.svg';
import cross from 'assets/employee-page/Path 306.svg';
import { useSelector } from 'react-redux';

interface Props {
  setUpdateEventId: Dispatch<SetStateAction<string>>;
  open?: any;
  setOpen?: any;
  setOpenEditModal?: any;
  eventData?: any;
  setOpenDelete?: any;
}

const ViewRecords = ({
  open,
  setOpen,
  eventData,
  setOpenDelete,
  setUpdateEventId,
  setOpenEditModal,
}: Props) => {
  const { currentUser } = useSelector((state: any) => state.app);
  return (
    <>
      <Modal
        open={open}
        className={style.modalWrapper}
        handleClose={() => setOpen(false)}
      >
        <form>
          <div className={style.modal}>
            <NavLinks links={[{ title: 'Event', left: '65px' }]} />

            <img
              src={cross}
              alt=""
              className={style.img}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            />
            {adminHr.includes(currentUser?.role) && (
              <div className={style.icons} style={{ marginTop: '50px' }}>
                <>
                  <img
                    className={style.pencilIcon}
                    onClick={() => {
                      setOpenEditModal(true);
                      setUpdateEventId(eventData?.extendedProps?._id);
                      setOpen(true);
                    }}
                    src={editIcon}
                    alt="editIcon"
                  />
                  <img
                    onClick={() => {
                      setOpenDelete(true);
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
            <h2>Title: {eventData?.title}</h2>
            <h5>Description: {eventData?.extendedProps?.description}</h5>
            <h5>Type: {eventData?.extendedProps?.type}</h5>
            <h5>Employee ID: {eventData?.extendedProps?.employeeId}</h5>
            <h5>Recursion: {eventData?.extendedProps?.recursion}</h5>
            <h5>Year: {eventData?.extendedProps?.year}</h5>
            <h5>Time: {eventData?.extendedProps?.time}</h5>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ViewRecords;

const adminHr = ['Admin', 'Human Resource'];
