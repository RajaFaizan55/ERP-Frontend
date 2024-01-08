import React, { Dispatch, memo, SetStateAction } from 'react';

import Modal from 'components/modal';
import Button from 'components/button';

import style from './delete-modal.module.scss';
import cross from 'assets/settings-page/Path 306.png';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete?: () => void;
  btnLoader?: boolean;
}

const DeletePopup = ({ open, setOpen, handleDelete, btnLoader }: Props) => {
  return (
    <>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <div className={style.emailPopupContentDiv}>
          <div className={style.headerDiv}>
            <img src={cross} alt="" />
            <h1>Are you Sure?</h1>
          </div>
          <div className={style.flex}>
            <button onClick={() => setOpen(false)} className={style.btn1}>
              Cancel
            </button>
            <Button
              text="Delete"
              handleClick={() => {
                handleDelete && handleDelete();
              }}
              btnClass={style.button}
              isLoading={btnLoader}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(DeletePopup);
