import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import Input from 'components/input';
import Radio from 'components/radio';
import Button from 'components/button';
import Profile from 'components/profile';
import DatePicker from 'components/date-picker';
import EmployeeService from 'services/employee-service';
import { removeKey } from 'main-helper';

import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';
import style from './add-employee.module.scss';

interface Props {
  activeStep?: number;
  formData: any;
  setOnlyActive: Dispatch<SetStateAction<number | boolean>>;
  setEmployeeId: Dispatch<SetStateAction<string>>;
  setFormData: any;
  handleBack: () => void;
  handleNext: () => void;
  employeeId: string;
}

const PersonalInformation = ({
  handleNext,
  setOnlyActive,
  setFormData,
  formData,
  setEmployeeId,
  employeeId,
}: Props) => {
  const [img, setImg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, errors, reset, control } = useForm({
    resolver: yupResolver(schema),
  });

  const params = useParams();

  const onSubmit = async (data: any) => {
    const temp = { ...data, img };
    const obj = removeKey(temp);
    setFormData({ ...formData, personalInformation: { ...obj } });
    if (!params?.id) {
      setIsLoading(true);
      const res = await EmployeeService.addEmployee({
        personalInformation: { ...obj },
        type: 1,
      });

      if (res.status === 201) {
        setEmployeeId(res.data.newEmployeeId);
        setOnlyActive(false);
        handleNext && handleNext();
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const res = await EmployeeService.updateAddedEmployee(
        {
          personalInformation: { ...obj },
          employeeId,
          type: 1,
        },
        params?.id,
      );
      if (res.status === 200) {
        handleNext && handleNext();
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(formData?.personalInformation)?.length) {
      const temp = { ...formData?.personalInformation };
      reset({ ...temp, dob: new Date(temp?.dob) });
      setImg(temp?.img);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <div className={style.main}>
      <Profile img={img} setImg={setImg} />
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.grid}>
          <Input
            name="firstName"
            label="First Name "
            star="*"
            type="text"
            inputRef={register}
            error={errors?.firstName}
            errorMessage={errors?.firstName?.message}
            placeholder="First Name"
          />
          <Input
            name="lastName"
            label="Last Name "
            star="*"
            type="text"
            inputRef={register}
            error={errors?.lastName}
            errorMessage={errors?.lastName?.message}
            placeholder="Last Name"
          />
          <Input
            name="email"
            label="Email "
            type="email"
            placeholder="Email"
            error={errors?.email}
            errorMessage={errors?.email?.message}
            inputRef={register}
          />
          <DatePicker
            label="Date of Birth "
            star="*"
            name="dob"
            id="1"
            placeholder="Date of Birth"
            control={control}
            error={errors?.dob}
            maxDate={new Date()}
            // errorMessage={errors?.date?.dob}
          />
          <Input
            name="cnic"
            label="CNIC "
            star="*"
            type="number"
            placeholder="CNIC"
            error={errors?.cnic}
            errorMessage={errors?.cnic?.message}
            inputRef={register}
          />
          <Input
            name="phoneNumber"
            label="Phone Number "
            star="*"
            type="number"
            inputRef={register}
            error={errors?.phoneNumber}
            errorMessage={errors?.phoneNumber?.message}
            placeholder="Phone Number"
          />
          <div style={{ marginTop: '12px' }}>
            <label className={style.label}>
              Gender <span style={{ color: 'red' }}>*</span>
            </label>

            <div className={style.radio}>
              <Radio
                name="gender"
                label="Male "
                radioValue={'Male'}
                radioRef={register}
                errorMessage={errors?.gender?.message}
                error={errors?.gender}
              />
              <div className={style.sec}>
                <Radio
                  name="gender"
                  label="Female "
                  radioValue={'Female'}
                  error={errors?.gender}
                  radioRef={register}
                  errorMessage={errors?.gender?.message}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <div className={style.btnContainer}>
            <Button
              type="button"
              disabled={true}
              btnClass={style.button2}
              icon={arrowLeft}
            />
            <span>Back</span>
          </div>

          <div className={style.btnContainer}>
            <span>Next</span>
            <Button
              type="submit"
              btnClass={style.button1}
              icon={arrowRight}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required('First name is a required field')
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    lastName: yup
      .string()
      .required('Last name is a required field')
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    phoneNumber: yup
      .string()
      .required('Phone number is a required field')
      .min(10)
      .max(11),
    email: yup.string().when({
      is: (value: string) => value.length,
      then: yup.string().email(),
      otherwise: yup.string(),
    }),
    cnic: yup
      .string()
      .required('CNIC is a required field')
      .min(13, 'only 13 digits required')
      .max(13, 'only 13 digits required'),
    gender: yup.string().required(),
    dob: yup.string().required(),
  })
  .required();
