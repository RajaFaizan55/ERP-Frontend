import React from 'react';

import Card from 'components/card';

import style from './request.module.scss';
import { useAppSelector } from 'store/hooks';

interface Props {
  handleClick?: () => void;
  title?: string;
  description?: string;
}

const RequestCards = ({ handleClick, title, description }: Props) => {
  const { currentUser } = useAppSelector((state) => state?.app);
  return (
    <>
      <Card className={style.application_card}>
        <div className={style.employeeOverlay}>
          <div className={style.overlayImg}>
            <div className={style.img3}>
              <p style={{ color: 'white' }}>{title}</p>
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'white',
                textTransform: 'uppercase',
                marginBottom: '0px',
              }}
            >
              {currentUser.employeeId}
            </p>
          </div>
          <div className={style.overlayDiv}>
            <div className={style.border}>
              <h1 className={style.title}>{title}</h1>

              <p className={style.subtitle}>
                {/* {designation} */}
                {description}
              </p>

              <div className={style.btnDiv}>
                <button className={style.buttonText} onClick={handleClick}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default RequestCards;
