import React from 'react';

import style from './reliever.module.scss';

const RelieverDetails = () => {
  return (
    <>
      <div className={style.relieverInfo}>
        <p className={style.applicationTitle}>Reliever Details </p>
        <div className={style.flex}>
          <div className={style.border}>
            <p className={style.applicationSubtitle} style={{ width: '152px' }}>
              Reliever Name
            </p>
            <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
          </div>
          <div className={style.border}>
            <p className={style.applicationSubtitle} style={{ width: '152px' }}>
              Reliever Department
            </p>
            <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
          </div>
        </div>

        <div className={style.leaveCharged}>
          <div>
            <p
              className={style.applicationSubtitle}
              style={{ width: '152px', display: 'flex', alignItems: 'center' }}
            >
              Remarks (if any)
            </p>
          </div>

          <p style={{ flex: 1 }}></p>
        </div>
      </div>
    </>
  );
};

export default RelieverDetails;
