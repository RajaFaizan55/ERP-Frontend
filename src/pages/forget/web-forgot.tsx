import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './forget-helper';

import Loading from 'components/loading';

import style from './forget.module.scss';
import LogoImage from 'assets/logo.svg';

const WebForgotPassword = ({ handleForgot }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    handleForgot(data, setIsLoading);
  };

  return (
    <div className={style.loginMain}>
      <div className={style.loginOverlay}>
        <div className={style.loginCardParent}>
          <div className={style.loginCard}>
            <div className={style.loginContent}>
              <img src={LogoImage} width="110px" alt="logo" />
              <span className={style.loginTitle}>Forget Password</span>
              <form
                className={style.loginForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    className={style.loginLabel}
                    style={{
                      color: errors?.email ? '#ff5050' : '#dcdcdc',
                    }}
                  >
                    Enter Your Email
                    <input
                      type="text"
                      style={{
                        color: errors?.email ? '#ff5050' : 'white',
                        borderColor: errors?.email ? '#ff5050' : 'gray',
                      }}
                      className={style.loginInput}
                      name="email"
                      placeholder="abc@123.com"
                      ref={register}
                    />
                  </label>
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
                    'Send'
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
export default WebForgotPassword;
