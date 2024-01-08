import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from 'components/input';
import Button from 'components/button';
import AuthService from 'services/auth-service';

import style from './reset-password.module.scss';
import logo from 'assets/mobile-view/sprintx.svg';
import eye from 'assets/mobile-view/eye.svg';

const MobileResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ password }: { password: string }) => {
    setIsLoading(true);
    const res = token && (await AuthService.resetPassword({ password, token }));
    if (res.status === 200) {
      navigate('/login');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={style.bg}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.loginDiv}>
            <Input
              placeholder="New Password"
              label="New Password"
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              inputRef={register}
              error={errors?.password}
              errorMessage={errors?.password?.message}
              icon={eye}
              onClick={() => setPasswordVisible((prev) => !prev)}
            />
            <div className={style.secondDiv}>
              <Input
                placeholder="Confirm Password"
                type={confirmPasswordVisible ? 'text' : 'password'}
                label="Confirm Password"
                name="confirmPassword"
                inputRef={register}
                error={errors?.confirmPassword}
                errorMessage={errors?.confirmPassword?.message}
                icon={eye}
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
              />
            </div>
          </div>
          <div className={style.logo}>
            <Button text="DONE" btnClass={style.btn} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </>
  );
};
export default MobileResetPassword;

const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, 'password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match'),
});
