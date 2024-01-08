import AddPolicy from './add-policy';
import ViewPolicy from './view-policy';
import Button from 'components/button';
import Loading from 'components/loading';
import RequestCards from './request-cards';
import NavLinks from 'components/nav-links';
import DeletePopup from 'components/delete-modal';
import CardContainer from 'components/card-container';
import MobileButton from 'components/button/mobile-button';

import { usePolicy } from './helper';

import addSvg from 'assets/logo5.svg';
import plusIcon from 'assets/mobile-view/plusIcon.svg';
import style from './request.module.scss';

const Policy = () => {
  const {
    currentUser,
    open,
    setOpen,
    setCurrentPolicyId,
    openViewPolicy,
    setOpenViewPolicy,
    policies,
    deleteModalOpen,
    setDeleteModalOpen,
    updateModal,
    setUpdateModal,
    policyData,
    setPolicyData,
    getPolicies,
    deletePolicy,
    loading,
    deleteLoader,
    handleClick,
  } = usePolicy();

  return (
    <CardContainer>
      <NavLinks links={[{ title: 'Policies', left: '31px' }]} />
      {loading && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      {!loading && (
        <>
          <div className={style.appGrid}>
            {policies?.map((policy: any, index: any) => (
              <RequestCards
                key={index}
                title={policy.title}
                description={policy.description}
                handleClick={() => handleClick(policy)}
                cardType={'policy'}
              />
            ))}
          </div>
          {currentUser?.role !== 'Employee' && (
            <>
              <div className={style.addTaxBtnDiv}>
                <div className={style.addTaxBtnChildDiv}>
                  <Button
                    text="Add Policy"
                    icon={addSvg}
                    isLoading={false}
                    handleClick={() => {
                      setOpen(true);
                      setCurrentPolicyId('');
                      setPolicyData({});
                    }}
                  />
                </div>
              </div>
              <div className={style.mobileAddTaxBtnDiv}>
                <MobileButton
                  mobileIcon={plusIcon}
                  handleClick={() => {
                    setOpen(true);
                  }}
                />
              </div>
            </>
          )}
        </>
      )}

      {open && (
        <AddPolicy
          open={open}
          setOpen={setOpen}
          policyData={policyData}
          updateModal={updateModal}
          getPolicies={getPolicies}
          setPolicyData={setPolicyData}
          setUpdateModal={setUpdateModal}
          setCurrentPolicyId={setCurrentPolicyId}
        />
      )}

      <ViewPolicy
        open={openViewPolicy}
        setOpen={setOpenViewPolicy}
        setIsOpen={setOpen}
        policyData={policyData}
        setDeleteModalOpen={setDeleteModalOpen}
        setCurrentPolicyId={setCurrentPolicyId}
        setUpdateModal={setUpdateModal}
      />

      {deleteModalOpen && (
        <DeletePopup
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          handleDelete={deletePolicy}
          btnLoader={deleteLoader}
        />
      )}
    </CardContainer>
  );
};

export default Policy;
