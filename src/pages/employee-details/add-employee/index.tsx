import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import NavLinks from 'components/nav-links';
import PersonalInformation from './personal-information';
import AddressInformation from './address-information';
import CompanyInformation from './company-information';
import EducationalDetails from './educational-details';
import PayrollInformation from './payroll-information';
import EmployeeService from 'services/employee-service';
import { convertFrontendResponse } from './helper';

import style from './add-employee.module.scss';
import cross from 'assets/employee-page/Path 306.svg';
import CardContainer from 'components/card-container';

const AddEmployee = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [employeeId, setEmployeeId] = useState('');
  const [onlyActive, setOnlyActive] = useState<number | boolean>(0);
  const [formData, setFormData] = useState<any>({
    personalInformation: {},
    addressInformation: {},
    companyInformation: {},
    educationDetails: [],
    payrollDetail: {},
  });

  const params: any = useParams();

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  useEffect(() => {
    const getEmployeeData = async () => {
      const res = await EmployeeService.getEmployee(params?.id);
      if (res.status === 200) {
        const tempAddress = convertFrontendResponse({
          ...res?.data?.addressInformation,
        });
        setFormData({ ...res?.data, addressInformation: { ...tempAddress } });
        setOnlyActive(false);
        setEmployeeId(res.data?.personalInformation?.employeeId);
      }
    };
    if (params?.id) {
      getEmployeeData();
    }
  }, [params.id]);

  return (
    <>
      <CardContainer>
        <div className={style.navLinksMd}>
          <NavLinks
            active={activeStep}
            setActive={setActiveStep}
            links={steps}
            onlyActive={onlyActive}
          />
        </div>
        <div className={style.navLinksSm}>
          {activeStep === 0 && <h6>Personal Information</h6>}
          {activeStep === 1 && <h6>Address Information</h6>}
          {activeStep === 2 && <h6>Company Information</h6>}
          {activeStep === 3 && <h6>Educational Details</h6>}
          {(activeStep === 4 || activeStep === 5) && <h6>Payroll </h6>}
        </div>
        <Link to="/employee">
          <img
            src={cross}
            alt=""
            style={{ cursor: 'pointer' }}
            className={style.img}
          />
        </Link>
        <div className={style.paddingLinks}>
          {activeStep === 0 && (
            <PersonalInformation
              formData={formData}
              setFormData={setFormData}
              setOnlyActive={setOnlyActive}
              handleBack={handleBack}
              handleNext={handleNext}
              setEmployeeId={setEmployeeId}
              employeeId={employeeId}
            />
          )}

          {activeStep === 1 && (
            <AddressInformation
              formData={formData}
              handleBack={handleBack}
              handleNext={handleNext}
              setFormData={setFormData}
              employeeId={employeeId}
            />
          )}

          {activeStep === 2 && (
            <CompanyInformation
              formData={formData}
              handleBack={handleBack}
              handleNext={handleNext}
              setFormData={setFormData}
              employeeId={employeeId}
            />
          )}
          {activeStep === 3 && (
            <EducationalDetails
              formData={formData}
              handleBack={handleBack}
              handleNext={handleNext}
              setFormData={setFormData}
              employeeId={employeeId}
            />
          )}

          {(activeStep === 4 || activeStep === 5) && (
            <PayrollInformation
              formData={formData}
              handleBack={handleBack}
              setFormData={setFormData}
              employeeId={employeeId}
            />
          )}
        </div>
      </CardContainer>
    </>
  );
};

export default AddEmployee;

const steps = [
  { title: 'Personal Information', left: '25px' },
  { title: 'Address Details', left: '43px' },
  { title: 'Company Details', left: '40px' },
  { title: 'Educational Details', left: '33px' },
  { title: 'Payroll', left: '55px' },
];
