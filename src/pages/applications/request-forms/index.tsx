import React, { useState } from 'react';

import style from './request.module.scss';
import Container from 'components/container';
import RequestCards from './request-cards';
import LeaveForm from './leave-form';
import { cardsData } from './applications.helper';

const RequestForms = () => {
  const [openLeave, setOpenLeave] = useState(false);
  const [formIndex, setFormIndex] = useState(1);
  const [formType, setFormType] = useState({ type: '' });
  const handleClick = (index: number, type: string) => {
    setFormIndex(index);
    setOpenLeave(true);
    setFormType({ type });
  };

  return (
    <Container>
      <div className={style.appGrid}>
        {cardsData.map((ele, index) => (
          <RequestCards
            key={index}
            title={ele.type}
            description={ele.description}
            handleClick={() => handleClick(index, ele?.type)}
          />
        ))}
      </div>

      {openLeave && (
        <LeaveForm
          openLeave={openLeave}
          setOpenLeave={setOpenLeave}
          cardsData={cardsData[formIndex].form}
          formType={formType}
        />
      )}
    </Container>
  );
};

export default RequestForms;
