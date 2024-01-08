import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Loading from 'components/loading';

import { schema } from './login-helper';
import { LoginCredentials } from 'interfaces/login-credentials';

import LogoImage from 'assets/logo.svg';
import eye from 'assets/employee-page/eye.svg';
import eyeClose from 'assets/employee-page/eyeClose.svg';
import style from './login.module.scss';

const WebLogin = ({ handleLogin }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    handleLogin(data, setIsLoading);
  };

  return (
    <div className={style.loginMain}>
      <div className={style.loginOverlay}>
        <div className={style.loginCardParent}>
          <div className={style.loginCard}>
            <div className={style.loginContent}>
              <img src={LogoImage} width="110px" alt="logo" />
              <span className={style.loginTitle}>Log in Your Account</span>
              <form
                className={style.loginForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    className={style.loginLabel}
                    style={{
                      color: errors?.employeeId ? '#ff5050' : '#dcdcdc',
                    }}
                  >
                    Your Employee Id
                    <input
                      type="text"
                      style={{
                        color: errors?.employeeId ? '#ff5050' : 'white',
                        borderColor: errors?.employeeId ? '#ff5050' : 'gray',
                      }}
                      className={style.loginInput}
                      name="employeeId"
                      placeholder="Enter Employee Id"
                      ref={register}
                    />
                  </label>
                </div>
                {errors?.employeeId && (
                  <span style={{ color: '#ff2020' }}>
                    EmployeeId is required
                  </span>
                )}

                <div style={{ marginTop: '.5rem', position: 'relative' }}>
                  <label
                    className={style.loginLabel}
                    style={{
                      color: errors?.password ? '#ff5050' : '#dcdcdc',
                    }}
                  >
                    Your Password
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      style={{
                        borderColor: errors?.employeeId ? '#ff5050' : 'gray',
                      }}
                      className={style.loginInput}
                      name="password"
                      placeholder={'Enter password'}
                      ref={register}
                    />
                    {passwordVisible ? (
                      <img
                        src={eyeClose}
                        alt=""
                        className={style.img}
                        onClick={() => setPasswordVisible((prev: any) => !prev)}
                      />
                    ) : (
                      <img
                        src={eye}
                        alt=""
                        className={style.img}
                        onClick={() => setPasswordVisible((prev: any) => !prev)}
                      />
                    )}
                  </label>
                </div>
                {errors?.password && (
                  <span style={{ whiteSpace: 'pre-line', color: '#ff2020' }}>
                    Please enter a valid password
                  </span>
                )}
                <div className={style.loginFPassContainer}>
                  <span
                    className={style.loginForgetPass}
                    onClick={() => navigate('/forgot')}
                  >
                    Forgot Password
                  </span>
                </div>
                <button
                  type="submit"
                  className={style.loginSubmit}
                  disabled={isLoading || false}
                  style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                >
                  {isLoading ? (
                    <Loading loaderClass={style.btnLoader} />
                  ) : (
                    'LOG IN'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WebLogin;
