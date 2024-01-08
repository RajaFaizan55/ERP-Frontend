import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import DatePicker from 'components/date-picker';
import Input from 'components/input';
import Select from 'components/select';
import Button from 'components/button';
import Checkbox from 'components/checkbox';
import { removeKey } from 'main-helper';

import EmployeeService from 'services/employee-service';

import style from './add-employee.module.scss';
import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';
// import checkIcon from 'assets/check.svg';

interface Props {
  handleBack?: () => void;
  handleNext?: () => void;
  setFormData: any;
  formData: any;
  employeeId: string;
}

const CompanyInformation = ({
  handleBack,
  handleNext,
  setFormData,
  formData,
  employeeId,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, errors, reset, watch, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const params = useParams();
  const prob = watch('probation', '');

  const onSubmit = async (data: any) => {
    let temp = removeKey({ ...data });

    temp = { ...temp, probation: data?.probation === 'true' ? true : false };

    setFormData({
      ...formData,
      companyInformation: {
        ...temp,
      },
    });
    if (!params?.id) {
      setIsLoading(true);

      const res = await EmployeeService.addEmployee({
        type: 3,
        companyInformation: {
          ...temp,
        },
        employeeId,
      });
      if (res.status === 201) {
        handleNext && handleNext();
      }

      setIsLoading(false);
    } else {
      setIsLoading(true);

      const res = await EmployeeService.updateAddedEmployee(
        {
          type: 3,
          employeeId,
          companyInformation: { ...temp },
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
    if (Object.keys(formData?.companyInformation)?.length) {
      const temp = { ...formData?.companyInformation };
      reset({
        ...temp,
        joiningDate: temp?.joiningDate ? new Date(temp?.joiningDate) : '',
        probationEndDate: temp?.probationEndDate
          ? new Date(temp?.probationEndDate)
          : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.padding}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.companyForm}>
        <div className={style.grid3}>
          <DatePicker
            label="Joining Date "
            star="*"
            name="joiningDate"
            id="3"
            placeholder="Joining Date"
            control={control}
            error={errors?.joiningDate}
          />

          <Select
            label="Department "
            star="*"
            name="department"
            options={options}
            error={errors?.department}
            errorMessage={errors?.department?.message}
            placeHolder="Select Account"
            inputRef={register}
          />
          <Input
            name="designation"
            label="Designation "
            type="text"
            star="*"
            inputRef={register}
            error={errors?.designation}
            errorMessage={errors?.designation?.message}
            placeholder="Designation"
          />

          <Input
            name="annualLeaves"
            label="Annual Leaves "
            type="number"
            star="*"
            inputRef={register}
            error={errors?.annualLeaves}
            errorMessage={errors?.annualLeaves?.message}
            placeholder="Annual Leaves"
          />
          <Input
            name="medicalLeaves"
            label="Medical Leaves "
            type="number"
            star="*"
            inputRef={register}
            error={errors?.medicalLeaves}
            errorMessage={errors?.medicalLeaves?.message}
            placeholder="Medical Leaves"
          />
          <Input
            name="casualLeaves"
            label="Casual Leaves "
            type="number"
            star="*"
            inputRef={register}
            error={errors?.medicalLeaves}
            errorMessage={errors?.casualLeaves?.message}
            placeholder="Casual Leaves"
          />
          <div className={style.note}>
            <label>Note</label>
            <textarea
              placeholder="Note"
              name="note"
              rows={8}
              ref={register}
            ></textarea>
          </div>
          <Input
            name="loginTime"
            label="Login Time "
            type="time"
            star="*"
            inputRef={register}
            error={errors?.loginTime}
            errorMessage={errors?.loginTime?.message}
            placeholder="Login Time"
          />
          <Input
            name="logoutTime"
            label="Logout Time "
            type="time"
            star="*"
            inputRef={register}
            error={errors?.logoutTime}
            errorMessage={errors?.logoutTime?.message}
            placeholder="Logout Time"
          />
          <div className={style.checkbox}>
            <Checkbox
              label="Probation "
              name="probation"
              inputRef={register}
              id="probation"
            />
          </div>
          {prob && (
            <DatePicker
              label="Probation End Date "
              star="*"
              name="probationEndDate"
              id="2"
              placeholder="Probation End Date"
              control={control}
              error={errors?.probationEndDate}
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <div className={style.btnContainer}>
            <Button
              handleClick={handleBack}
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

export default CompanyInformation;

const options = ['Management', 'Development', 'HR', 'QA'];

const schema = yup
  .object()
  .shape({
    department: yup.string().required(),
    designation: yup.string().required(),
    joiningDate: yup.string().required(),
    annualLeaves: yup.string().required(),
    medicalLeaves: yup.string().required(),
    casualLeaves: yup.string().required(),
    loginTime: yup.string().required(),
    logoutTime: yup.string().required(),
    probation: yup.string(),
    probationEndDate: yup.string().when('probation', {
      is: 'true',
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    note: yup.string(),
  })
  .required();
