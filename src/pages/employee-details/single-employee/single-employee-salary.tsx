import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { columnsSalary } from './employee-data-helper';

import style from './single-employee.module.scss';
import NewTable from 'components/table/new-table';

interface Props {
  employeeData: any;
}

const SingleEmployeeSalary = ({ employeeData }: Props) => {
  const [tableRow, setTableRow] = useState<any[]>([]);
  const { payrollDetail, salaryData } = employeeData;
  useEffect(() => {
    if (salaryData?.length) {
      const temp = [...salaryData];
      temp.forEach((ele: any) => {
        ele.date = moment(ele.date).format('DD/MM/YYYY');
      });
      setTableRow([...temp]);
    }
  }, [salaryData]);

  return (
    <div style={{ padding: '0px 16px' }}>
      <NewTable columns={columnsSalary} rows={tableRow} />
      <div className={style.payroll}>
        <h3>Payroll</h3>
        <div className={style.grid2}>
          <div className={style.div2}>
            <p>
              Basic Salary :{' '}
              <span>
                {payrollDetail?.basicSalary
                  ? Number(payrollDetail?.basicSalary).toLocaleString()
                  : '--'}
              </span>
            </p>
            <p>
              Conveyance Allowance :{' '}
              <span>
                {payrollDetail?.conveyanceAllowance
                  ? Number(payrollDetail?.conveyanceAllowance).toLocaleString()
                  : '--'}
              </span>
            </p>
            <p>
              House Rent Allowance :{' '}
              <span>
                {payrollDetail?.houseRentAllowance
                  ? Number(payrollDetail?.houseRentAllowance).toLocaleString()
                  : '--'}
              </span>
            </p>
            <p>
              Account Holder Name :{' '}
              <span>
                {' '}
                {payrollDetail?.accountHolderName
                  ? payrollDetail?.accountHolderName
                  : '--'}
              </span>
            </p>
          </div>
          <div className={style.div2}>
            <p>
              Medical Allowance :{' '}
              <span>
                {payrollDetail?.medicalAllowance
                  ? Number(payrollDetail?.medicalAllowance).toLocaleString()
                  : '--'}
              </span>
            </p>
            <p>
              Spacial Allowance :{' '}
              <span>
                {payrollDetail?.spacialAllowance
                  ? Number(payrollDetail?.spacialAllowance).toLocaleString()
                  : '--'}
              </span>
            </p>
            <p>
              Bank Name :{' '}
              <span>
                {payrollDetail?.bankName ? payrollDetail?.bankName : '--'}
              </span>
            </p>
            <p>
              Account Number :
              <span>
                {' '}
                {payrollDetail?.accountNumber
                  ? payrollDetail?.accountNumber
                  : '--'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEmployeeSalary;
