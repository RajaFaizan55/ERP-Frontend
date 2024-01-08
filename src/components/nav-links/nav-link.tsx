import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router';

import style from './nav-link.module.scss';

interface Props {
  color: string;
  title: string;
  index: number;
  active: number;
  navLinkClass?: string;
  setActive: Dispatch<SetStateAction<number>>;
  onlyActive?: number | boolean;
  left?: string;
  routeLink?: string;
}

const NavLink = ({
  color,
  title,
  index,
  active,
  setActive,
  navLinkClass,
  left,
  routeLink,
  onlyActive = false,
}: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        style={{
          zIndex: index === active ? 1000 : '',
          pointerEvents:
            onlyActive === false
              ? 'auto'
              : onlyActive !== index
              ? 'none'
              : 'auto',
        }}
        className={`${style.navLink} ${navLinkClass} ${
          index > 0 && style.navLinkOther
        }`}
        onClick={() => {
          routeLink && navigate(routeLink);
          setActive(index);
        }}
      >
        <p
          className={style.navLinkTitle}
          style={{
            color: active === index ? '#fff' : '#8B8B8B',
            left: left,
            textTransform: 'capitalize',
          }}
        >
          {title}
        </p>
        <svg
          className={style.navLinkIcon}
          viewBox="0 0 200.175 74.934"
          width="200"
          height="70"
        >
          <defs>
            <filter
              id="Path_257"
              x="0"
              y="0"
              width="200.175"
              height="74.934"
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy="3" />
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodOpacity="0.161" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_257)">
            <path
              id="Path_257-2"
              data-name="Path 257"
              d="M5.538,56.934H127.376c39.762,0,17.268-30.85,53.166-52.865C185.436-.215,178.062,0,175,0H5.538C2.479,0,0,1.822,0,4.068v48.8C0,55.113,2.479,56.934,5.538,56.934Z"
              transform="translate(9 6)"
              fill={active === index ? color : 'white'}
            />
          </g>
        </svg>
      </button>
    </>
  );
};

export default NavLink;
