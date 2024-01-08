import React from 'react';

import style from './leave.module.scss';

const LeaveDetails = () => {
  return (
    <>
      <div className={style.leaveInfo}>
        <p className={style.applicationTitle}>Leave Details </p>
        <div className={style.flex}>
          <div className={style.border}>
            <p className={style.applicationSubtitle} style={{ width: '152px' }}>
              Start Date
            </p>
            <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
          </div>
          <div className={style.border}>
            <p className={style.applicationSubtitle} style={{ width: '152px' }}>
              End Date
            </p>
            <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
          </div>
          <div className={style.border}>
            <p className={style.applicationSubtitle} style={{ width: '152px' }}>
              Total No. Days
            </p>
            <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
          </div>
        </div>
        <div className={style.flex}>
          <div className={style.border}>
            <p className={style.applicationSubtitle} style={{ width: '152px' }}>
              Time
            </p>
            <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
          </div>
          <div className={style.border}>
            <p className={style.applicationSubtitle} style={{ width: '152px' }}>
              To
            </p>
            <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
          </div>
          <div className={style.border}>
            <p
              className={style.applicationSubtitle}
              style={{ width: '152px' }}
            ></p>
            <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
          </div>
        </div>
        <div className={style.leaveCharged}>
          <div>
            <p
              className={style.applicationSubtitle}
              style={{ width: '152px', display: 'flex', alignItems: 'center' }}
            >
              Leave Charged as Follow (tick one){' '}
            </p>
          </div>

          <ul>
            <li>
              <span> ●</span> Annual Leave
            </li>
            <li>
              <span> ●</span> Sick Leave
            </li>
            <li>
              <span> ●</span> Hospitalization Leave
            </li>
            <li>
              <span> ●</span> Unpaid Leave
            </li>
            <li>
              <span> ●</span>
              Replacement Leave
            </li>
            <li>
              <span> ●</span>
              Others (please specify)
            </li>
          </ul>
        </div>
        <div className={style.leaveCharged}>
          <div>
            <p
              className={style.applicationSubtitle}
              style={{ width: '152px', display: 'flex', alignItems: 'center' }}
            >
              Reason
            </p>
          </div>

          <p style={{ flex: 1 }}></p>
        </div>
      </div>
    </>
  );
};

export default LeaveDetails;
