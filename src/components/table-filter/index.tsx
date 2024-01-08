/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 } from 'uuid';

import Input from 'components/input';
import Checkbox from 'components/checkbox';
import Button from 'components/button';

import {
  checkAllCheckboxBoolean,
  selectAllCheckboxToggle,
  sortData,
} from './mockData';

import style from './table-filter.module.scss';

import searchIcon from '../../assets/settings-page/search.png';
import Loading from 'components/loading';
import {
  getFiltersData,
  getFiltersDataBySort,
  handleCheckboxChange,
  handleFilters,
  handlePage,
  handleSelectAll,
  handleSort,
} from './helper';

interface Props {
  toggleFilter: () => void;
  clearFilter: () => void;
  setFilters: any;
  apiCall: any;
  filterKey: string;
  filters: any;
  sorts?: any;
  setSorts?: any;
}

const TableFilter = ({
  toggleFilter,
  clearFilter,
  filters,
  setFilters,
  apiCall,
  filterKey,
  sorts,
  setSorts,
}: Props) => {
  const [selectFilters, setSelectFilters] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [filterCheckboxName, setFilterCheckboxName] = useState<any>({});
  const [filtersData, setFiltersData] = useState<any>([]);
  const [tempFiltersData, setTempFiltersData] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleGetFilters = async () => {
    setLoading(true);
    await getFiltersData({
      apiCall,
      pageSize,
      page,
      filterKey,
      search,
      selectFilters,
      sorts,
      setFilterCheckboxName,
      tempFiltersData,
      setTempFiltersData,
      filterCheckboxName,
      setFiltersData,
      setCount,
      setHasMore,
    });
    setLoading(false);
  };

  useEffect(() => {
    handleGetFilters();
  }, [page]);

  useEffect(() => {
    setPage(0);
    if (search)
      getFiltersDataBySort({
        apiCall,
        pageSize,
        page,
        filterKey,
        filters,
        search,
        setFiltersData,
        setCount,
        setHasMore,
      });
  }, [search]);

  useEffect(() => {
    const selectAllCheck = checkAllCheckboxBoolean(filterCheckboxName);
    if (selectAllCheck === true) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [filterCheckboxName]);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          zIndex: 20000,
          position: 'fixed',
        }}
        onClick={() => clearFilter()}
      ></div>
      <div className={style.filterContainer}>
        {sortData?.map(({ icon, sortIcon, title }, index) => (
          <div
            className={style.sort}
            key={v4()}
            onClick={() =>
              handleSort({
                title,
                setSorts,
                toggleFilter,
                filterKey,
              })
            }
          >
            <div className={style.sortTitle}>
              <img className={style.squareImg} src={icon} alt="squareIcon" />
              <span>{title}</span>
            </div>
            <img
              src={sortIcon}
              alt="sortIcon"
              style={{ transform: index === 1 ? 'rotate(-180deg)' : '' }}
            />
          </div>
        ))}
        <div className={style.searchSelectContainer}>
          <Input
            name={'search'}
            placeholder={'Search'}
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            icon={searchIcon}
            iconClass={style.searchIcon}
            inputClass={style.searchInput}
            containerClass={style.inputContainerClass}
          />
          <div className={style.filterSelect}>
            <div className={style.selectAllContainer}>
              <Checkbox
                label={'Select All'}
                labelClass={style.label}
                checkboxClass={style.checkbox}
                checked={selectAll}
                handleChange={(e: any) => {
                  handleSelectAll({
                    e,
                    setSelectAll,
                    setSelectFilters,
                    filtersData,
                    setFilterCheckboxName,
                    selectAllCheckboxToggle,
                    filterCheckboxName,
                  });
                }}
              />
            </div>

            <div
              id="scrollableDiv"
              style={{
                height: 90,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={20}
                next={() => {
                  handlePage({
                    setPage,
                    filtersData,
                    setHasMore,
                    page,
                    count,
                  });
                }}
                style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
                inverse={false} //
                hasMore={hasMore}
                // endMessage={"That's all"}
                loader={
                  !loading ? (
                    <></>
                  ) : (
                    <div className={style.textCenter}>
                      <Loading loaderClass={style.loaderClass} />
                    </div>
                  )
                }
                scrollableTarget="scrollableDiv"
              >
                {filtersData?.map((val: any) => (
                  <React.Fragment key={v4()}>
                    {val && (
                      <div className={style.checkBoxContainer}>
                        <Checkbox
                          label={val}
                          name={val}
                          labelClass={style.label}
                          checkboxClass={style.checkbox}
                          checked={filterCheckboxName[val]}
                          handleChange={(e: any) =>
                            handleCheckboxChange({
                              e,
                              selectFilters,
                              setSelectFilters,
                              filterCheckboxName,
                              setFilterCheckboxName,
                            })
                          }
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </InfiniteScroll>
            </div>
          </div>
          <div className={style.buttonsContainer}>
            <Button
              btnClass={style.firstBtn}
              className={style.btnText}
              text={'Ok'}
              handleClick={() => {
                handleFilters({
                  filters,
                  filterKey,
                  setFilters,
                  selectFilters,
                  toggleFilter,
                });
              }}
            />
            <Button
              text={'Cancel'}
              btnClass={style.firstBtn}
              className={style.btnText}
              handleClick={() => clearFilter()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TableFilter);
