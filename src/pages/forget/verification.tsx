import React from 'react';

import Input from 'components/input';
import Button from 'components/button';

import style from './forget.module.scss';
import logo from 'assets/mobile-view/sprintx.svg';

const MobileForgotVerification = () => {
  return (
    <>
      <div className={style.bg}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <h4>Forgot Password</h4>
        <div className={style.loginDiv}>
          <Input
            placeholder="Verification Code"
            label="Verification Code"
            type="number"
          />
        </div>
        <div className={style.logo}>
          <Button text="NEXT" btnClass={style.btn} />
        </div>
      </div>
    </>
  );
};
export default MobileForgotVerification;
