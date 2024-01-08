/* @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAppSelector } from 'store/hooks';
import NewTable from 'components/table/new-table';
import MobileButton from 'components/button/mobile-button';
import Button from 'components/button';
import Loading from 'components/loading';
import Pagination from 'components/pagination';
import DeletePopup from 'components/delete-modal';

import EditEmployee from './edit-employee';
import AddEmployee from 'pages/settings/manage-accounts/add-employee';

import { Employee } from 'interfaces/employee';
import SettingsService from 'services/settings-service';
import { columns } from './manage-accounts-helper';

import style from './manage-accounts.module.scss';
import addSvg from 'assets/logo5.svg';
import plusIcon from 'assets/mobile-view/plusIcon.svg';

const ManageAccounts = () => {
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [btnLoader, setBtnLoading] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [singleId, setSingleId] = useState<number | string>('');
  const [employees, setEmployees] = useState<Employee[] | []>([]);
  const [manageAccountsTable, setManageAccountsTable] = useState(false);

  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useAppSelector((state) => state.app);

  const getEmployeesData = async () => {
    setLoading(true);
    const res = await SettingsService.getAllUsers({
      pageSize,
      page,
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(sorts && { sorts: JSON.stringify(sorts) }),
    });
    if (res.status === 200) {
      setEmployees(res.data?.data);
      setCount(res.data?.count);
    }
    setLoading(false);
  };

  const removeEmployee = async () => {
    setBtnLoading(true);
    await SettingsService.deleteEmployee(singleId);
    setDeleteModalOpen(false);
    setBtnLoading(false);
    getEmployeesData();
  };

  const handleEdit = (id: string) => {
    navigate(`/settings/edit/${id}`);
  };

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setAddEmployee(true);
      setEditEmployee(false);
      setManageAccountsTable(false);
    } else if (location.pathname.includes('edit')) {
      setEditEmployee(true);
      setAddEmployee(false);
      setManageAccountsTable(false);
    } else {
      setManageAccountsTable(true);
      setAddEmployee(false);
      setEditEmployee(false);
    }
  }, [location]);

  useEffect(() => {
    if (currentUser?.role && currentUser?.role !== 'Employee')
      getEmployeesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.role, page, pageSize, filters, sorts]);

  return (
    <>
      {loading && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      {manageAccountsTable && (
        <>
          <div style={{ padding: '0 10px' }}>
            <NewTable
              columns={columns}
              rows={employees}
              loading={loading}
              tableHeight={style.manageAccountsTableHeight}
              handleDelete={(id: string) => setSingleId(id)}
              handleEdit={(id: string) => handleEdit(id)}
              handleModalOpen={() => setDeleteModalOpen(true)}
              apiCall={SettingsService.getAllUsers}
              filters={filters}
              setFilters={setFilters}
              sorts={sorts}
              setSorts={setSorts}
              minWidth="955px"
            />
          </div>

          <Pagination
            setPage={setPage}
            count={count}
            pageSize={pageSize}
            page={page}
          />

          <div className={style.addEmployeeBtnDiv}>
            <div className={style.addEmployeeChildDiv}>
              <Button
                text="Add Employee"
                icon={addSvg}
                handleClick={() => navigate('/settings/add')}
              />
            </div>
          </div>

          <div>
            <MobileButton
              mobileIcon={plusIcon}
              handleClick={() => navigate('/settings/add')}
            />
          </div>
        </>
      )}

      {addEmployee && (
        <AddEmployee
          employees={employees}
          getEmployeesData={getEmployeesData}
        />
      )}

      {editEmployee && (
        <EditEmployee
          employees={employees}
          getEmployeesData={getEmployeesData}
        />
      )}
      <DeletePopup
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        handleDelete={removeEmployee}
        btnLoader={btnLoader}
      />
    </>
  );
};
export default ManageAccounts;
