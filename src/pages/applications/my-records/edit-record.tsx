import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from 'components/modal';
import Button from 'components/button';
import NavLinks from 'components/nav-links';

import style from './records.module.scss';
import cross from 'assets/employee-page/Path 306.svg';
import DatePicker from 'components/date-picker';
import Select from 'components/select';
import Input from 'components/input';
import Radio from 'components/radio';

interface Props {
  openEdit?: boolean;
  setOpenEdit?: any;
}

const EditRecord = ({ openEdit, setOpenEdit }: Props) => {
  const { register, errors, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <>
      <Modal
        open={openEdit}
        className={style.modalWrapper}
        handleClose={() => setOpenEdit(false)}
      >
        <form>
          <div className={style.modal}>
            <NavLinks links={[{ left: '40px', title: 'Edit Records' }]} />
            <img
              src={cross}
              alt=""
              className={style.img}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenEdit(false)}
            />
          </div>

          <div className={style.view}>
            <div className={style.grid}>
              <DatePicker
                label="Date "
                name="date"
                id="1"
                placeholder="Date "
                control={control}
                error={errors?.date}
              />
              <Input
                name="name"
                label="Name"
                type="text"
                placeholder="Name"
                containerClass={style.input}
                inputRef={register}
                error={errors?.name}
                errorMessage={errors?.name?.message}
              />
              <div className={style.note}>
                <textarea
                  style={{
                    borderColor: errors?.description ? '#ff5050' : '',
                  }}
                  placeholder="Description"
                  name="description"
                  ref={register}
                  rows={6}
                ></textarea>
                {errors ? (
                  <span className={style.errorMessage}>
                    {errors?.description?.message}
                  </span>
                ) : (
                  ''
                )}
              </div>
              <Select
                label="Category"
                name="category"
                options={options}
                error={errors?.category}
                errorMessage={errors?.category?.message}
                placeHolder="Select Category"
                inputRef={register}
              />
              <div style={{ marginTop: '17px' }}>
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
              <div className={style.btnDiv}>
                <Button
                  text={'Save Changes'}
                  btnClass={style.btn}
                  type="button"
                  handleClick={() => setOpenEdit(false)}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditRecord;

const options = ['Office Rent', 'Salaries', 'Food', 'Bills', 'Others'];

const schema = yup
  .object()
  .shape({
    category: yup.string().required(),
    name: yup.string().required(),
    date: yup.string().required(),
    description: yup.string().required(),
    remarks: yup.string().required(),
  })
  .required();
