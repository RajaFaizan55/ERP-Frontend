import React, { useState } from 'react';

import TableFilter from 'components/table-filter';
import Loading from 'components/loading';

import style from './table.module.scss';
import editIcon from 'assets/editIcon.svg';
import deleteIcon from 'assets/deleteIcon.svg';
import eye from 'assets/navbar-sidebar/eye.svg';
import NoData from 'components/no-data-found-card';

interface Props {
  rows: any[];
  total?: any[];
  loading?: any;
  columns: {
    key: string;
    name: string;
    icon?: string;
    eyeIcon?: boolean;
    width?: string;
    alignText?: any;
    toLocalString?: any;
  }[];
  handleEducation?: (index: number) => void;
  handleDeleteIndex?: (id: number) => void;
  handleDelete?: (id: string) => void;
  handleEdit?: (id: string) => void;
  handleView?: (id: string) => void;
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

const Table = ({
  columns,
  total,
  rows,
  width,
  colWidth = '240px',
  minWidth,
  className,
  loading,
  handleView,
  handleEdit,
  handleDelete,
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
  const toggleFilter = (index: number) => {
    isFilter === index ? setIsFilter('') : setIsFilter(index);
  };

  const clearFilter = (index: number) => {
    console.log('clear');
  };

  return (
    <>
      {rows?.length >= 1 && (
        <div className={`${style.tableWrapper} ${tableHeight}`}>
          <table
            className={style.table}
            aria-label="customized table"
            style={{ width: width || '100%', minWidth: minWidth || '900px' }}
          >
            <thead className={style.thead}>
              <tr
                className={style.headings}
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                }}
              >
                {columns.map((column, index) => (
                  <td
                    className={style.heading}
                    style={{
                      width: column?.width ? column?.width : '250px',
                      textAlign: column?.alignText,
                    }}
                    key={index}
                  >
                    <span
                      className={style.headingTitle}
                      style={{ width: '100%', display: 'block' }}
                    >
                      {column.name}
                    </span>
                    {column.icon && (
                      <img
                        src={column.icon}
                        className={style.sortIcon}
                        alt="sortIcon"
                        onClick={() => {
                          toggleFilter(index);
                        }}
                      />
                    )}
                    {isFilter === index && (
                      <TableFilter
                        filterKey={column.key}
                        toggleFilter={() => {
                          toggleFilter(index);
                        }}
                        clearFilter={() => {
                          clearFilter(index);
                        }}
                        apiCall={apiCall}
                        filters={filters}
                        setFilters={setFilters}
                        sorts={sorts}
                        setSorts={setSorts}
                      />
                    )}
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <div className={style.loaderContainer}>
                  <Loading loaderClass={style.loader} />
                </div>
              ) : (
                <>
                  {rows?.map((row, index) => (
                    <tr
                      className={index % 2 !== 0 ? style.trOdd : style.tr}
                      style={{
                        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                      }}
                      key={index}
                    >
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          style={{
                            width: column?.width ? column?.width : '250px',
                            textAlign: column?.alignText,
                          }}
                          className={`${
                            tdGreen.includes(row[column.key])
                              ? style.tdGreen
                              : tdRed.includes(row[column.key])
                              ? style.tdRed
                              : style.td
                          }  ${className}`}
                        >
                          {column?.toLocalString
                            ? column?.toLocalString(row[column.key])
                            : row[column.key]}
                          {/* {row[column.key]} */}
                          {column.key === 'actions' && !column?.eyeIcon && (
                            <>
                              {row.isActive !== false && (
                                <img
                                  className={style.pencilIcon}
                                  onClick={() => {
                                    handleEdit && handleEdit(row.id);
                                    handleEducation && handleEducation(index);
                                  }}
                                  src={editIcon}
                                  alt="editIcon"
                                />
                              )}
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
                          )}
                          {column.key === 'actions' && column?.eyeIcon && (
                            <img
                              src={eye}
                              alt=""
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleView && handleView(row.id);
                              }}
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* total  */}
                  {total?.map((total, index) => (
                    <tr
                      className={index % 2 !== 0 ? style.tr : style.trOdd}
                      style={{
                        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                        position: 'sticky',
                        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
                        bottom: 0,
                      }}
                      key={index}
                    >
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          style={{ width: colWidth }}
                          className={`${
                            tdGreen.includes(total[column.key])
                              ? style.tdGreen
                              : tdRed.includes(total[column.key])
                              ? style.tdRed
                              : style.td2
                          }  ${className}`}
                        >
                          {total[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}

      {rows?.length < 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
          }}
        >
          <NoData />
        </div>
      )}
    </>
  );
};

export default Table;

const tdGreen = ['Active', 'Present', 'Accepted', 'Paid'];
const tdRed = ['Inactive', 'Absent', 'Rejected', 'Unpaid'];
