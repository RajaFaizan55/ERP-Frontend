import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'components/modal';
import NavLinks from 'components/nav-links';
import Input from 'components/input';
import Button from 'components/button';
import MobileButton from 'components/button/mobile-button';

import style from '../tax.module.scss';
import back from 'assets/employee-page/Group 1996.png';
import TaxService from 'services/tax-service';
import tickIcon from 'assets/mobile-view/tickIcon.svg';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  getTaxSlabsData: () => void;
  updateId: string;
}

const AddAttendance = ({ open, setOpen, getTaxSlabsData, updateId }: Props) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (updateId) {
      await TaxService.updateTaxSlab(updateId, data);
    } else {
      await TaxService.AddTaxSlab(data);
    }
    getTaxSlabsData();
    setLoading(false);
    setOpen(false);
  };

  useEffect(() => {
    if (updateId) {
      const getCurrentSlab = async () => {
        const res = await TaxService.getTaxSlabById(updateId);
        if (res?.status === 200) {
          reset({
            upper: res.data.tax.upper,
            lower: res.data.tax.lower,
            fixTax: res.data.tax.fixTax,
            taxRate: res.data.tax.taxRate,
            lessLimit: res.data.tax.lessLimit,
          });
        }
      };
      getCurrentSlab();
    } else {
      reset({});
    }
  }, [updateId, reset]);

  return (
    <>
      <Modal
        open={open}
        className={style.modalWrapper}
        handleClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.modal}>
            <NavLinks links={[{ title: 'Add Tax-Slab', left: '50px' }]} />
            <img
              src={back}
              alt=""
              className={style.img}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            />
          </div>

          <div className={style.add}>
            <Input
              name="lower"
              label="Lower"
              type="number"
              placeholder="lower"
              inputRef={register}
              error={errors?.lower}
              errorMessage={errors?.lower?.message}
            />
            <Input
              name="upper"
              label="Upper "
              type="number"
              placeholder="upper"
              inputRef={register}
              error={errors?.upper}
              errorMessage={errors?.upper?.message}
            />
            <Input
              name="fixTax"
              label="Fix Tax"
              type="number"
              placeholder="fix tax"
              inputRef={register}
              error={errors?.fixTax}
              errorMessage={errors?.fixTax?.message}
            />
            <Input
              name="taxRate"
              label="Tax Rate"
              type="number"
              step="0.01"
              placeholder="tax rate"
              inputRef={register}
              error={errors?.taxRate}
              errorMessage={errors?.taxRate?.message}
            />
            <Input
              name="lessLimit"
              label="Less Limit"
              type="number"
              placeholder="less limit"
              inputRef={register}
              error={errors?.lessLimit}
              errorMessage={errors?.lessLimit?.message}
            />
          </div>

          <div className={style.webBtnDiv}>
            <Button
              text={'Save Changes'}
              btnClass={style.btn}
              type="submit"
              isLoading={loading}
            />
          </div>

          <div className={style.mobileBtnDiv}>
            <MobileButton
              mobileIcon={tickIcon}
              btnClass={style.mobileBtn}
              type="submit"
              isLoading={loading}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddAttendance;

const schema = yup.object().shape({
  lower: yup
    .number()
    .typeError('Lower is required field')
    .lessThan(yup.ref('upper'), 'Lower must be less than upper amount'),
  upper: yup.number().typeError('Upper is required field'),
  fixTax: yup.string().required('Fix Tax is required field'),
  taxRate: yup
    .number()
    .typeError('Tax Rate is required field')
    .max(50, 'Tax Rate must be less than or equal to 50'),
  lessLimit: yup.string().required('Less Limit is required field'),
});
