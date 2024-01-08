import React, { useState } from 'react';

import TableFilter from 'components/table-filter';
import Loading from 'components/loading';

import style from './table.module.scss';
import editIcon from 'assets/editIcon.svg';
import deleteIcon from 'assets/deleteIcon.svg';
import eye from 'assets/navbar-sidebar/eye.svg';
import pdf from 'assets/employee-page/print.svg';

import NoData from 'components/no-data-found-card';

interface Props {
  rows: any[];
  total?: any[];
  loading?: any;
  columns: {
    key: string;
    name: string;
    icon?: string;
    selectedIcon?: string;
    eyeIcon?: boolean;
    width?: string;
    alignText?: any;
    toLocalString?: any;
    currency?: boolean;
  }[];
  handleEducation?: (index: number) => void;
  handleDeleteIndex?: (id: number) => void;
  handleDelete?: (id: string) => void;
  handleEdit?: (id: string) => void;
  handleView?: (id: string) => void;
  onPrint?: (id: string) => void;

  handleModalOpen?: () => void;
  colWidth?: string;
  minWidth?: string;
  width?: string;
  tableHeight?: string;
  overFlow?: any;
  className?: string;
  apiCall?: any;
  filters?: any;
  setFilters?: any;
  sorts?: any;
  setSorts?: any;
}

const NewTable = ({
  columns,
  total,
  rows,
  minWidth,
  className,
  loading,
  handleView,
  handleEdit,
  handleDelete,
  onPrint,
  handleEducation,
  handleModalOpen,
  handleDeleteIndex,
  tableHeight,
  apiCall,
  filters,
  setFilters,
  sorts,
  setSorts,
}: Props) => {
  const [isFilter, setIsFilter] = useState<string | number>('');
  const [isFilterSelected, setIsFilterSelected] = useState<string | number>('');

  const toggleFilter = (index: number) => {
    isFilter === index ? setIsFilter('') : setIsFilter(index);
    setIsFilterSelected(index);
  };

  const clearFilter = () => {
    setIsFilter('');
    setIsFilterSelected('');
  };

  return (
    <>
      {rows?.length >= 1 && (
        <div
          className={`${style.tableWrapper} ${tableHeight}`}
          style={{
            textTransform: 'capitalize',
          }}
        >
          <div
            className={style.table}
            style={{ minWidth: minWidth || '1200px' }}
          >
            <div className={style.thead} style={{ display: 'flex' }}>
              {columns.map((column, index) => (
                <div
                  key={index}
                  className={style.heading}
                  style={{
                    minWidth: column?.width ? column?.width : '250px',
                    textAlign: column?.alignText,
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <p>
                    <span className={style.headingTitle}>{column.name}</span>
                    {column.icon && (
                      <img
                        src={
                          isFilterSelected === index
                            ? column.selectedIcon
                            : column.icon
                        }
                        className={style.sortIcon}
                        alt="sortIcon"
                        onClick={() => {
                          toggleFilter(index);
                        }}
                        style={{
                          position: 'relative',
                          top: '3px',
                          left: '5px',
                        }}
                      />
                    )}
                  </p>
                  {isFilter === index && (
                    <TableFilter
                      filterKey={column.key}
                      toggleFilter={() => {
                        toggleFilter(index);
                      }}
                      clearFilter={() => {
                        clearFilter();
                      }}
                      apiCall={apiCall}
                      filters={filters}
                      setFilters={setFilters}
                      sorts={sorts}
                      setSorts={setSorts}
                    />
                  )}
                </div>
              ))}
            </div>

            {loading ? (
              <div className={style.loaderContainer}>
                <Loading loaderClass={style.loader} />
              </div>
            ) : (
              <>
                {rows?.map((row, index) => (
                  <div
                    className={index % 2 !== 0 ? style.trOdd : style.tr}
                    style={{ display: 'flex', alignItems: 'center' }}
                    key={index}
                  >
                    {columns.map((column, colIndex) => (
                      <div
                        key={colIndex}
                        style={{
                          minWidth: column?.width ? column?.width : '250px',
                          textAlign: column?.alignText,
                          padding: '14px 10px',
                          width: '100%',
                        }}
                        className={`${
                          tdGreen.includes(row[column.key])
                            ? style.tdGreen
                            : tdRed.includes(row[column.key])
                            ? style.tdRed
                            : style.td
                        }  ${className}`}
                      >
                        {column.key !== 'actions' && column?.toLocalString
                          ? `${column?.toLocalString(row[column.key])}  ${
                              column?.toLocalString(row[column.key]) !== '-' &&
                              column?.currency
                                ? row.currency
                                : ''
                            }`
                          : column.key === 'employeeId'
                          ? row[column.key]?.toString()?.toLocaleUpperCase()
                          : row[column.key]
                          ? row[column.key]
                          : '-'}
                        {/* {row[column.key]} */}
                        {column.key === 'actions' &&
                          !column?.eyeIcon &&
                          (row?.isActive !== false ? (
                            <>
                              <img
                                className={style.pencilIcon}
                                onClick={() => {
                                  handleEdit && handleEdit(row.id);
                                  handleEducation && handleEducation(index);
                                }}
                                src={editIcon}
                                alt="editIcon"
                              />
                              <img
                                onClick={() => {
                                  handleDelete && handleDelete(row.id);
                                  handleDeleteIndex && handleDeleteIndex(index);
                                  handleModalOpen && handleModalOpen();
                                }}
                                className={style.trashIcon}
                                src={deleteIcon}
                                alt="deleteIcon"
                              />
                            </>
                          ) : (
                            '-'
                          ))}
                        {column.key === 'actions' && column?.eyeIcon && (
                          <>
                            <img
                              src={eye}
                              alt=""
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleView && handleView(row.id);
                              }}
                            />
                            <img
                              src={pdf}
                              alt=""
                              style={{
                                cursor: 'pointer',
                                marginLeft: '25px',
                                height: '20px',
                                width: '20px',
                              }}
                              onClick={() => {
                                onPrint && onPrint(row.id);
                              }}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total  */}
          {total?.map((total, index) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'sticky',
                bottom: '0px',
                minWidth: minWidth || '1200px',
                width: '100%',
              }}
              className={index % 2 !== 0 ? style.tr : style.trOdd}
              key={index}
            >
              {columns.map((column, colIndex) => (
                <p
                  key={colIndex}
                  style={{
                    minWidth: column?.width ? column?.width : '250px',
                    width: '100%',
                    textAlign: column?.alignText,
                    padding: '15px 10px',
                  }}
                  className={`${
                    tdGreen.includes(total[column.key])
                      ? style.tdGreen
                      : tdRed.includes(total[column.key])
                      ? style.tdRed
                      : style.td2
                  }  ${className}`}
                >
                  {total[column.key]
                    ? column?.toLocalString
                      ? column?.toLocalString(total[column.key])
                      : total[column.key]
                    : '-'}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {!rows && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '0 20px',
            }}
          >
            <NoData />
          </div>
        </div>
      )}
    </>
  );
};

export default NewTable;

const tdGreen = ['Active', 'Present', 'Accepted', 'Paid'];
const tdRed = ['Inactive', 'Absent', 'Rejected', 'Unpaid'];
