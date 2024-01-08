/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';

import Pagination from 'components/pagination';
import AddTaxSlab from '../tax-slab/add-tax';
import { columns } from './tax-helper';
import TaxService from 'services/tax-service';

import style from '../tax.module.scss';
import NewTable from 'components/table/new-table';

const TaxCalculation = ({ setIsLoading }: any) => {
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [singleId] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [sorts, setSorts] = useState([]);
  const [filters, setFilters] = useState([]);
  // const [taxSlabsData, setTaxSlabsData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [taxCalculationData, setTaxCalculationData] = useState([]);
  // const {  } = useAppSelector((state) => state.app);

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
      // setTaxSlabsData(temp);
    }
    setIsLoading(false);
  };

  const getTaxData = async () => {
    setIsLoading(true);
    const params = {
      pageSize,
      page,
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(sorts && { sorts: JSON.stringify(sorts) }),
    };
    const res = await TaxService.getAllTaxCalculationData(params);

    if (res?.status === 200) {
      setTaxCalculationData(res.data.data);
      setCount(res.data.count);
      if (res.data.data?.length < 1 && page > 0) {
        setPage((pre) => pre - 1);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTaxData();
  }, [page, pageSize, filters, sorts]);

  useEffect(() => {
    getTaxSlabsData();
  }, []);

  return (
    <>
      <div style={{ padding: '0 10px' }}>
        <NewTable
          columns={columns}
          rows={taxCalculationData}
          tableHeight={style.taxCalculationTable}
          minWidth="2826px"
          apiCall={TaxService.getAllTaxCalculationData}
          filters={filters}
          setFilters={setFilters}
          sorts={sorts}
          setSorts={setSorts}
        />
      </div>

      <div>
        <Pagination
          setPage={setPage}
          count={count}
          pageSize={pageSize}
          page={page}
        />
      </div>

      {/* <div className={style.mobileAddTaxBtnDiv}>
        <MobileButton
          mobileIcon={plusIcon}
          handleClick={() => {
            setOpen(true);
            setSingleId('');
          }}
        />
      </div> */}

      {open && (
        <AddTaxSlab
          open={open}
          setOpen={setOpen}
          getTaxSlabsData={getTaxSlabsData}
          updateId={singleId}
        />
      )}
    </>
  );
};

export default memo(TaxCalculation);
