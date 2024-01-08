import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import EmployeeService from 'services/employee-service';
import Profile from 'components/profile';
import Input from 'components/input';
import Select from 'components/select';
import Button from 'components/button';
import MobileButton from 'components/button/mobile-button';

import AuthService from 'services/auth-service';
import { ManageAccountsAddUser } from './manage-accounts-helper';
import { removeKey } from 'main-helper';
import { Employee } from 'interfaces/employee';

import style from './manage-accounts.module.scss';
import checkIcon from 'assets/check.svg';
import cross from 'assets/employee-page/Path 306.svg';
import tickIcon from 'assets/mobile-view/tickIcon.svg';

interface Props {
  employees: Employee[];
  getEmployeesData: () => void;
}

const AddEmployee = ({ employees, getEmployeesData }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employeeIds, setEmployeeIds] = useState<string[] | []>([]);
  const [employeesData, setEmployeesData] = useState<Employee[] | []>([]);
  const [img, setImg] = useState<any>('');

  const { register, handleSubmit, errors, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const navigate = useNavigate();

  const createEmployeeIdsArr = (employees: any) => {
    const ids: string[] = [];
    employees.forEach((employee: any) => {
      ids.push(employee.employeeId);
    });
    setEmployeeIds(ids);
  };

  const handleEmployeeSelect = (employeesData: any) => {
    const value = watch('employeeId', '');
    const selectedEmployee = employeesData.find(
      (x: any) => x.employeeId === value,
    );
    setValue('email', selectedEmployee?.email);
    setImg(selectedEmployee?.img);
  };

  const onSubmit = async (data: ManageAccountsAddUser) => {
    const newData = removeKey({ ...data, img });
    setIsLoading(true);
    await AuthService.addUser({ ...newData });
    setIsLoading(false);
    getEmployeesData();
    navigate('/settings');
  };

  useEffect(() => {
    const getEmployeesLists = async () => {
      const res = await EmployeeService.getAllEmployees({ pageSize: 100 });
      if (res?.status === 200) {
        setEmployeesData(res.data.employees);
        createEmployeeIdsArr(res.data.employees);
      }
    };
    getEmployeesLists();
  }, []);

  useEffect(() => {
    handleEmployeeSelect(employeesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, employeesData]);

  return (
    <div className={style.main}>
      <div className={style.imgDiv}>
        <img
          src={cross}
          alt=""
          className={style.img}
          onClick={() => navigate('/settings')}
        />
      </div>
      <Profile setImg={setImg} img={img} />
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.grid}>
          <Select
            label="Employee ID"
            name="employeeId"
            options={employeeIds}
            inputRef={register}
            placeHolder="Select Employee Id"
            error={errors?.employeeId}
            errorMessage={errors?.employeeId?.message}
          />
          <Input
            name="email"
            label="Email"
            type="text"
            placeholder="john@gmail.com"
            inputRef={register}
            readOnly={true}
            error={errors?.email}
            errorMessage={errors?.email?.message}
          />
          <Input
            name="password"
            label="New Password"
            type="password"
            placeholder="******"
            inputRef={register}
            error={errors?.password}
            errorMessage={errors?.password?.message}
          />
          <Input
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="******"
            inputRef={register}
            error={errors?.confirmPassword}
            errorMessage={errors?.confirmPassword?.message}
          />

          <Select
            name="account"
            label="Account"
            options={options}
            placeHolder="Select Account"
            inputRef={register}
            error={errors?.account}
            errorMessage={errors?.account?.message}
          />
        </div>
        <div className={style.btnDiv}>
          <Button
            type={'submit'}
            text={'Save Changes'}
            icon={checkIcon}
            isLoading={isLoading}
            btnClass={style.button}
          />
        </div>
        <div className={style.mobileBtnDiv}>
          <MobileButton
            mobileIcon={tickIcon}
            btnClass={style.mobileBtn}
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;

const options = ['Human Resource', 'Admin', 'Employee'];

const schema = yup
  .object()
  .shape({
    employeeId: yup.string().required('employeeId is required'),
    email: yup.string().required(),
    password: yup
      .string()
      .required('password is required')
      .min(8, 'minimum 8 characters required '),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'passwords must match'),
    account: yup.string().required('account is required'),
    // status: yup.string().required(),
  })
  .required();
