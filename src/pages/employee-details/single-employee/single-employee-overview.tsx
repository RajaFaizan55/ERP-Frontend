import { useEffect, useState } from 'react';
import moment from 'moment';
import NewTable from 'components/table/new-table';

import { overviewColumns } from './employee-data-helper';

import style from './single-employee.module.scss';

interface Props {
  employeeData: any;
}
interface Education {
  degree: string;
  institute: string;
  startDate: string;
  endDate: string;
  percentageCgpa: string;
}

const SingleEmployeeOverview = ({ employeeData }: Props) => {
  const {
    personalInformation,
    addressInformation,
    companyInformation,
    educationDetails,
  } = employeeData;

  const [educationData, setEducationData] = useState<Education[] | []>([]);

  const convertAmPm = (t: string) => {
    let time = t;
    let hours = Number(time?.split(':')[0]);
    let min = time?.split(':')[1];
    let AmPm = 'am';
    if (hours > 12) {
      hours = hours - 12;
      AmPm = 'pm';
    } else if (hours === 12) {
      AmPm = 'pm';
    } else if (hours === 0) {
      AmPm = 'am';
    }
    if (AmPm === 'am') {
      time = `${time} AM`;
    } else {
      time = `${hours < 10 ? '0' + hours : hours}:${min} PM`;
    }
    return time;
  };

  useEffect(() => {
    if (educationDetails?.length > 0) {
      const temp = [...educationDetails];
      for (let i = 0; i < temp.length; i++) {
        temp[i]['no'] = i + 1;
        for (const k in temp[i]) {
          if (k === 'startDate' || k === 'endDate' || k === '_id') {
            delete temp[i][k];
          }
        }
      }
      setEducationData([...temp]);
    }
  }, [educationDetails]);

  return (
    <div>
      <div className={style.grid}>
        <div className={style.left}>
          <h3>Personal Details</h3>
          <div className={style.flex}>
            <div className={`${style.div1} ${style.namingDiv}`}>
              <p>
                Name :{' '}
                <span>
                  {personalInformation?.firstName}{' '}
                  {personalInformation?.lastName}
                </span>
              </p>
              <p>
                Email :{' '}
                <span style={{ textTransform: 'lowercase' }}>
                  {personalInformation?.email
                    ? personalInformation?.email
                    : '--'}
                </span>
              </p>
              <p>
                Gender : <span>{personalInformation?.gender}</span>
              </p>
            </div>
            <div className={style.div1} style={{ flex: 1, width: '100%' }}>
              <p>
                Date of Birth :{' '}
                <span>
                  {moment(personalInformation?.dob).format('DD/MM/YYYY')}
                </span>
              </p>
              <p>
                Phone :{' '}
                <span>
                  {personalInformation?.phoneNumber
                    ? personalInformation?.phoneNumber
                    : '--'}
                </span>
              </p>
              <p>
                CNIC :{' '}
                <span>
                  {personalInformation?.cnic ? personalInformation?.cnic : '--'}
                </span>
              </p>
            </div>
          </div>
          <h3 style={{ padding: '32px 0px 3px 0px' }}>Address</h3>
          <p>
            Current Address :{' '}
            <span>
              {addressInformation?.currentAddress?.address
                ? addressInformation?.currentAddress?.address
                : '--'}
            </span>
          </p>
          <p>
            Permanent Address :{' '}
            <span>
              {addressInformation?.permanentAddress?.address
                ? addressInformation?.permanentAddress?.address
                : '--'}
            </span>
          </p>
        </div>

        <div className={style.left}>
          <h3>Company Details</h3>
          <div className={style.flex}>
            <div className={`${style.div1} ${style.namingDiv}`}>
              <p>
                Employee ID : <span>{personalInformation?.employeeId}</span>
              </p>
              <p>
                Designation : <span>{companyInformation?.designation}</span>
              </p>
              <p>
                Login Time :{' '}
                <span style={{ textTransform: 'lowercase' }}>
                  {convertAmPm('09:00')}
                </span>
              </p>
              <p>
                Annual Leaves : <span>{companyInformation?.annualLeaves}</span>
              </p>
              <p>
                Casual Leaves : <span>{companyInformation?.casualLeaves}</span>
              </p>
              <p>
                Probation End :{' '}
                <span>
                  {companyInformation?.probationEndDate
                    ? moment(companyInformation?.probationEndDate).format(
                        'DD/MM/YYYY',
                      )
                    : '--'}
                </span>
              </p>
            </div>
            <div className={style.div1} style={{ flex: 1, width: '100%' }}>
              <p>
                Department : <span>{companyInformation?.department}</span>
              </p>
              <p>
                Joining Date :{' '}
                <span>
                  {moment(companyInformation?.joiningDate).format('DD/MM/YYYY')}
                </span>
              </p>
              <p>
                Logout Time :{' '}
                <span style={{ textTransform: 'lowercase' }}>
                  {convertAmPm('18:00')}
                </span>
              </p>
              <p>
                Medical Leaves : <span>{companyInformation?.medicalLeave}</span>
              </p>
              <p>
                Probation :{' '}
                <span>
                  {companyInformation?.probation ? 'In Probation' : '--'}
                </span>
              </p>
              <p style={{ maxWidth: '450px' }}>
                Note :{' '}
                <span>
                  {companyInformation?.note ? companyInformation?.note : '--'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.education}>
        <h3>Educational Details</h3>
        <NewTable
          columns={overviewColumns}
          rows={educationData}
          tableHeight={style.tableMargin}
        />
      </div>
    </div>
  );
};

export default SingleEmployeeOverview;
