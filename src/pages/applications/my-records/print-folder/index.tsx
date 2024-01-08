import React from 'react';

import style from './print.module.scss';
import logo from 'assets/mobile-view/sprintx.svg';
import ApplicationInfo from './application-info';
import LeaveDetails from './leave-details';
import RelieverDetails from './reliever-details';
import HrDepartmentOnly from './hr-department';
import HrApproval from './hr-approval';
import HodApproval from './hod-approval';

interface Props {
  applicationDataById: any;
}

const PrintPdf = ({ applicationDataById }: Props) => {
  return (
    <>
      <div className={style.main}>
        <div className={style.mainFirst}>
          <img src={logo} alt="" />
          <p className={style.application}>LEAVE APPLICATION FORM </p>
          <p className={style.application}>
            Ref no: <span style={{ fontWeight: 400 }}>SPX-HRM-001 RV00 </span>
          </p>
        </div>
        <ApplicationInfo appInfo={applicationDataById} />
        <LeaveDetails />
        <RelieverDetails />
        <HodApproval />
        <HrDepartmentOnly />
        <HrApproval />

        <div className={style.mainNote}>
          <p className={style.note}>Note:</p>
          <p className={style.noteInfo}>
            1. The Leave Application Form has to be submitted to the Human
            Resource Department at least one week in advance for short leave and
            one month in advance for long leave.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrintPdf;
