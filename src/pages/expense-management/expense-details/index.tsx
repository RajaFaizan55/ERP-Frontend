import React, { useState, useEffect } from 'react';

import Button from 'components/button';
import Pagination from 'components/pagination';
import DeletePopup from 'components/delete-modal';
import MobileButton from 'components/button/mobile-button';
import AddExpense from './add-expense';
import { columns } from './expense-helper';
import ExpenseService from 'services/expense-service';
import NewTable from 'components/table/new-table';

import style from '../expense.module.scss';
import addSvg from 'assets/logo5.svg';
import plusIcon from 'assets/mobile-view/plusIcon.svg';

const ExpenseDetails = ({ setIsLoading }: any) => {
  const [expenseData, setExpenseData] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [singleId, setSingleId] = useState('');
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);

  const getAllExpenses = async () => {
    setIsLoading(true);
    const res = await ExpenseService.getAllExpense({
      pageSize,
      page,
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(sorts && { sorts: JSON.stringify(sorts) }),
    });
    if (res.status === 200) {
      setCount(res.data.count);
      setExpenseData([...res.data.data]);
      if (res.data.data?.length < 1 && page > 0) {
        setPage((pre) => pre - 1);
      }
    }
    setIsLoading(false);
  };

  const handleDeleteExpense = async () => {
    setDeleteLoading(true);
    const res = await ExpenseService.deleteExpense(singleId);
    if (res) {
      getAllExpenses();
      setDeleteModalOpen(false);
      setSingleId('');
    }
    setDeleteLoading(false);
  };

  useEffect(() => {
    getAllExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, filters, sorts]);

  return (
    <>
      <div style={{ padding: '0 10px' }}>
        <NewTable
          columns={columns}
          rows={expenseData}
          minWidth="1166px"
          tableHeight={style.expenseDetailTableHeight}
          handleDelete={(id: string) => setSingleId(id)}
          handleEdit={(id: string) => {
            setOpen(true);
            setSingleId(id);
          }}
          handleModalOpen={() => setDeleteModalOpen(true)}
          apiCall={ExpenseService.getAllExpense}
          filters={filters}
          setFilters={setFilters}
          sorts={sorts}
          setSorts={setSorts}
        />
      </div>
      <Pagination
        setPage={setPage}
        count={count}
        pageSize={pageSize}
        page={page}
      />
      <div className={style.AddExpenseBtnDiv}>
        <div className={style.btnFixDiv}>
          <Button
            text={'Add Expense'}
            icon={addSvg}
            isLoading={false}
            handleClick={() => {
              setOpen(true);
              setSingleId('');
            }}
          />
        </div>
      </div>
      <div>
        <MobileButton
          mobileIcon={plusIcon}
          handleClick={() => {
            setOpen(true);
            setSingleId('');
          }}
        />
      </div>

      {open && (
        <AddExpense
          open={open}
          setOpen={setOpen}
          singleId={singleId}
          getAllExpenses={getAllExpenses}
          setSingleId={setSingleId}
          expenseData={expenseData}
        />
      )}

      {deleteModalOpen && (
        <DeletePopup
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          btnLoader={deleteLoading}
          handleDelete={handleDeleteExpense}
        />
      )}
    </>
  );
};

export default ExpenseDetails;
