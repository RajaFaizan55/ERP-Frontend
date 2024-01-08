import { Dispatch, SetStateAction } from 'react';

const getUniqueFilters = ({ data }: any) => {
  const ids: any = [];
  const uniqueData: any = [];

  data?.forEach(() => {
    const currentFilter = data?.find((x: any) => !ids.includes(x?.id));
    if (currentFilter !== undefined) {
      ids.push(currentFilter?.id);
      uniqueData.push(currentFilter);
    }
  });
  return uniqueData;
};

export const handleSort = ({
  title,
  setSorts,
  toggleFilter,
  filterKey,
}: HandleSort) => {
  setSorts([
    {
      columnName: filterKey,
      selected: title === 'Ascending' ? 'ASC' : 'DESC',
    },
  ]);
  toggleFilter();
};

export const getFiltersData = async ({
  apiCall,
  pageSize,
  page,
  filterKey,
  search,
  selectFilters,
  sorts,
  setFilterCheckboxName,
  filterCheckboxName,
  setFiltersData,
  setCount,
  setHasMore,
  tempFiltersData,
  setTempFiltersData,
}: GetFiltersData) => {
  const res = await apiCall({
    pageSize,
    page,
    search: JSON.stringify([{ columnName: filterKey, selected: search }]),
    filters: JSON.stringify([
      { columnName: filterKey, selected: selectFilters },
    ]),
    sorts: JSON.stringify(
      sorts?.length ? sorts : [{ columnName: filterKey, selected: 'ASC' }],
    ),
    properties: [filterKey],
  });

  if (res.status === 200) {
    if (res.data.data?.length) {
      let temp: any = [];
      let obj: any = {};

      const uniqueData = getUniqueFilters({
        data: [...tempFiltersData, ...res.data.data],
      });
      uniqueData?.forEach((ele: any) => {
        if (ele?.id) {
          temp.push(ele?.id);
          obj = { ...obj, [ele?.id]: false };
        }
      });

      setFilterCheckboxName({ ...filterCheckboxName, ...obj });
      setFiltersData([...temp]);
      setCount(res?.data?.count);
      setTempFiltersData(res?.data?.data);
      if (res?.data?.count <= (page + 1) * pageSize) {
        setHasMore(false);
      }
    }
  }
};

export const getFiltersDataBySort = async ({
  apiCall,
  pageSize,
  page,
  filterKey,
  filters,
  search,
  setFiltersData,
  setCount,
  setHasMore,
}: GetFiltersDataBySort) => {
  const res = await apiCall({
    pageSize,
    page,
    search: JSON.stringify([{ columnName: filterKey, selected: search }]),
    filters: JSON.stringify(filters),
    properties: [filterKey],
  });
  if (res.status === 200) {
    if (res.data.data?.length) {
      let temp: any = [];
      res.data.data.forEach((ele: any) => {
        if (ele.id) {
          temp.push(ele.id);
        }
      });
      setFiltersData([...temp]);
      setCount(res?.data?.count);

      if (res.data.data.length < pageSize) {
        setHasMore(false);
      }
    }
  }
};

export const handlePage = ({
  setPage,
  filtersData,
  setHasMore,
  page,
  count,
}: any) => {
  setPage(page + 1);
  if (count === filtersData.length) {
    setHasMore(false);
  }
};

export const handleFilters = ({
  filters,
  filterKey,
  setFilters,
  selectFilters,
  toggleFilter,
}: any) => {
  const findKey = filters?.length
    ? filters.findIndex((ele: any) => ele.columnName === filterKey)
    : -1;

  if (findKey === -1) {
    setFilters([
      ...filters,
      { columnName: filterKey, selected: selectFilters },
    ]);
  } else {
    setFilters([
      ...filters.slice(0, findKey),
      { columnName: filterKey, selected: selectFilters },
      ...filters.slice(findKey + 1),
    ]);
  }

  toggleFilter();
};

export const handleSelectAll = ({
  e,
  setSelectAll,
  setSelectFilters,
  filtersData,
  setFilterCheckboxName,
  selectAllCheckboxToggle,
  filterCheckboxName,
}: any) => {
  if (e.target.checked) {
    setSelectAll(true);
    setSelectFilters([...filtersData]);

    setFilterCheckboxName({
      ...selectAllCheckboxToggle(true, filterCheckboxName),
    });
  } else {
    setSelectFilters([]);
    setSelectAll(false);
    setFilterCheckboxName({
      ...selectAllCheckboxToggle(false, filterCheckboxName),
    });
  }
};
export const handleCheckboxChange = ({
  e,
  selectFilters,
  setSelectFilters,
  filterCheckboxName,
  setFilterCheckboxName,
}: any) => {
  if (e.target.checked === true) {
    setSelectFilters([...selectFilters, e.target.name]);
    setFilterCheckboxName({
      ...filterCheckboxName,
      [e.target.name]: e.target.checked,
    });
  } else {
    const temp = [...selectFilters];
    let index = temp.findIndex((ele) => ele === e.target.name);
    temp.splice(index, 1);
    setSelectFilters([...temp]);
    setFilterCheckboxName({
      ...filterCheckboxName,
      [e.target.name]: e.target.checked,
    });
  }
};

interface HandleSort {
  title: string;
  setSorts: Dispatch<
    SetStateAction<
      {
        columnName: string;
        selected: string;
      }[]
    >
  >;
  toggleFilter: () => void;
  filterKey: string;
}
interface GetFiltersData {
  apiCall: any;
  page: number;
  sorts: string;
  search: string;
  pageSize: number;
  filterKey: string;
  selectFilters: string;
  filterCheckboxName: any;
  setCount: Dispatch<SetStateAction<number>>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  setFiltersData: Dispatch<SetStateAction<number[]>>;
  setFilterCheckboxName: Dispatch<SetStateAction<any[]>>;
  tempFiltersData: number[];
  setTempFiltersData: Dispatch<SetStateAction<number[]>>;
}
interface GetFiltersDataBySort {
  apiCall: any;
  page: number;
  search: string;
  pageSize: number;
  filterKey: string;
  filters: string[];
  setCount: Dispatch<SetStateAction<number>>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  setFiltersData: Dispatch<SetStateAction<number[]>>;
}
