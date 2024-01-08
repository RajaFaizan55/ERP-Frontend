import dashboardImg from 'assets/navbar-sidebar/Dashboard.svg';
import employeeDetailsImg from 'assets/navbar-sidebar/Employee Details.svg';
import payRollImg from 'assets/navbar-sidebar/PayRoll.svg';
import taxImg from 'assets/navbar-sidebar/Tax.svg';
import clientInfoImg from 'assets/navbar-sidebar/Clients Info.svg';
import projectDetailImg from 'assets/navbar-sidebar/Project Details.svg';
import expenseManagementImg from 'assets/navbar-sidebar/Expense Management.svg';
import salesOrderManagementImg from 'assets/navbar-sidebar/Sales Order Management.svg';
import calenderImg from 'assets/navbar-sidebar/Calender.svg';
import attendanceImg from 'assets/navbar-sidebar/Attendance.svg';
import advanceSalaryLoanImg from 'assets/navbar-sidebar/Advance salary-Loan.svg';
import settingsImg from 'assets/navbar-sidebar/Settings.svg';
import policyImg from 'assets/policy.svg';

// Green Img
import gDashboardImg from 'assets/navbar-sidebar/green/Dashboard.svg';
import gEmployeeDetailsImg from 'assets/navbar-sidebar/green/Employees.svg';
import gPayRollImg from 'assets/navbar-sidebar/green/PayRoll.svg';
import gTaxImg from 'assets/navbar-sidebar/green/Tax.svg';
import gClientInfoImg from 'assets/navbar-sidebar/green/Clients Info.svg';
import gProjectDetailImg from 'assets/navbar-sidebar/green/Project Details.svg';
import gExpenseManagementImg from 'assets/navbar-sidebar/green/Expense Management.svg';
import gSalesOrderManagementImg from 'assets/navbar-sidebar/green/Sales Order Management.svg';
import gCalenderImg from 'assets/navbar-sidebar/green/Calender.svg';
import gAttendanceImg from 'assets/navbar-sidebar/green/Attendance.svg';
import gAdvanceSalaryLoanImg from 'assets/navbar-sidebar/green/Advance salary-Loan.svg';
import gSettingsImg from 'assets/navbar-sidebar/green/Settings.svg';
import gPolicy from 'assets/gpolicy.svg';

// form Hr and Admin Role

const roles: any = {
  all: ['Admin', 'Human Resource', 'Employee'],
  adminHr: ['Admin', 'Human Resource'],
  admin: ['Admin'],
};
export const adminListArr = [
  {
    path: '/',
    active: 'dashboard',
    title: 'Dashboard',
    img1: dashboardImg,
    img2: gDashboardImg,
    role: [...roles.all],
  },
  {
    path: '/employee',
    active: 'employee',
    title: 'Profiles',
    img1: employeeDetailsImg,
    img2: gEmployeeDetailsImg,
    role: [...roles.all],
  },
  {
    path: '/payroll',
    active: 'payroll',
    title: 'PayRoll',
    img1: payRollImg,
    img2: gPayRollImg,
    role: [...roles.adminHr],
  },
  {
    path: '/tax',
    active: 'tax',
    title: 'Tax',
    img1: taxImg,
    img2: gTaxImg,
    role: [...roles.all],
  },
  {
    path: '/clients-info',
    active: 'clients-info',
    title: 'Clients',
    img1: clientInfoImg,
    img2: gClientInfoImg,
    role: [...roles.adminHr],
  },
  {
    path: '/project-details',
    active: 'project-details',
    title: 'Projects',
    img1: projectDetailImg,
    img2: gProjectDetailImg,
    role: [...roles.adminHr],
  },
  {
    path: '/expense-management',
    active: 'expense-management',
    title: 'Expenses',
    img1: expenseManagementImg,
    img2: gExpenseManagementImg,
    role: [...roles.admin],
  },
  {
    path: '/sales-management',
    active: 'sales-management',
    title: 'Sales',
    img1: salesOrderManagementImg,
    img2: gSalesOrderManagementImg,
    role: [...roles.adminHr],
  },
  {
    path: '/calender',
    active: 'calender',
    title: 'Calender',
    img1: calenderImg,
    img2: gCalenderImg,
    role: [...roles.all],
  },
  {
    path: '/attendance',
    active: 'attendance',
    title: 'Attendance',
    img1: attendanceImg,
    img2: gAttendanceImg,
    role: [...roles.all],
  },

  {
    path: '/applications',
    active: 'applications',
    title: 'Applications',
    img1: advanceSalaryLoanImg,
    img2: gAdvanceSalaryLoanImg,
    role: [...roles.all],
  },

  {
    path: '/policy',
    active: 'policy',
    title: 'Policy',
    img1: policyImg,
    img2: gPolicy,
    role: [...roles.all],
  },
  {
    path: '/settings',
    active: 'settings',
    title: 'Settings',
    img1: settingsImg,
    img2: gSettingsImg,
    role: [...roles.all],
  },
];

// for Employee Role
export const employeeListArr = [
  {
    path: '/',
    active: 'dashboard',
    title: 'Dashboard',
    img1: dashboardImg,
    img2: gDashboardImg,
  },
  {
    path: '/employee',
    active: 'employee',
    title: 'Profiles',
    img1: employeeDetailsImg,
    img2: gEmployeeDetailsImg,
  },

  {
    path: '/tax',
    active: 'tax',
    title: 'Tax',
    img1: taxImg,
    img2: gTaxImg,
  },

  {
    path: '/attendance',
    active: 'attendance',
    title: 'Attendance',
    img1: attendanceImg,
    img2: gAttendanceImg,
  },

  {
    path: '/applications',
    active: 'applications',
    title: 'Applications',
    img1: advanceSalaryLoanImg,
    img2: gAdvanceSalaryLoanImg,
  },
  {
    path: '/settings',
    active: 'settings',
    title: 'Settings',
    img1: settingsImg,
    img2: gSettingsImg,
  },
];
