import React from 'react';

import style from './hr-department.module.scss';

const HrDepartmentOnly = () => {
  return (
    <>
      <div className={style.department}>
        <p className={style.applicationTitle}>
          To be Filled by HR Department Only{' '}
        </p>
        <div className={style.flex}>
          <div style={{ borderRight: ' 1px solid #A8A8A8' }}>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{
                  width: '152px',
                  fontWeight: 'bold',
                  borderRight: ' 1px solid #A8A8A8',
                }}
              >
                Annual Leave
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '152px', borderRight: ' 1px solid #A8A8A8' }}
              >
                Leave Entitlement
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '152px', borderRight: ' 1px solid #A8A8A8' }}
              >
                Leave Taken{' '}
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '152px', borderRight: ' 1px solid #A8A8A8' }}
              >
                No. of days requested{' '}
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '152px', borderRight: ' 1px solid #A8A8A8' }}
              >
                Balance Leave{' '}
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
          </div>
          <div>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{
                  width: '152px',
                  fontWeight: 'bold',
                  borderRight: ' 1px solid #A8A8A8',
                }}
              >
                Other Leaves
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>

            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '152px', borderRight: ' 1px solid #A8A8A8' }}
              >
                Casual Leave
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '152px', borderRight: ' 1px solid #A8A8A8' }}
              >
                Maternity Leave
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '152px', borderRight: ' 1px solid #A8A8A8' }}
              >
                Unpaid Leave
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
            <div className={style.border}>
              <p
                className={style.applicationSubtitle}
                style={{ width: '152px', borderRight: ' 1px solid #A8A8A8' }}
              >
                Others
              </p>
              <p className={style.applicationSubtitle} style={{ flex: 1 }}></p>
            </div>
          </div>
        </div>

        <div className={style.leaveCharged}>
          <div>
            <p
              className={style.applicationSubtitle}
              style={{
                width: '152px',
                borderRight: ' 1px solid #A8A8A8',
                fontWeight: 'bold',
              }}
            >
              Remarks{' '}
            </p>
          </div>

          <p style={{ flex: 1 }}></p>
        </div>
      </div>
    </>
  );
};

export default HrDepartmentOnly;
