import { Dispatch, memo, SetStateAction } from 'react';

import { convertBase64Image } from 'main-helper';
import { createNotification } from 'common/create-notification';

import style from './profile.module.scss';
import camera from 'assets/employee-page/cameraIcon.svg';
import icon from 'assets/employee-page/user2.svg';

interface Props {
  setImg?: Dispatch<SetStateAction<any>>;
  img?: string;
}

const Profile = ({ setImg, img }: Props) => {
  const handleFileChange = async (e: any) => {
    e.preventDefault();

    if (e.target.files[0].size <= 2048000) {
      const data = await convertBase64Image(e.target.files[0]);
      setImg && setImg(data);
    } else {
      createNotification('error', 'Error', 'The image maximum size is 2MB');
    }
  };

  return (
    <form>
      <div className={style.main}>
        <label htmlFor="abc">
          <div className={style.img}>
            <img src={img ? img : icon} alt="" />
            {/* <p>Please click camera icon to upload or change the picture</p> */}
          </div>

          <img src={camera} alt="" className={style.icon} />
          <input
            type="file"
            id="abc"
            hidden
            accept="image/*"
            name="abc"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </form>
  );
};

export default memo(Profile);
