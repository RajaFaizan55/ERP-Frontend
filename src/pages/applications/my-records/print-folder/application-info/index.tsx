import React from 'react';

import style from './application-info.module.scss';
interface Props {
  appInfo: any;
}
const ApplicationInfo = ({ appInfo }: Props) => {
  return (
    <>
      <div className={style.applicationInfo}>
        <div className={style.flex}>
          <div style={{ borderRight: '1px solid #A8A8A8' }}>
            <p className={style.applicationTitle}>Applicant Information </p>
            <div className={style.border} style={{ display: 'flex' }}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '100%' }}
              >
                Employee Name:
              </p>
              <p
                className={style.applicationSubtitle}
                style={{ width: '100%', maxWidth: '100%', borderRight: 'none' }}
              >
                {appInfo.name}
              </p>
            </div>
            <div className={style.border}>
              <p className={style.applicationSubtitle}>Designation:</p>
            </div>
            <div className={style.border}>
              <p className={style.applicationSubtitle}>
                Contact details while on leave:
              </p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              <p
                className={style.applicationSubtitle}
                style={{ fontWeight: 'bold', padding: '15px', width: '100%' }}
              >
                Date of Submission:
              </p>
              <p
                className={style.applicationSubtitle}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  borderRight: 'none',
                  fontWeight: 'bold',
                  padding: '15px',
                }}
              >
                {appInfo.applicationDate}
              </p>
            </div>
            <div className={style.border} style={{ display: 'flex' }}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '100%' }}
              >
                Emp. ID No.:
              </p>
              <p
                className={style.applicationSubtitle}
                style={{ width: '100%', maxWidth: '100%', border: 'none' }}
              >
                {appInfo?.employeeId}
              </p>
            </div>
            <div
              style={{
                borderTop: '1px solid #A8A8A8',
                borderBottom: '1px solid #A8A8A8',
              }}
            >
              <p className={style.applicationSubtitle}>Department:</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationInfo;
