import { Dispatch, SetStateAction } from 'react';

import Modal from 'components/modal';
import Input from 'components/input';
import Button from 'components/button';
import TextArea from 'components/textarea';
import NavLinks from 'components/nav-links';
import ProgressBar from 'components/progress-bar';
import MobileButton from 'components/button/mobile-button';

import { useAddPolicy } from './helper';

import back from 'assets/employee-page/Group 1996.png';
import tickIcon from 'assets/mobile-view/tickIcon.svg';
import style from '../tax/tax.module.scss';

interface Props {
  open: boolean;
  policyData: any;
  getPolicies: any;
  updateModal: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPolicyData: Dispatch<SetStateAction<any>>;
  setUpdateModal: Dispatch<SetStateAction<boolean>>;
  setCurrentPolicyId: Dispatch<SetStateAction<string>>;
}

const AddPolicy = ({
  open,
  setOpen,
  policyData,
  updateModal,
  getPolicies,
  setPolicyData,
  setUpdateModal,
  setCurrentPolicyId,
}: Props) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    uploadPercentage,
    handleClose,
    files,
    setFiles,
    fileRef,
  } = useAddPolicy({
    policyData,
    getPolicies,
    setOpen,
    updateModal,
    setUpdateModal,
    setPolicyData,
    setCurrentPolicyId,
  });

  return (
    <>
      <Modal
        open={open}
        className={style.modalWrapper}
        handleClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.modal}>
            <NavLinks
              links={[
                {
                  title: updateModal ? 'Update Policy' : 'Add Policy',
                  left: '50px',
                },
              ]}
            />
            <img
              src={back}
              alt=""
              className={style.img}
              style={{ cursor: 'pointer' }}
              onClick={handleClose}
            />
          </div>

          <div className={style.add}>
            <Input
              name="title"
              label="Policy Name"
              type="text"
              placeholder="policy"
              inputRef={register}
              error={errors?.title}
              errorMessage={errors?.title?.message}
            />
            <TextArea
              name="description"
              label="Description"
              placeholder="description "
              inputRef={register}
              error={errors?.description}
              errorMessage={errors?.description?.message}
            />
            <Input
              name="file"
              label="Choose Policy File "
              type="file"
              placeholder="file"
              onChange={(e) => setFiles(e.target.files)}
              inputRef={fileRef}
              extension={'.pdf'}
            />

            <ProgressBar
              value={uploadPercentage}
              maxVal={100}
              id={'asd'}
              className={'asd'}
            />
          </div>

          <div className={style.webBtnDiv}>
            <Button
              text={updateModal ? 'Update' : 'Submit'}
              btnClass={style.btn}
              type="submit"
            />
          </div>

          <div className={style.mobileBtnDiv}>
            <MobileButton
              mobileIcon={tickIcon}
              btnClass={style.mobileBtn}
              type="button"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddPolicy;
