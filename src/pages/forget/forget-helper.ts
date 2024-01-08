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
  email: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ),
});
