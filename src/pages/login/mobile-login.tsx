import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { LoginCredentials } from 'interfaces/login-credentials';
import { schema } from './login-helper';
import Input from 'components/input';
import Button from 'components/button';

import style from './login.module.scss';
import logo from 'assets/mobile-view/sprintx.svg';
import eye from 'assets/mobile-view/eye.svg';

const MobileLogin = ({ handleLogin }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    handleLogin(data, setIsLoading);
  };

  return (
    <>
      <div className={style.opacityLogo}>
        <img src={logo} alt="" />
      </div>

      <div className={style.bg}>
        <div style={{ width: '100%' }}>
          <div className={style.logoDiv}>
            <img src={logo} alt="" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4>Log in Your Account</h4>
            <div className={style.loginDiv}>
              <Input
                placeholder=" Your Employee Id"
                label="Your Employee Id"
                inputRef={register}
                name="employeeId"
                error={errors?.employeeId}
                errorMessage={errors?.employeeId?.message}
              />
              <div className={style.secondDiv}>
                <Input
                  placeholder=" Your Password"
                  type={passwordVisible ? 'text' : 'password'}
                  label=" Your Password"
                  inputRef={register}
                  icon={eye}
                  name="password"
                  error={errors?.password}
                  errorMessage={errors?.password?.message}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
                <Link to={'/forgot'} style={{ textDecoration: 'none' }}>
                  <p>Forgot Password?</p>
                </Link>
              </div>
            </div>
            <div className={style.logo}>
              <Button
                text="LOG IN"
                btnClass={style.btn}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default MobileLogin;
