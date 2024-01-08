import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import Input from 'components/input';
import Button from 'components/button';
import DatePicker from 'components/date-picker';
import DeletePopup from 'components/delete-modal';

import { columns } from './helper';
import { removeKey } from 'main-helper';
import { Education } from 'store/helper';
import EmployeeService from 'services/employee-service';

import style from './add-employee.module.scss';
import add from 'assets/employee-page/Group 1853.png';
import arrowRight from 'assets/employee-page/arrow-right.svg';
import arrowLeft from 'assets/employee-page/arrow-left.svg';
import NewTable from 'components/table/new-table';

interface Props {
  handleBack?: () => void;
  handleNext?: () => void;
  setFormData: any;
  formData: any;
  employeeId: string;
}

const EducationalDetails = ({
  handleBack,
  handleNext,
  setFormData,
  formData,
  employeeId,
}: Props) => {
  const [educations, setEducations] = useState<Education[] | []>([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateEdu, setUpdateEdu] = useState({
    update: false,
    editInd: -1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  const { register, handleSubmit, errors, reset, control, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const params = useParams();

  const onSubmit = async () => {
    setFormData({ ...formData, educationDetails: [...educations] });
    if (educations?.length) {
      if (!params?.id) {
        setIsLoading(true);
        const res = await EmployeeService.addEmployee({
          type: 4,
          educationDetails: [...educations],
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
            type: 4,
            employeeId,
            educationDetails: [...educations],
          },
          params?.id,
        );
        if (res.status === 200) {
          handleNext && handleNext();
        }
        setIsLoading(false);
      }
    }
  };
  const handleAddEduction = (data: Education) => {
    const newEducations: any = [...educations];
    const tempObj = {
      ...data,
      endDate: moment(data?.endDate).format('MM/DD/YYYY'),
      startDate: moment(data?.startDate).format('MM/DD/YYYY'),
    };

    if (!updateEdu.update) {
      newEducations.push(tempObj);
    } else {
      newEducations[updateEdu.editInd] = { ...tempObj };
      setUpdateEdu({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, educationDetails: [...newEducations] });
    reset({});
  };

  const handleDelete = () => {
    const temp: any = [...educations];
    temp.splice(updateEdu.editInd, 1);
    setEducations([...temp]);
    setOpenModal(false);
  };

  const handleEducation = (index: any) => {
    let temp: any = [...educations][index];
    temp = {
      ...temp,
      endDate: new Date(temp.endDate),
      startDate: new Date(temp.startDate),
    };
    reset({ ...temp });
    setUpdateEdu({ update: true, editInd: index });
  };

  useEffect(() => {
    if (Object.keys(formData?.educationDetails)?.length) {
      const temp = [...formData?.educationDetails];
      temp.forEach((ele) => {
        ele = removeKey(ele);
        ele.endDate = moment(ele?.endDate).format('MM/DD/YYYY');
        ele.startDate = moment(ele?.startDate).format('MM/DD/YYYY');
      });
      setEducations([...temp]);
    }
  }, [formData]);

  const handleDateChange = (e: string, name: string) => {
    if (name === 'startDate') {
      setDate({ startDate: e, endDate: '' });
      setValue('endDate', '');
    } else {
      setDate({ ...date, endDate: e });
    }
  };

  return (
    <div className={style.padding}>
      <form
        onSubmit={handleSubmit(handleAddEduction)}
        className={style.companyForm}
      >
        <div className={style.grid3}>
          <Input
            name="degree"
            label="Degree"
            type="text"
            star="*"
            inputRef={register}
            error={errors?.degree}
            errorMessage={errors?.degree?.message}
            placeholder="Degree"
          />
          <Input
            name="institute"
            label="Institute"
            star="*"
            type="text"
            inputRef={register}
            error={errors?.institute}
            errorMessage={errors?.institute?.message}
            placeholder="Institute"
          />
          <DatePicker
            label="Start Date"
            name="startDate"
            star="*"
            id="4"
            placeholder="Start Date"
            maxDate={new Date()}
            handleChange={handleDateChange}
            control={control}
            error={errors?.startDate}
          />
          <DatePicker
            label=" End Date "
            name="endDate"
            star="*"
            id="5"
            maxDate={new Date()}
            minDate={date.startDate}
            placeholder="End Date"
            control={control}
            error={errors?.endDate}
          />
          <Input
            name="percentageCgpa"
            label="Percentage/CGPA"
            type="number"
            inputRef={register}
            star="*"
            error={errors?.percentageCgpa}
            errorMessage={errors?.percentageCgpa?.message}
            placeholder="Percentage/CGPA"
            step="any"
          />
          <button className={style.add} type="submit">
            <img src={add} alt="" />
            <p>Add More</p>
          </button>
        </div>
        <div style={{ marginTop: '30px' }}>
          <NewTable
            columns={columns}
            rows={educations}
            minWidth="1035px"
            tableHeight={style.educationTableHeight}
            handleEducation={handleEducation}
            handleModalOpen={() => setOpenModal(true)}
            handleDeleteIndex={(index) =>
              setUpdateEdu({ ...updateEdu, editInd: index })
            }
          />
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
              type="button"
              btnClass={
                educations?.length ? style.buttonEducation : style.btnEducation
              }
              icon={arrowRight}
              handleClick={onSubmit}
              isLoading={isLoading}
              disabled={educations?.length ? false : true}
            />
          </div>
        </div>
      </form>
      <DeletePopup
        handleDelete={handleDelete}
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
};

export default EducationalDetails;

const schema = yup
  .object()
  .shape({
    degree: yup
      .string()
      .required()
      .matches(/^[a-zA-Z(). ]*$/, 'Only alphabets and special characters'),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    institute: yup.string().required(),
    percentageCgpa: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required('Must be a number')
      .min(1, 'minimum value is 1')
      .max(4, 'maximum value is 4'),
  })
  .required();
