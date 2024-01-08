import { useState, useEffect } from 'react';

import CardContainer from 'components/card-container';
import NavLinks from 'components/nav-links';
import GeneralSettings from './general-settings';
import ManageAccounts from './manage-accounts';
import { useAppSelector } from 'store/hooks';

import {
  adminAccountsLinks,
  employeeAccountsLinks,
} from './manage-accounts/manage-accounts-helper';

interface TabsLink {
  title: string;
  link: string;
}

const notShowMangeAccount = ['Employee', 'Human Resource'];

const Settings = () => {
  const [active, setActive] = useState(0);
  const [tabsLink, setTabLink] = useState<TabsLink[] | []>([]);
  const { currentUser } = useAppSelector((state) => state?.app);

  useEffect(() => {
    if (currentUser?.role) {
      if (!notShowMangeAccount.includes(currentUser?.role)) {
        setTabLink([...adminAccountsLinks]);
      } else {
        setTabLink([...employeeAccountsLinks]);
      }
    }
  }, [currentUser?.role]);

  return (
    <>
      <CardContainer>
        <NavLinks active={active} setActive={setActive} links={tabsLink} />
        {!notShowMangeAccount.includes(currentUser?.role) ? (
          <>
            {active === 0 ? (
              <ManageAccounts />
            ) : (
              <GeneralSettings setActive={setActive} />
            )}
          </>
        ) : (
          <GeneralSettings setActive={setActive} />
        )}
      </CardContainer>
    </>
  );
};

export default Settings;
