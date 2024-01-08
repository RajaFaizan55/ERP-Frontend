import React, { useState } from 'react';

import TaxSlab from './tax-slab';
import NavLinks from 'components/nav-links';
import CardContainer from 'components/card-container';
import TaxCalculation from './tax-calculation';
import style from './tax.module.scss';
import Loading from 'components/loading';

const Tax = () => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <CardContainer>
        <div style={{ position: 'relative', zIndex: 201 }}>
          <NavLinks
            navLinkClass={style.navLink}
            links={links}
            setActive={setActive}
            active={active}
          />
        </div>
        {isLoading && (
          <div className={style.loaderDiv}>
            <Loading loaderClass={style.loadingStyle} />
          </div>
        )}
        {active === 0 && <TaxCalculation setIsLoading={setIsLoading} />}
        {active === 1 && <TaxSlab setIsLoading={setIsLoading} />}
      </CardContainer>
    </>
  );
};

export default Tax;

const links = [
  { title: 'Tax-Calculation', left: '41px' },
  { title: 'Tax-Slab', left: '60px' },
];
