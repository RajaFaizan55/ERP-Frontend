import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Card from 'components/card';
import Input from 'components/input';
import Select from 'components/select';
import Button from 'components/button';

import { Employee } from 'interfaces/employee';
import EmployeeService from 'services/employee-service';
import { EmployeeFilterData } from './employee-cards-helper';
import style from './employee.module.scss';
import cross from 'assets/employee-page/Path 307.svg';

interface Props {
  setOpen: (value: boolean) => void;
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
  open: boolean;
  setCount: (value: number) => void;
  getData: () => void;
}

const EmployeeFilter = ({
  setOpen,
  setEmployees,
  open,
  setCount,
  getData,
}: Props) => {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: EmployeeFilterData) => {
    const res = await EmployeeService.getSearchedEmployees(data);
    if (res?.status === 200) {
      setEmployees(res?.data.employees);
      setCount(res?.data.count);
    }
  };
  const cancelHandler = () => {
    setOpen(false);
    getData();
    reset({});
  };

  return (
    <form
      className={style.card1}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        visibility: open ? 'visible' : 'hidden',
        opacity: open ? '1' : '0',
        zIndex: open ? 1 : -1,
        height: open ? 'auto' : '75px',
      }}
    >
      <Card className={style.employeeFilterCard}>
        <div className={style.img1}>
          <img
            style={{ cursor: 'pointer' }}
            src={cross}
            alt=""
            onClick={() => cancelHandler()}
          />
        </div>
        <div className={style.grid1}>
          <Input
            name="name"
            containerClass={style.order2}
            inputClass={style.input}
            type="text"
            placeholder="Search by Name"
            inputRef={register}
          />
          <Input
            name="employeeId"
            containerClass={style.order2}
            inputClass={style.input}
            type="text"
            placeholder="Search by Employee ID"
            inputRef={register}
          />
          <Select
            name="department"
            selectClass={style.select1}
            className={style.selectContainer}
            placeHolder="Select Department"
            options={options}
            inputRef={register}
          />
          <Button text="Search" btnClass={style.btn} />
        </div>
      </Card>
    </form>
  );
};
export default EmployeeFilter;

const options = ['Management', 'Development', 'HR', 'QA'];

const schema = yup
  .object()
  .shape({
    name: yup.string().optional(),
    employeeId: yup.string().optional(),
    department: yup.string().optional(),
  })
  .required();
