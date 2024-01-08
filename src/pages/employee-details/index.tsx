/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Card from 'components/card';
import Button from 'components/button';
import CardContainer from 'components/card-container';
import EmployeeFilter from './employee-filter';
import NavLinks from 'components/nav-links';
import Pagination from 'components/pagination';
import MobileButton from 'components/button/mobile-button';

import { useAppSelector } from 'store/hooks';
import { Employee } from 'interfaces/employee';
import EmployeeService from 'services/employee-service';
import Loading from 'components/loading';
import addSvg from 'assets/logo5.svg';
import style from './employee.module.scss';

import filter from 'assets/employee-page/filter.svg';
import girl from 'assets/employee-page/Mask Group 3.svg';
import plusIcon from 'assets/mobile-view/plusIcon.svg';

const EmployeeDetails = () => {
  const pageSize = 15;
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[] | []>([]);
  const { currentUser } = useAppSelector((state) => state?.app);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getEmployeesData = async () => {
    setLoading(true);
    const res = await EmployeeService.getAllEmployees({ pageSize, page });
    if (res?.status === 200) {
      setEmployees(res.data.employees);
      setCount(res?.data?.count);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (currentUser?.role) {
      if (currentUser?.role !== 'Employee') {
        getEmployeesData();
      } else {
        navigate(`/employee/${currentUser?.id}`);
      }
    }
    setLoading(false);
  }, [currentUser, navigate]);

  useEffect(() => {
    getEmployeesData();
  }, [page]);

  return (
    <>
      {loading && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      <CardContainer>
        <NavLinks
          navLinkClass={style.navLink}
          links={[{ title: 'Employees', left: '55px' }]}
        />
        {!open && (
          <div className={style.flex}>
            <img src={filter} alt="" onClick={() => setOpen(true)} />
          </div>
        )}
        <EmployeeFilter
          setOpen={setOpen}
          setEmployees={setEmployees}
          open={open}
          setCount={setCount}
          getData={getEmployeesData}
        />

        <div
          className={style.main}
          style={{
            marginTop: open ? '0' : '-70px',
          }}
        >
          <div className={style.grid}>
            {employees.map(
              (
                {
                  employeeId,
                  name,
                  img,
                  designation,
                  email,
                  phone,
                  id,
                  department,
                }: Employee,
                index,
              ) => (
                <Card className={style.employee_card} key={index}>
                  <div className={style.inner}>
                    <div className={style.img}>
                      <img src={img || girl} alt="" />
                    </div>
                    <h4>{name}</h4>
                    <h5>{employeeId}</h5>
                  </div>

                  <Link to={`/employee/${id}`}>
                    <div className={style.employeeOverlay}>
                      <div className={style.overlayImg}>
                        <div className={style.img3}>
                          <img src={img || girl} alt="" />
                        </div>
                        <p
                          style={{
                            fontSize: '10px',
                            color: 'white',
                            textTransform: 'uppercase',
                            marginBottom: '0px',
                          }}
                        >
                          {employeeId}
                        </p>
                      </div>
                      <div className={style.overlayDiv}>
                        <div>
                          <h1 className={style.title}>{name}</h1>
                          <p className={style.subtitle}>{designation}</p>
                        </div>
                        <div>
                          <div className={style.flexDepart}>
                            <p className={style.depart}>Department: </p>
                            <p className={style.span}>{department}</p>
                          </div>

                          <div className={style.flexDepart}>
                            <p className={style.depart}> Email:</p>
                            <p className={style.span}>{email}</p>
                          </div>

                          <div className={style.flexDepart}>
                            <p className={style.depart}> Phone:</p>{' '}
                            <p className={style.span}>{phone}</p>
                          </div>
                        </div>
                        <div className={style.btnDiv}>
                          <Link to={`/employee/${id}`} className={style.link}>
                            <button
                              className={style.btnDiv}
                              style={{ color: '#57B993', cursor: 'pointer' }}
                            >
                              More Details
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  display: 'inline-block',
                                  marginTop: '4px',
                                }}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ),
            )}
          </div>
          <Pagination
            setPage={setPage}
            count={count}
            pageSize={pageSize}
            page={page}
          />
        </div>
        <div className={style.addBtnDiv}>
          <div className={style.addBtnChildDiv}>
            <Link to="/employee/add" className={style.link}>
              <Button text={'Add Employee'} icon={addSvg} isLoading={false} />
            </Link>
          </div>
        </div>

        {/* <div>
          <Link to="/employee/add" className={style.link}>
            <MobileButton isLoading={false} mobileIcon={plusIcon} />
          </Link>
        </div> */}
        <div className={style.mobileAddTaxBtnDiv}>
          <Link to="/employee/add" className={style.link}>
            <MobileButton mobileIcon={plusIcon} isLoading={false} />
          </Link>
        </div>
      </CardContainer>
    </>
  );
};

export default EmployeeDetails;
