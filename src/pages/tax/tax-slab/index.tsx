/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import AddTaxSlab from './add-tax';
import DeletePopup from 'components/delete-modal';
import { useAppSelector } from 'store/hooks';
import NewTable from 'components/table/new-table';
import { columns } from './tax-helper';
import TaxService from 'services/tax-service';
import style from '../tax.module.scss';
import Button from 'components/button';
import addSvg from 'assets/logo5.svg';
import MobileButton from 'components/button/mobile-button';
import plusIcon from 'assets/mobile-view/plusIcon.svg';

const TaxSlab = ({ setIsLoading }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taxSlabsData, setTaxSlabsData] = useState<any[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [singleId, setSingleId] = useState('');
  const [columnArr, setColumnArr] = useState<any>([]);

  const { currentUser } = useAppSelector((state) => state.app);

  const getTaxSlabsData = async () => {
    setIsLoading(true);
    const res = await TaxService.getAllTaxSlabsData();
    if (res.status === 200) {
      const temp: any[] = [];
      res.data.tax.forEach((x: any, index: number) => {
        x.id = x._id;
        x._id = index + 1;
        temp.push(x);
      });
      setTaxSlabsData(temp);
    }
    setIsLoading(false);
  };

  const deleteTaxSlab = async () => {
    setDeleteLoading(true);
    const res = await TaxService.deleteTaxSlab(singleId);
    if (res.status === 200) {
      getTaxSlabsData();
      setDeleteLoading(false);
      setDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role && currentUser?.role === 'Employee') {
      const tempArr = [...columns];
      tempArr.splice(tempArr.length - 1);
      setColumnArr([...tempArr]);
    }
  }, [currentUser?.role]);

  useEffect(() => {
    getTaxSlabsData();
  }, []);

  return (
    <>
      <div style={{ padding: '0 10px' }}>
        <NewTable
          columns={columnArr?.length ? columnArr : columns}
          rows={taxSlabsData}
          handleDelete={(id: string) => setSingleId(id)}
          minWidth="1280px"
          tableHeight={style.taxSlabTableHeight}
          handleEdit={(id: string) => {
            setOpen(true);
            setSingleId(id);
          }}
          handleModalOpen={() => setDeleteModalOpen(true)}
        />
      </div>
      {currentUser?.role !== 'Employee' && (
        <>
          <div className={style.addTaxBtnDiv}>
            <div className={style.addTaxBtnChildDiv}>
              <Button
                text="Add Tax-Slab"
                icon={addSvg}
                isLoading={false}
                handleClick={() => {
                  setOpen(true);
                  setSingleId('');
                }}
              />
            </div>
          </div>

          <div className={style.mobileAddTaxBtnDiv}>
            <MobileButton
              mobileIcon={plusIcon}
              handleClick={() => {
                setOpen(true);
                setSingleId('');
              }}
            />
          </div>
        </>
      )}
      {open && (
        <AddTaxSlab
          open={open}
          setOpen={setOpen}
          getTaxSlabsData={getTaxSlabsData}
          updateId={singleId}
        />
      )}
      {deleteModalOpen && (
        <DeletePopup
          handleDelete={deleteTaxSlab}
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          btnLoader={deleteLoading}
        />
      )}
    </>
  );
};

export default TaxSlab;
