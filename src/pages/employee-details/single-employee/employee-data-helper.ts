import sortIcon from 'assets/logo1.svg';

// overview

export const overviewColumns = [
  { key: 'no', name: 'No' },
  { key: 'degree', name: 'Degree' },
  { key: 'institute', name: 'Institute' },
  { key: 'percentageCgpa', name: 'Percentage/CGPA' },
];

export const overviewRows = [
  {
    no: '1',
    degree: 'Bachelor of graphic designer',
    institute: 'UOE',
    percentageCgpa: '3.4',
  },
  {
    no: '2',
    degree: 'Bachelor of graphic designer',
    institute: 'UOE',
    percentageCgpa: '3.4',
  },
];

// attendance
export const columns = [
  { key: 'date', name: 'Date' },
  { key: 'loginTime', name: 'Login Time' },
  { key: 'logoutTime', name: 'Logout Time' },
  { key: 'totalHours', name: 'Total Hours' },
  { key: 'status', name: 'Status' },
];

export const employees = [
  {
    date: '02/01/2021',
    loginTime: '10:00am',
    logoutTime: '06:00pm',
    totalHours: '8hours',
    status: 'Present',
  },
  {
    date: '02/01/2021',
    loginTime: '10:00am',
    logoutTime: '06:00pm',
    totalHours: '8hours',
    status: 'Present',
  },
  {
    date: '02/01/2021',
    loginTime: '10:00am',
    logoutTime: '06:00pm',
    totalHours: '8hours',
    status: 'Present',
  },
  {
    date: '02/01/2021',
    loginTime: '10:00am',
    logoutTime: '06:00pm',
    totalHours: '8hours',
    status: 'Present',
  },
  {
    date: '02/01/2021',
    loginTime: '10:00am',
    logoutTime: '06:00pm',
    totalHours: '8hours',
    status: 'Present',
  },
  {
    date: '02/01/2021',
    loginTime: '10:00am',
    logoutTime: '06:00pm',
    totalHours: '8hours',
    status: 'Present',
  },
  {
    date: '02/01/2021',
    loginTime: '10:00am',
    logoutTime: '06:00pm',
    totalHours: '8hours',
    status: 'Present',
  },
];

// attendance chart

export const options = {
  chart: {
    type: 'donut',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '80%',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },

  stroke: {
    width: [2, 2, 2, 2],
  },
  legend: {
    show: false,
  },

  colors: ['#57B993', '#F55E5E', '#ffbd08', '#31A6FF'],

  responsive: [
    {
      breakpoint: 600,
      options: {
        plotOptions: {
          pie: {
            donut: {
              size: '78%',
            },
          },
        },
      },
    },
  ],
};

// salary

export const columnsSalary = [
  { key: 'date', name: 'Date', icon: sortIcon },
  { key: 'designation', name: 'Designation', icon: sortIcon },
  { key: 'basic', name: 'Basic', icon: sortIcon },
  { key: 'allowance', name: 'Allowance', icon: sortIcon },
  { key: 'total', name: 'Total', icon: sortIcon },
  { key: 'remark', name: 'Remark', icon: sortIcon },
];

export const employeesSalary = [
  {
    date: '02/01/2021',
    designation: 'Internee',
    basic: '10000',
    allowance: '100',
    total: '11000',
    remark: 'Inc',
  },
  {
    date: '02/01/2021',
    designation: 'Internee',
    basic: '10000',
    allowance: '100',
    total: '11000',
    remark: 'Inc',
  },
  {
    date: '02/01/2021',
    designation: 'Internee',
    basic: '10000',
    allowance: '100',
    total: '11000',
    remark: 'Inc',
  },
  {
    date: '02/01/2021',
    designation: 'Internee',
    basic: '10000',
    allowance: '100',
    total: '11000',
    remark: 'Inc',
  },
  {
    date: '02/01/2021',
    designation: 'Internee',
    basic: '10000',
    allowance: '100',
    total: '11000',
    remark: 'Inc',
  },
  {
    date: '02/01/2021',
    designation: 'Internee',
    basic: '10000',
    allowance: '100',
    total: '11000',
    remark: 'Inc',
  },
  {
    date: '02/01/2021',
    designation: 'Internee',
    basic: '10000',
    allowance: '100',
    total: '11000',
    remark: 'Inc',
  },
  {
    date: '02/01/2021',
    designation: 'Internee',
    basic: '10000',
    allowance: '100',
    total: '11000',
    remark: 'Inc',
  },
];
