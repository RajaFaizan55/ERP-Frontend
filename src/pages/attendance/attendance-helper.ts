import sortIcon from 'assets/logo1.svg';
import selectedsortIcon from 'assets/settings-page/selectedIcon.svg';

export const columns = [
  {
    key: 'date',
    name: 'Date',
    icon: sortIcon,
    selectedIcon: selectedsortIcon,
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'employeeId',
    name: 'Employee ID',
    icon: sortIcon,
    selectedIcon: selectedsortIcon,
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'name',
    name: 'Name',
    icon: sortIcon,
    selectedIcon: selectedsortIcon,
    alignText: 'left',
    width: '200px',
  },
  {
    key: 'loginTime',
    selectedIcon: selectedsortIcon,
    name: 'Login Time',
    icon: sortIcon,
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'logoutTime',
    selectedIcon: selectedsortIcon,
    name: 'Logout Time',
    icon: sortIcon,
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'totalHours',
    selectedIcon: selectedsortIcon,
    name: 'Total Hours',
    icon: sortIcon,
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'status',
    selectedIcon: selectedsortIcon,
    name: 'Status',
    icon: sortIcon,
    alignText: 'center',
    width: '150px',
  },
  { key: 'actions', name: 'Actions', alignText: 'center', width: '150px' },
];
