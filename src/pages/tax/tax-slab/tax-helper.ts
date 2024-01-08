// import sortIcon from 'assets/logo1.svg';

export const columns = [
  {
    key: '_id',
    // icon: sortIcon,
    name: 'S No.',
    alignText: 'center',
    width: '140px',
  },
  {
    key: 'lower',
    name: 'Lower',
    // icon: sortIcon,
    alignText: 'left',
    width: '200px',
    toLocalString: (val: any) =>
      val !== '-' ? Number(val).toLocaleString() + '.00' : '-',
  },
  {
    key: 'upper',
    // icon: sortIcon,
    name: 'Upper',
    alignText: 'center',
    width: '200px',
    toLocalString: (val: any) =>
      val !== '-' ? Number(val).toLocaleString() + '.00' : '-',
  },
  {
    key: 'fixTax',
    // icon: sortIcon,
    name: 'Fix Tax',
    alignText: 'center',
    width: '200px',
    toLocalString: (val: any) =>
      val !== '-' ? Number(val).toLocaleString() + '.00' : '-',
  },
  {
    key: 'taxRate',
    // icon: sortIcon,
    name: 'Tax Rate',
    alignText: 'center',
    width: '140px',
    toLocalString: (val: any) =>
      val !== '-' ? Number(val).toLocaleString() + '%' : '-',
  },
  {
    key: 'lessLimit',
    // icon: sortIcon,
    name: 'Less Limit',
    alignText: 'center',
    width: '200px',
    toLocalString: (val: any) =>
      val !== '-' ? Number(val).toLocaleString() + '.00' : '-',
  },
  {
    key: 'actions',
    // icon: sortIcon,
    name: 'Actions',
    alignText: 'center',
    width: '200px',
  },
];

export const rows = [
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
  {
    id: '01',
    lower: '600,001',
    upper: 'Haleema Mughal',
    fix: '##########',
    tax: '5:00%',
    lessLimit: '--',
  },
];
