import React, { memo, useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'components/modal';
import NavLinks from 'components/nav-links';
import Input from 'components/input';
import Button from 'components/button';
import DatePicker from 'components/date-picker';
import Select from 'components/select';
import Radio from 'components/radio';
import MobileButton from 'components/button/mobile-button';
import ExpenseService from 'services/expense-service';

import style from '../expense.module.scss';
import back from 'assets/employee-page/back.svg';

import tickIcon from 'assets/mobile-view/tickIcon.svg';

interface Props {
  open: boolean;
  setOpen: any;
  singleId?: string;
  getAllExpenses?: any;
  setSingleId?: any;
  expenseData: any;
}
interface Data {
  date: string;
  category: string;
  description: string;
  amount: string;
  remarks: string;
}

const AddExpense = ({
  open,
  setOpen,
  singleId,
  getAllExpenses,
  setSingleId,
  expenseData,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: Data) => {
    setLoading(true);
    if (!singleId) {
      const res = await ExpenseService.addExpense(data);
      if (res) {
        getAllExpenses();
        setOpen(false);
      }
      setLoading(false);
    } else {
      const res = await ExpenseService.updateExpense(singleId, data);
      if (res) {
        getAllExpenses();
        setOpen(false);
      }
      setLoading(false);
    }
    setSingleId('');
  };

  useEffect(() => {
    if (singleId !== '') {
      let temp: any = [...expenseData];
      temp = temp.find((ele: any) => ele.id === singleId);
      reset({ ...temp, date: new Date(temp?.date) });
    } else {
      reset({});
    }
  }, [expenseData, singleId, reset]);

  return (
    <>
      <Modal
        open={open}
        className={style.modalWrapper}
        handleClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.modal}>
            <NavLinks links={[{ title: 'Expense Details', left: '37px' }]} />
            <img
              src={back}
              alt=""
              className={style.img}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(false);
                setSingleId('');
              }}
            />
          </div>

          <div className={style.add}>
            <DatePicker
              label="Date "
              name="date"
              id="1"
              placeholder="Date "
              control={control}
              error={errors?.date}
            />
            <div className={style.selectDiv}>
              <Select
                label="Expense Category"
                name="category"
                options={options}
                error={errors?.category}
                errorMessage={errors?.category?.message}
                placeHolder="Select Expense"
                inputRef={register}
              />
            </div>

            <div className={style.note}>
              <label>Description</label>
              <textarea
                style={{
                  borderColor: errors?.description ? '#ff5050' : '',
                }}
                placeholder="Description"
                name="description"
                ref={register}
                rows={6}
              ></textarea>
              {errors && (
                <span className={style.errorMessage}>
                  {errors?.description?.message}
                </span>
              )}
            </div>

            <div className={style.addExpense}>
              <Input
                name="amount"
                label="Expense Amount "
                type="number"
                placeholder="Expense Amount"
                inputRef={register}
                error={errors?.amount}
                containerClass={style.inputMarginClass}
                errorMessage={errors?.amount?.message}
              />
              <div className={style.remarksDiv}>
                <label
                  className={style.label}
                  style={{ color: errors?.gender ? 'red' : '' }}
                >
                  Remarks
                </label>

                <div className={style.radio}>
                  <Radio
                    name="remarks"
                    label="Paid"
                    radioValue={'Paid'}
                    radioRef={register}
                    errorMessage={errors?.remarks?.message}
                    error={errors?.remarks}
                  />
                  <div className={style.sec}>
                    <Radio
                      name="remarks"
                      label="Unpaid"
                      radioValue={'Unpaid'}
                      error={errors?.remarks}
                      radioRef={register}
                      errorMessage={errors?.remarks?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.webBtnDiv}>
            <Button
              text={'Save Details'}
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

export default memo(AddExpense);

const options = ['Office Rent', 'Salaries', 'Food', 'Bills', 'Others'];

const schema = yup
  .object()
  .shape({
    category: yup.string().required(),
    amount: yup.string().required(),
    date: yup.string().required(),
    description: yup.string().required(),
    remarks: yup.string().required(),
  })
  .required();
