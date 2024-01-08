import * as yup from 'yup';

export const loginInitial = {
  userName: '',
  password: '',
};

export const loginErrorInitial = {
  userName: false,
  password: false,
};

export const schema = yup.object().shape({
  employeeId: yup.string().required(),
  password: yup.string().required(),
});
