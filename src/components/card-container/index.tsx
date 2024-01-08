import React from 'react';

import Container from 'components/container';

import style from './card-container.module.scss';

interface Props {
  children?: any;
}

const CardContainer = ({ children }: Props) => {
  return (
    <Container>
      <div className={style.mainContainer}>
        <div className={style.height}>{children}</div>
      </div>
    </Container>
  );
};

export default CardContainer;
