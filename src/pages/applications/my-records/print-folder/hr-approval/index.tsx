import React from 'react';

import style from './approval.module.scss';

const HrApproval = () => {
  return (
    <>
      <div className={style.approval}>
        <div style={{ borderRight: '1px solid #A8A8A8' }}>
          <p
            className={style.applicationSubtitle}
            style={{ borderBottom: '1px solid #A8A8A8' }}
          >
            HR Approval
          </p>
          <p
            className={style.applicationSubtitle}
            style={{ height: '100px' }}
          ></p>
          <p
            className={style.applicationSubtitle}
            style={{ borderTop: '1px solid #A8A8A8' }}
          >
            Signature & Date
          </p>
        </div>
        <div>
          <p
            className={style.applicationSubtitle}
            style={{ borderBottom: '1px solid #A8A8A8' }}
          >
            Management Approval
          </p>
          <p
            className={style.applicationSubtitle}
            style={{ height: '100px' }}
          ></p>
          <p
            className={style.applicationSubtitle}
            style={{ borderTop: '1px solid #A8A8A8' }}
          >
            Signature & Date
          </p>
        </div>
      </div>
    </>
  );
};

export default HrApproval;
