/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

import { columns } from './records-helper';
import ViewRecords from './view-records';
import ApplicationService from 'services/application-service';
import Pagination from 'components/pagination';
import NewTable from 'components/table/new-table';
import Loading from 'components/loading';

import style from './records.module.scss';
import PrintPdf from './print-folder';

const MyRecords = () => {
  const [open, setOpen] = useState(false);
  const [applicationData, setApplicationData] = useState<string[] | []>([]);
  const [currentApplicationId, setCurrentApplicationId] = useState('');
  const [columnsArr] = useState<any>([]);
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);
  const [print, setPrint] = useState(false);
  const [applicationDataById, setApplicationDataById] =
    useState<Application>(applicationInitial);

  const componentRef: any = useRef();

  const getApplication = async (id: string) => {
    const res = await ApplicationService.getApplicationById(id);
    if (res.status === 200) {
      // getAllApplications();

      let temp = res?.data?.application;
      temp &&
        (temp.applicationDate = moment(temp?.applicationDate).format(
          'MM/DD/YYYY',
        ));
      setPrint(true);
      setApplicationDataById(temp);
      onPrint();
    }
  };

  const getAllApplications = async () => {
    setLoading(true);
    const res = await ApplicationService.getAllApplications({
      page,
      pageSize,
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(sorts && { sorts: JSON.stringify(sorts) }),
    });
    if (res.status === 200) {
      if (res.data.data?.length) {
        const temp = [...res.data.data];
        // const temp = res?.data?.data;
        temp.forEach((data: any) => {
          data.applicationDate = moment(data.applicationDate).format(
            'MM/DD/YYYY',
          );
          data.id = data._id;
          delete data._id;
        });
        setApplicationData(temp);
        setCount(res?.data?.count);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllApplications();
  }, [page, pageSize, filters, sorts]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const onPrint = () => {
    setTimeout(() => {
      handlePrint();
    }, 100);
    setTimeout(() => {
      setPrint(false);
    }, 1000);
  };

  return (
    <>
      <div style={{ padding: '0 10px' }}>
        {loading && (
          <div className={style.loaderDiv}>
            <Loading loaderClass={style.loadingStyle} />
          </div>
        )}
        <NewTable
          columns={columnsArr?.length ? columnsArr : columns}
          rows={applicationData}
          tableHeight={style.recordTableHeight}
          handleView={(id: string) => {
            setOpen(true);
            setCurrentApplicationId(id);
          }}
          onPrint={async (id: string) => {
            await getApplication(id);
          }}
          // handleModalOpen={() => setDeleteModalOpen(true)}
          apiCall={ApplicationService.getAllApplications}
          filters={filters}
          setFilters={setFilters}
          sorts={sorts}
          setSorts={setSorts}
          minWidth="975px"
        />
        <Pagination
          setPage={setPage}
          count={count}
          pageSize={pageSize}
          page={page}
        />
        <ViewRecords
          open={open}
          setOpen={setOpen}
          currentApplicationId={currentApplicationId}
          getAllApplications={getAllApplications}
        />
      </div>

      <div ref={componentRef}>
        {print && <PrintPdf applicationDataById={applicationDataById} />}
      </div>
    </>
  );
};

export default MyRecords;

interface Application {
  _id: string;
  applicationDate: string;
  employeeId: string;
  name: string;
  reason: string;
  status: string;
  type: string;
}

const applicationInitial = {
  _id: '',
  applicationDate: '',
  employeeId: '',
  name: '',
  reason: '',
  status: '',
  type: '',
};
