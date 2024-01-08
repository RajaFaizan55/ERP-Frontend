import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';

import Input from 'components/input';
import Button from 'components/button';

import { removeKey } from 'main-helper';
import EmployeeService from 'services/employee-service';

import style from './add-employee.module.scss';
import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';
import { banksData } from './helper';

interface Props {
  handleBack?: () => void;
  setFormData: any;
  formData: any;
  employeeId: string;
}

const PayrollInformation = ({
  handleBack,
  setFormData,
  formData,
  employeeId,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const temp = removeKey({ ...data });
    setFormData({
      ...formData,
      payrollDetail: { ...temp },
    });
    if (!params?.id) {
      setIsLoading(true);
      const res = await EmployeeService.addEmployee({
        type: 5,
        payrollDetail: { ...data },
        employeeId,
      });
      if (res.status === 201) {
        navigate(`/employee`);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const res = await EmployeeService.updateAddedEmployee(
        {
          type: 5,
          employeeId,
          payrollDetail: { ...data },
        },
        params?.id,
      );
      if (res.status === 200) {
        navigate(`/employee/${params?.id}`);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(formData?.payrollDetail)?.length) {
      const temp = { ...formData?.payrollDetail };
      reset({
        ...temp,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={style.padding}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.companyForm}>
        <div className={style.grid3}>
          <Input
            name="basicSalary"
            label="Basic Salary"
            type="number"
            star="*"
            inputRef={register}
            error={errors?.basicSalary}
            errorMessage={errors?.basicSalary?.message}
            placeholder="Basic Salary"
          />

          <Input
            name="houseRentAllowance"
            label="House Rent Allowance"
            type="text"
            inputRef={register}
            error={errors?.houseRentAllowance}
            errorMessage={errors?.houseRentAllowance?.message}
            placeholder="House Rent Allowance"
          />
          <Input
            name="conveyanceAllowance"
            label="Conveyance Allowance"
            type="text"
            inputRef={register}
            error={errors?.conveyanceAllowance}
            errorMessage={errors?.conveyanceAllowance?.message}
            placeholder="Conveyance Allowance"
          />

          <Input
            name="medicalAllowance"
            label="Medical Allowance"
            type="text"
            inputRef={register}
            error={errors?.medicalAllowance}
            errorMessage={errors?.medicalAllowance?.message}
            placeholder="Medical Allowance"
          />
          <Input
            name="spacialAllowance"
            label="Special Allowance"
            type="text"
            inputRef={register}
            error={errors?.spacialAllowance}
            errorMessage={errors?.spacialAllowance?.message}
            placeholder="Special Allowance"
          />
          <Input
            name="bankName"
            label="Bank Name"
            type="text"
            star="*"
            list="banks"
            inputRef={register}
            error={errors?.bankName}
            errorMessage={errors?.bankName?.message}
            placeholder="Bank Name"
          />
          <datalist id="banks">
            {banksData.map((bankName, index) => {
              return (
                <option
                  className={style.dataListOptions}
                  key={index}
                  value={`${bankName}`}
                />
              );
            })}
          </datalist>
          <Input
            name="accountHolderName"
            label="Account Holder Name"
            type="text"
            star="*"
            inputRef={register}
            error={errors?.accountHolderName}
            errorMessage={errors?.accountHolderName?.message}
            placeholder="Account Holder Name"
          />
          <Input
            name="accountNumber"
            label="Account Number"
            type="number"
            star="*"
            inputRef={register}
            error={errors?.accountNumber}
            errorMessage={errors?.accountNumber?.message}
            placeholder="Account Number"
          />
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
            <span>Finish</span>
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

export default PayrollInformation;

const schema = yup
  .object()
  .shape({
    basicSalary: yup.string().required('Basic Salary is required'),
    houseRentAllowance: yup.string().optional(),
    conveyanceAllowance: yup.string().optional(),
    medicalAllowance: yup.string().optional(),
    spacialAllowance: yup.string().optional(),
    bankName: yup.string().required('Bank Name is a required '),
    accountHolderName: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    accountNumber: yup
      .string()
      .required('AccountNumber is a required ')
      .min(11, 'AccountNumber must be at least 11 characters')
      .max(20, 'AccountNumber must be at most 20 characters'),
  })
  .required();
