import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router';

import Loading from 'components/loading';

import AuthService from 'services/auth-service';

import LogoImage from 'assets/logo.svg';
import style from './reset-password.module.scss';
import MobileForgotPassword from './mobile-reset';

const ResetPassword = () => {
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
      <div className={style.loginMain}>
        <div className={style.loginOverlay}>
          <div className={style.loginCardParent}>
            <div className={style.loginCard}>
              <div className={style.loginContent}>
                <img src={LogoImage} width="110px" alt="logo" />
                <span className={style.loginTitle}>Reset Password</span>
                <form
                  className={style.loginForm}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      className={style.loginLabel}
                      style={{
                        color: errors?.password ? '#ff5050' : '#dcdcdc',
                      }}
                    >
                      Enter New Password
                      <input
                        type="password"
                        style={{
                          color: errors?.password ? '#ff5050' : 'white',
                          borderColor: errors?.password ? '#ff5050' : 'gray',
                        }}
                        className={style.loginInput}
                        name="password"
                        placeholder="Your Password"
                        ref={register}
                      />
                    </label>
                  </div>
                  {errors?.password && (
                    <span style={{ color: '#ff2020' }}>
                      {errors?.password?.message}
                    </span>
                  )}
                  <div>
                    <label
                      className={style.loginLabel}
                      style={{
                        color: errors?.confirmPassword ? '#ff5050' : '#dcdcdc',
                      }}
                    >
                      Re Enter Password
                      <input
                        type="password"
                        style={{
                          color: errors?.confirmPassword ? '#ff5050' : 'white',
                          borderColor: errors?.confirmPassword
                            ? '#ff5050'
                            : 'gray',
                        }}
                        className={style.loginInput}
                        name="confirmPassword"
                        placeholder="Re Enter Password"
                        ref={register}
                      />
                    </label>
                  </div>
                  {errors?.confirmPassword && (
                    <span style={{ whiteSpace: 'pre-line', color: '#ff2020' }}>
                      {errors?.confirmPassword?.message}
                    </span>
                  )}

                  <button
                    type="submit"
                    className={style.loginSubmit}
                    disabled={isLoading || false}
                    style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                  >
                    {isLoading ? (
                      <Loading loaderClass={style.btnLoader} />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileForgotPassword />
    </>
  );
};
export default ResetPassword;

const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, 'password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match'),
});
