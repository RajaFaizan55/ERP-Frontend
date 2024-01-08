import React from 'react';

import style from './hod-approval.module.scss';

const HodApproval = () => {
  return (
    <>
      <div className={style.approval}>
        <div
          className={style.flexInner}
          style={{ borderRight: '1px solid #A8A8A8' }}
        >
          <p
            className={style.applicationSubtitle}
            style={{ borderBottom: '1px solid #A8A8A8' }}
          >
            Applicant
          </p>
          <p className={style.applicationSubtitle}></p>
          <p
            className={style.applicationSubtitle}
            style={{ borderTop: '1px solid #A8A8A8' }}
          >
            Signature & Date
          </p>
        </div>
        <div
          className={style.flexInner}
          style={{ borderRight: '1px solid #A8A8A8' }}
        >
          <p
            className={style.applicationSubtitle}
            style={{ borderBottom: '1px solid #A8A8A8' }}
          >
            HOD Approval{' '}
          </p>
          <p className={style.applicationSubtitle}></p>
          <p
            className={style.applicationSubtitle}
            style={{ borderTop: '1px solid #A8A8A8' }}
          >
            Signature & Date
          </p>
        </div>
        <div className={style.flexInner}>
          <p
            className={style.applicationSubtitle}
            style={{ borderBottom: '1px solid #A8A8A8' }}
          >
            Category:
          </p>
          <p
            className={style.applicationSubtitle}
            style={{
              fontWeight: 400,
              textAlign: 'left',
              padding: '6px 11px 0px 11px',
            }}
          >
            Operators/Line Leaders/Technicians -By Supervisors{' '}
          </p>
          <p
            className={style.applicationSubtitle}
            style={{
              fontWeight: 400,
              textAlign: 'left',
              padding: '6px 11px 0px 11px',
            }}
          >
            Clerical/Supervisor/Sr. Supervisor/Executives -By Dept Head{' '}
          </p>
          <p
            className={style.applicationSubtitle}
            style={{
              fontWeight: 400,
              textAlign: 'left',
              padding: '6px 11px 0px 11px',
            }}
          >
            Managerial Level -By Director{' '}
          </p>
          <p
            className={style.applicationSubtitle}
            style={{
              fontWeight: 400,
              textAlign: 'left',
              padding: '6px 11px 0px 11px',
            }}
          >
            Director Level -By GM/Shareholder
          </p>

          <p className={style.applicationSubtitle}></p>
        </div>
      </div>
    </>
  );
};

export default HodApproval;
