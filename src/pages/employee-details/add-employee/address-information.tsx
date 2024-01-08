import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import Input from 'components/input';
import Button from 'components/button';
import Checkbox from 'components/checkbox';

import EmployeeService from 'services/employee-service';
import { backendResponse } from './helper';

import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';
import style from './add-employee.module.scss';
import AddressService from 'services/address-service';
import countries from 'assets/countries.json';
import Select from 'components/select';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  handleBack: () => void;
  handleNext: () => void;
}

countries.sort((a, b) => (a.name < b.name ? -1 : 1));

const AddressInformation = ({
  handleBack,
  handleNext,
  setFormData,
  formData,
  employeeId,
}: Props) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCountryData, setCurrentCountryData] = useState([]);
  const [currentCitiesData, setCurrentCitiesData] = useState([]);
  const [permanentCountryData, setPermanentCountryData] = useState([]);
  const [permanentCitiesData, setPermanentCitiesData] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  let stateData: any = [];

  const { register, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxChecked(e.target.checked);
    const data = watch();
    if (e.target.checked) {
      const {
        currentAddress,
        currentCity,
        currentCode,
        currentCountry,
        currentState,
      } = data;
      await getData(
        'permanentCountryData',
        {
          country: currentCountry,
        },
        currentState,
      );
      reset({
        ...data,
        permanentAddress: currentAddress,
        permanentCity: currentCity,
        permanentCode: currentCode,
        permanentCountry: currentCountry,
        permanentState: currentState,
      });
    } else {
      reset({
        ...data,
        permanentAddress: '',
        permanentCity: '',
        permanentCode: '',
        permanentCountry: '',
        permanentState: '',
      });
    }
  };

  const onSubmit = async (data: any) => {
    setFormData({ ...formData, addressInformation: { ...data } });
    const tempObj = backendResponse({ ...data });
    if (!params?.id) {
      setIsLoading(true);
      const res = await EmployeeService.addEmployee({
        type: 2,
        addressInformation: { ...tempObj },
        employeeId,
      });
      if (res.status === 201) {
        handleNext && handleNext();
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const res = await EmployeeService.updateAddedEmployee(
        {
          type: 2,
          employeeId,
          addressInformation: { ...tempObj },
        },
        params?.id,
      );
      if (res.status === 200) {
        handleNext && handleNext();
      }
      setIsLoading(false);
    }
  };

  const getData = async (
    type: string,
    data: { country?: string },
    currentState?: string,
  ) => {
    if (data?.country) {
      if (type === 'currentCountryData') {
        setCurrentCountryData([]);
        setCurrentCitiesData([]);
      } else if (type === 'permanentCountryData') {
        setPermanentCountryData([]);
        setPermanentCitiesData([]);
      }
      const res = await AddressService.getCountryStateCityData(data);

      if (res.status === 200) {
        stateData = [...res.data.address[0].states];

        type === 'currentCountryData' &&
          setCurrentCountryData(res.data.address[0].states || []);
        type === 'permanentCountryData' &&
          setPermanentCountryData(res.data.address[0].states || []);
      }
      currentState &&
        getCities(
          'permanentCitiesData',
          res.data.address[0].states || [],
          currentState,
        );
    } else {
      type === 'currentCountryData' && setCurrentCountryData([]);
      type === 'permanentCountryData' && setPermanentCountryData([]);
    }
  };

  const getCities = (type: string, data: any, state: string) => {
    type === 'currentCitiesData' &&
      setCurrentCitiesData(
        data.find((x: any) => x.name === state)?.cities || [],
      );
    type === 'permanentCitiesData' &&
      setPermanentCitiesData(
        data.find((x: any) => x.name === state)?.cities || [],
      );
  };

  useEffect(() => {
    const getFillData = async () => {
      if (Object.keys(formData?.addressInformation)?.length) {
        const temp = { ...formData?.addressInformation };
        await getData('currentCountryData', {
          country: temp.currentCountry,
        });
        getCities('currentCitiesData', stateData, temp.currentState);
        await getData('permanentCountryData', {
          country: temp.permanentCountry,
        });
        getCities('permanentCitiesData', stateData, temp.permanentState);

        reset({ ...temp });
      }
    };
    getFillData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.padding}>
      <form className={style.form1} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Current Address</h1>
          <div className={style.grid1}>
            <Select
              label="Country"
              name="currentCountry"
              star="*"
              options={countries?.map((data) => {
                return data.name;
              })}
              error={errors?.currentCountry}
              errorMessage={errors?.currentCountry?.message}
              placeHolder="Select Country"
              inputRef={register}
              onChange={() => {
                getData('currentCountryData', {
                  country: watch().currentCountry,
                });
              }}
            />
            <Select
              name="currentState"
              label="State "
              star="*"
              options={currentCountryData?.map((data: any) => {
                return data.name;
              })}
              inputRef={register}
              error={errors?.currentState}
              errorMessage={errors?.currentState?.message}
              placeHolder="Select State"
              onChange={() => {
                getCities(
                  'currentCitiesData',
                  currentCountryData,
                  watch().currentState,
                );
              }}
            />
            <Select
              name="currentCity"
              label="City Name "
              star="*"
              options={currentCitiesData?.map((data: any) => {
                return data.name;
              })}
              inputRef={register}
              error={errors?.currentCity}
              errorMessage={errors?.currentCity?.message}
              placeHolder="Select City"
            />
            <div className={style.first}>
              <Input
                name="currentCode"
                label="Postal Code "
                type="number"
                star="*"
                inputRef={register}
                error={errors?.currentCode}
                errorMessage={errors?.currentCode?.message}
                placeholder="Postal Code"
              />
            </div>
            <div className={style.second}>
              <Input
                name="currentAddress"
                label="Address "
                star="*"
                type="text"
                inputRef={register}
                error={errors?.currentAddress}
                errorMessage={errors?.currentAddress?.message}
                placeholder="Address"
              />
            </div>
          </div>
          <div className={style.heading}>
            <h1 style={{ marginTop: '35px' }}>Permanent Address</h1>
            <Checkbox
              labelClass={style.checkBoxLabel}
              label="Same as current address "
              checked={checkboxChecked}
              handleChange={handleCheck}
            />
          </div>
          <div className={style.grid1}>
            <Select
              name="permanentCountry"
              label="Country "
              star="*"
              options={countries.map((data: any) => {
                return data.name;
              })}
              inputRef={register}
              error={errors?.permanentCountry}
              errorMessage={errors?.permanentCountry?.message}
              placeHolder="Select Country"
              onChange={() => {
                getData('permanentCountryData', {
                  country: watch().permanentCountry,
                });
              }}
            />
            <Select
              name="permanentState"
              label="State "
              star="*"
              options={permanentCountryData.map((data: any) => {
                return data.name;
              })}
              inputRef={register}
              error={errors?.permanentState}
              errorMessage={errors?.permanentState?.message}
              placeHolder="Select State"
              onChange={() => {
                getCities(
                  'permanentCitiesData',
                  permanentCountryData,
                  watch().permanentState,
                );
              }}
            />

            <Select
              name="permanentCity"
              label="City Name "
              star="*"
              options={permanentCitiesData.map((data: any) => {
                return data.name;
              })}
              inputRef={register}
              error={errors?.permanentCity}
              errorMessage={errors?.permanentCity?.message}
              placeHolder="Select City"
            />
            <div className={style.first}>
              <Input
                name="permanentCode"
                label="Postal Code  "
                type="number"
                star="*"
                inputRef={register}
                error={errors?.permanentCode}
                errorMessage={errors?.permanentCode?.message}
                placeholder="Postal Code"
              />
            </div>
            <div className={style.second}>
              <Input
                name="permanentAddress"
                label="Address "
                star="*"
                type="text"
                inputRef={register}
                error={errors?.permanentAddress}
                errorMessage={errors?.permanentAddress?.message}
                placeholder="Address"
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <div className={style.btnContainer}>
            <Button
              handleClick={handleBack}
              btnClass={style.button2}
              icon={arrowLeft}
            />
            <span>Back</span>
          </div>

          <div className={style.btnContainer}>
            <span>Next</span>
            <Button
              type="submit"
              btnClass={style.button1}
              icon={arrowRight}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressInformation;

const schema = yup
  .object()
  .shape({
    currentCity: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    currentCode: yup
      .string()
      .required()
      .min(4, 'minimum 4 digits are required')
      .max(10, 'maximum 10 digits are required'),
    currentState: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    currentCountry: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    currentAddress: yup.string().required(),
    permanentCity: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    permanentCode: yup.string().required(),
    permanentState: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    permanentCountry: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    permanentAddress: yup.string().required(),
  })
  .required();
