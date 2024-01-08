import sortIcon from 'assets/logo1.svg';
import selectedSortIcon from 'assets/settings-page/selectedIcon.svg';

export const columns = [
  {
    key: 'employeeId',
    icon: sortIcon,
    selectedIcon: selectedSortIcon,
    name: 'Employee ID',
    alignText: 'center',
    width: '200px',
  },
  {
    key: 'name',
    icon: sortIcon,
    selectedIcon: selectedSortIcon,
    name: 'Particulars',
    width: '250px',
    alignText: 'left',
  },
  {
    icon: sortIcon,
    selectedIcon: selectedSortIcon,
    key: 'salary',
    name: 'Monthly Gross Salary',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val).toLocaleString() + '.00' : '-',
    alignText: 'center',
    width: '320px',
    currency: true,
  },
  {
    // icon: sortIcon,
    // selectedIcon: selectedSortIcon,
    key: 'annualGrossSalary',
    name: 'Annual Gross Salary',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val).toLocaleString() + '.00' : '-',
    alignText: 'center',
    width: '295px',
    currency: true,
  },
  {
    // icon: sortIcon,
    // selectedIcon: selectedSortIcon,
    key: 'medicalAllowance',
    name: 'Medical Allowance',
    alignText: 'center',
    width: '250px',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val).toLocaleString() + '.00' : '-',
    currency: true,
  },
  {
    // icon: sortIcon,
    // selectedIcon: selectedSortIcon,
    key: 'taxableSalary',
    name: 'Taxable Salary',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val).toLocaleString() + '.00' : '-',
    alignText: 'center',
    width: '250px',
    currency: true,
  },
  {
    // icon: sortIcon,
    // selectedIcon: selectedSortIcon,
    key: 'fixTax',
    name: 'Fix Tax',
    alignText: 'center',
    width: '250px',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val).toFixed(2).toLocaleString() : '-',
  },
  {
    // icon: sortIcon,
    // selectedIcon: selectedSortIcon,
    key: 'excessAmount',
    name: 'Excees Amount',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val).toLocaleString() + '.00' : '-',
    alignText: 'center',
    width: '250px',
    currency: true,
  },
  {
    // icon: sortIcon,
    // selectedIcon: selectedSortIcon,
    key: 'percentage',
    name: '%',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val)?.toFixed(2) + '%' : '-',
    alignText: 'center',
    width: '150px',
  },
  {
    // icon: sortIcon,
    // selectedIcon: selectedSortIcon,
    key: 'annualTax',
    name: 'Annual Tax Liability',
    alignText: 'left',
    width: '280px',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val).toLocaleString() + '.00' : '-',
    currency: true,
  },
  {
    // icon: sortIcon,
    // selectedIcon: selectedSortIcon,
    key: 'monthlyTax',
    name: 'Monthly Deduction(CLC)',
    alignText: 'left',
    width: '320px',
    toLocalString: (val: any) =>
      val !== '-' && val ? Number(val).toLocaleString() + '.00' : '-',
    currency: true,
  },
];
