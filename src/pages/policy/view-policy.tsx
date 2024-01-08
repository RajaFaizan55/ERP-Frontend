import { Dispatch, SetStateAction } from 'react';

import Modal from 'components/modal';
import Button from 'components/button';
import NavLinks from 'components/nav-links';

import { useViewPolicy } from './helper';

import editIcon from 'assets/editIcon.svg';
import deleteIcon from 'assets/deleteIcon.svg';
import cross from 'assets/employee-page/Path 306.svg';
import style from '../applications/my-records/records.module.scss';

interface Props {
  policyData: any;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentPolicyId: Dispatch<SetStateAction<string>>;
  setUpdateModal: Dispatch<SetStateAction<boolean>>;
}

const ViewPolicy = ({
  open,
  setOpen,
  setIsOpen,
  policyData,
  setUpdateModal,
  setDeleteModalOpen,
  setCurrentPolicyId,
}: Props) => {
  const {
    title,
    description,
    download,
    currentUser,
    handleClick,
    handleDelete,
    handleEdit,
  } = useViewPolicy({
    open,
    setOpen,
    setIsOpen,
    policyData,
    setUpdateModal,
    setDeleteModalOpen,
    setCurrentPolicyId,
  });

  return (
    <>
      <Modal
        open={open}
        className={style.modalWrapper}
        handleClose={() => setOpen(false)}
      >
        <form>
          <div className={style.modal}>
            <NavLinks links={[{ title: 'Policy', left: '65px' }]} />

            <img
              src={cross}
              alt=""
              className={style.img}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            />
            <div className={style.icons} style={{ marginTop: '50px' }}>
              {['Admin', 'Human Resource'].includes(currentUser.role) && (
                <>
                  <img
                    className={style.pencilIcon}
                    onClick={handleEdit}
                    src={editIcon}
                    alt="editIcon"
                  />
                  <img
                    className={style.trashIcon}
                    src={deleteIcon}
                    alt="deleteIcon"
                    onClick={handleDelete}
                  />
                </>
              )}
            </div>
          </div>
          <div className={style.view}>
            <h2>Title: {title}</h2>
            <h5>Description:{description}</h5>
          </div>

          <div className={style.btnDiv}>
            <Button
              text={'View'}
              type="button"
              handleClick={handleClick}
              btnClass={style.viewBtn}
            />
            <Button text={'Download'} type="button" handleClick={download} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ViewPolicy;
