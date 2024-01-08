import React, { Dispatch, SetStateAction } from 'react';

import style from './nav-link.module.scss';

import NavLink from './nav-link';
import { Link } from 'interfaces';

interface Props {
  active?: any;
  setActive?: Dispatch<SetStateAction<number>>;
  links?: Link[];
  navLinkClass?: string;
  onlyActive?: number | boolean;
}

const NavLinks = ({
  active = 0,
  setActive = () => {},
  links,
  navLinkClass,
  onlyActive,
}: Props) => {
  return (
    <>
      <div className={style.navLinksContainer}>
        <div className={style.navWidth}>
          {links?.map(({ title, left, link }: Link, index) => (
            <NavLink
              key={index}
              color={'#57b993'}
              title={title}
              index={index}
              active={active && active}
              setActive={setActive}
              left={left}
              routeLink={link}
              navLinkClass={navLinkClass}
              onlyActive={onlyActive}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NavLinks;
