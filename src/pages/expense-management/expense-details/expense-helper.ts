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
    key: 'category',
    name: 'Category',
    icon: sortIcon,
    selectedIcon: selectedsortIcon,
    alignText: 'left',
    width: '200px',
  },
  {
    key: 'description',
    name: 'Description',
    icon: sortIcon,
    selectedIcon: selectedsortIcon,
    alignText: 'left',
    width: '200px',
  },
  {
    key: 'amount',
    name: 'Amount',
    icon: sortIcon,
    selectedIcon: selectedsortIcon,
    alignText: 'center',
    width: '200px',
    toLocalString: (val: any) =>
      val !== '-' ? Number(val).toLocaleString() + '.00' : '-',
  },
  {
    key: 'remarks',
    name: 'Status',
    icon: sortIcon,
    selectedIcon: selectedsortIcon,
    alignText: 'center',
    width: '150px',
  },
  { key: 'actions', name: 'Action', alignText: 'center', width: '130px' },
];

export const rows = [
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Paid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Unpaid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Paid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Unpaid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Paid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Paid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Paid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Paid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Paid',
  },
  {
    date: '1/12/12',
    category: 'Office Rent',
    description: ' Office Rent Details',
    amount: '30,000',
    remarks: 'Paid',
  },
];
