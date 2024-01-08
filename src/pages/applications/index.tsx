import React, { useState } from 'react';

import NavLinks from 'components/nav-links';
import RequestForms from './request-forms';

import CardContainer from 'components/card-container';
import MyRecords from './my-records';

const Applications = () => {
  const [active, setActive] = useState(0);

  return (
    <>
      <CardContainer>
        <div
          style={{
            position: 'sticky',
            top: '0',
            zIndex: 4000,
            background: '#FAFAFA',
          }}
        >
          <NavLinks links={links} setActive={setActive} active={active} />
        </div>
        {active === 0 && <RequestForms />}
        {active === 1 && <MyRecords />}
      </CardContainer>
    </>
  );
};

export default Applications;

const links = [
  { title: 'Request Forms', left: '40px' },
  { title: 'My Records', left: '55px' },
];
