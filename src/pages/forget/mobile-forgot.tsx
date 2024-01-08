import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './forget-helper';

import Input from 'components/input';
import Button from 'components/button';

import style from './forget.module.scss';
import logo from 'assets/mobile-view/sprintx.svg';

const MobileForgot = ({ handleForgot }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    handleForgot(data, setIsLoading);
  };

  return (
    <>
      <div className={style.bg}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.loginDiv}>
            <Input
              placeholder="Enter Your Email"
              label="Enter Your Email"
              type="email"
              name="email"
              inputRef={register}
              error={errors?.email}
              errorMessage={errors?.email?.message}
            />
          </div>
          <div className={style.logo}>
            <Button
              type={'submit'}
              text="SEND"
              btnClass={style.btn}
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default MobileForgot;
