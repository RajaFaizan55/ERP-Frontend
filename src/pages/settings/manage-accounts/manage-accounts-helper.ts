import sortIcon from 'assets/logo1.svg';

export interface ManageAccountsAddUser {
  employeeId: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  account: string;
  status?: string;
  role?: string;
  img?: string;
}

export interface ManageAccountsEditEmployee {
  id?: string | number;
  employeeId: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  account: string;
  status: string;
  role: string;
  img?: string;
}

export const adminAccountsLinks = [
  { title: 'Manage Account', link: '/settings', left: '35px' },
  { title: 'General Settings', link: '/settings', left: '40px' },
];
export const employeeAccountsLinks = [
  { title: 'General Settings', link: '/settings', left: '40px' },
];

export const columns = [
  {
    key: 'employeeId',
    name: 'Employee ID',
    icon: sortIcon,
    width: '200px',
    alignText: 'center',
  },
  { key: 'name', name: 'Name', width: '250px', alignText: 'left' },
  {
    key: 'designation',
    name: 'Designation',
    icon: sortIcon,
    width: '200px',
    alignText: 'left',
  },
  { key: 'status', name: 'Status', width: '150px', alignText: 'center' },
  { key: 'actions', name: 'Actions', width: '150px', alignText: 'center' },
];
