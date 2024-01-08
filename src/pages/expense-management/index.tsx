import React, { useState } from 'react';

import NavLinks from 'components/nav-links';
import CardContainer from 'components/card-container';

import style from './expense.module.scss';
import ExpenseDetails from './expense-details';
import Explore from './explore';
import Loading from 'components/loading';

const ExpenseManagement = () => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <CardContainer>
        <div className={style.headerDiv}>
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

        {active === 0 && <ExpenseDetails setIsLoading={setIsLoading} />}
        {active === 1 && <Explore setIsLoading={setIsLoading} />}
      </CardContainer>
    </>
  );
};

export default ExpenseManagement;

const links = [
  { title: 'Expense Details', left: '40px' },
  { title: 'Explore', left: '65px' },
];
