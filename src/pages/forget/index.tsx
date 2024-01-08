import { useNavigate } from 'react-router-dom';

import AuthService from 'services/auth-service';
import MobileForgot from './mobile-forgot';
import WebForgotPassword from './web-forgot';

import style from './forget.module.scss';

const ForgetPassword = () => {
  const navigate = useNavigate();

  const handleForgot = async (data: { email: string }, setIsLoading: any) => {
    setIsLoading(true);
    const res = await AuthService.forgetPassword(data.email);
    if (res.status === 200) {
      navigate('/login');
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className={style.downMd}>
        <WebForgotPassword handleForgot={handleForgot} />
      </div>
      <div className={style.upMd}>
        <MobileForgot handleForgot={handleForgot} />
      </div>
    </>
  );
};
export default ForgetPassword;
