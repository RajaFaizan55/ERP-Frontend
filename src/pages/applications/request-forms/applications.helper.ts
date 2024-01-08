import DatePicker from 'components/date-picker';
import Input from 'components/input';
import Select from 'components/select';
import TextArea from 'components/textarea';
import InstallmentPlan from './loan-form';

export const leave = [
  {
    key: 'date',
    type: 'date',
    component: DatePicker,
    name: 'startDate',
    placeholder: 'From',
  },
  {
    type: 'date',
    key: 'date',
    component: DatePicker,
    name: 'endDate',
    placeholder: 'To',
  },
  {
    key: 'input',
    type: 'text',
    component: Input,
    name: 'employeeId',
    placeholder: 'Employee ID',
  },
  {
    type: 'time',
    key: 'input',
    component: Input,
    name: 'startTime',
    placeholder: 'Start Time',
    required: true,
  },
  {
    type: 'time',
    key: 'input',
    component: Input,
    name: 'endTime',
    placeholder: 'End Time',
    required: true,
  },

  {
    type: '',
    key: 'select',
    component: Select,
    options: ['Medical', 'Annual'],
    name: 'leaveType ',
    placeholder: 'Select Leave Type',
  },

  {
    type: '',
    key: 'textArea',
    component: TextArea,
    name: 'reason',
    placeholder: 'Reason',
  },
];

export const resignation = [
  {
    key: 'input',
    type: 'text',
    component: Input,
    name: 'employeeId',
    placeholder: 'Employee ID',
  },
  {
    key: 'date',
    type: 'date',
    component: DatePicker,
    name: 'startDate',
    placeholder: 'Resignation Date',
  },
  {
    key: 'date',
    type: 'date',
    component: DatePicker,
    name: 'endDate',
    placeholder: 'Last Working Date',
  },
  {
    key: 'textArea',
    type: '',
    component: TextArea,
    name: 'reason',
    placeholder: 'Description',
  },
];

export const stationary = [
  {
    key: 'input',
    type: 'text',
    component: Input,
    name: 'employeeId',
    placeholder: 'Employee ID',
  },
  // {
  //   key: 'date',
  //   type: 'date',
  //   component: DatePicker,
  //   name: 'stationaryDate',
  //   placeholder: 'Date',
  // },
  {
    key: 'textArea',
    type: '',
    component: TextArea,
    name: 'reason',
    placeholder: 'Description',
  },
];

export const uniform = [
  {
    key: 'input',
    type: 'text',
    component: Input,
    name: 'employeeId',
    placeholder: 'Employee ID',
  },
  // {
  //   key: 'date',
  //   type: 'date',
  //   component: DatePicker,
  //   name: 'uniformDate',
  //   placeholder: 'Date',
  // },

  {
    key: 'textArea',
    type: '',
    component: TextArea,
    name: 'reason',
    placeholder: 'Description',
  },
];

export const advanceSalary = [
  {
    key: 'input',
    type: 'text',
    component: Input,
    name: 'employeeId',
    placeholder: 'Employee ID',
  },
  {
    key: 'amount',
    type: 'number',
    component: Input,
    name: 'requiredAmount',
    placeholder: 'Required Amount',
  },
  {
    type: '',
    key: 'textArea',
    component: TextArea,
    name: 'reason',
    placeholder: 'Reason',
  },
];

export const loanApplication = [
  {
    key: 'input',
    type: 'text',
    component: Input,
    name: 'employeeId',
    placeholder: 'Employee ID',
  },
  {
    key: 'amount',
    type: 'number',
    component: Input,
    name: 'requiredAmount',
    placeholder: 'Required Amount',
  },
  {
    key: 'amount',
    type: 'number',
    component: Input,
    name: 'requiredAmount',
    placeholder: 'When Required',
  },
  {
    key: 'date',
    type: 'date',
    component: DatePicker,
    name: 'loanDate',
    placeholder: 'Date',
  },
  {
    key: 'table',
    type: '',
    component: InstallmentPlan,
    name: 'table',
    placeholder: '',
  },
  {
    type: '',
    key: 'textArea',
    component: TextArea,
    name: 'reason',
    placeholder: 'Reason',
  },
];

export const gatePass = [
  {
    key: 'input',
    type: 'text',
    component: Input,
    name: 'employeeId',
    placeholder: 'Employee ID',
  },
  {
    key: 'timeOut',
    type: 'time',
    component: Input,
    name: 'timeOut',
    placeholder: 'Time Out',
    required: true,
  },

  {
    key: 'timeIn',
    type: 'time',
    component: Input,
    name: 'timeIn',
    placeholder: 'Time In',
    required: true,
  },
  {
    key: 'textArea',
    type: '',
    component: TextArea,
    name: 'reason',
    placeholder: 'Reason for leaving',
  },
];

export const others = [
  {
    key: 'input',
    type: 'text',
    component: Input,
    name: 'employeeId',
    placeholder: 'Employee ID',
  },
  {
    key: 'subject',
    type: 'text',
    component: Input,
    name: 'subject',
    placeholder: 'Subject',
  },

  {
    key: 'textArea',
    type: '',
    component: TextArea,
    name: 'reason',
    placeholder: 'Reason',
  },
];

export const cardsData = [
  {
    type: 'Leave',
    description:
      'You can apply for a Sick, annual and casual leave buy clicking the button.',
    form: [...leave],
  },
  {
    type: 'Resignation',
    description: 'You can apply for resignation, by clicking on the button.',
    form: [...resignation],
  },
  {
    type: 'Advance Salary',
    description:
      'If you need some finance for domestic & personal use you can apply by clicking the button.',
    form: [...advanceSalary],
  },
  {
    type: 'Loan',
    description:
      'Apply for the loan from the country for your personal & demostic use by clicking the button.',
    form: [...loanApplication],
  },
  {
    type: 'Gate Pass',
    description:
      'Apply for the gate pass, with a valid reason by clicking on the button.',
    form: [...gatePass],
  },
  {
    type: 'Stationary',
    description:
      'Apply for stationary(Pens, paper etc) by clicking on the button.',
    form: [...stationary],
  },
  {
    type: 'Uniform',
    description:
      'Apply for the uniform as per design by clicking on the button.',
    form: [...uniform],
  },
  {
    type: 'Others',
    description: 'Apply for any kind of query bu clicking on the button.',
    form: [...others],
  },
];
