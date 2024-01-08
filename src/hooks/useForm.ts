import { useState } from 'react';

export const useForm = (
  callback: any,
  initialState: any,
  errorsInitial: any,
) => {
  const [errors, setErrors] = useState(errorsInitial);
  const [data, setData] = useState(initialState);
  const onChange = (event: any) => {
    setData(() => {
      return {
        ...data,
        [event.target.name]: event.target.value,
      };
    });
    setErrors(() => {
      return {
        ...errors,
        [event.target.name]: event.target.value ? true : false,
      };
    });
  };

  const onSubmit = (event: any) => {
    event && event.preventDefault();
    callback(data);
  };

  return {
    onChange,
    onSubmit,
    data,
    setData,
    errors,
  };
};
