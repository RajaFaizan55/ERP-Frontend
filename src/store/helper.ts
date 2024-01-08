// employeeSlice helpers
export interface EmployeeSliceState {
  form1: AddEmployeeForm1;
  form2: AddEmployeeForm2;
  form3: AddEmployeeForm3;
  form4: AddEmployeeForm4;
  form5: AddEmployeeForm5;
}

export interface Education {
  degree: string;
  institute: string;
  startDate?: string;
  endDate?: string;
  percentageCGPA: string;
}

export interface AddEmployeeForm1 {
  docId: string;
  updated: boolean;
  cnic: number;
  dob: string;
  email: string;
  employeeId: string;
  firstName: string;
  gender: string;
  lastName: string;
  phone: string;
  userName: string;
}
export interface AddEmployeeForm2 {
  updated: boolean;
  temporaryAddress: {
    city: string;
    postalCode: string;
    province: string;
    country: string;
    streetAddress: string;
  };
  permanentAddress: {
    city: string;
    postalCode: string;
    province: string;
    country: string;
    streetAddress: string;
  };
}
export interface AddEmployeeForm3 {
  updated: boolean;
  joiningDate: string;
  department: string;
  designation: string;
  annualLeaves: number;
  medicalLeaves: number;
  casualLeaves: number;
  note?: string;
  loginTime: string;
  logoutTime: string;
  probation?: string;
  probationEndDate?: string;
}
export interface AddEmployeeForm4 {
  updated: boolean;
  education: Education[] | [];
}
export interface AddEmployeeForm5 {
  updated: boolean;
  salary: number;
  houseRent?: number | string;
  conveyance?: number | string;
  medical?: number | string;
  special?: number | string;
  bank: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
  };
}

export const addEmployeeForm1Initial = {
  docId: '',
  updated: false,
  cnic: 0,
  dob: '',
  email: '',
  employeeId: '',
  firstName: '',
  gender: '',
  lastName: '',
  phone: '',
  userName: '',
};

export const addEmployeeForm2Initial = {
  updated: false,
  temporaryAddress: {
    city: '',
    postalCode: '',
    province: '',
    country: '',
    streetAddress: '',
  },
  permanentAddress: {
    city: '',
    postalCode: '',
    province: '',
    country: '',
    streetAddress: '',
  },
};
export const addEmployeeForm3Initial = {
  updated: false,
  joiningDate: '',
  department: '',
  designation: '',
  annualLeaves: 0,
  medicalLeaves: 0,
  casualLeaves: 0,
  note: '',
  loginTime: '',
  logoutTime: '',
  probation: '',
  probationEndDate: '',
};
export const addEmployeeForm4Initial = {
  updated: false,
  education: [],
};
export const addEmployeeForm5Initial = {
  updated: false,
  salary: 0,
  houseRent: 0,
  conveyance: 0,
  medical: 0,
  special: 0,
  bank: {
    bankName: '',
    accountTitle: '',
    accountNumber: '',
  },
};
