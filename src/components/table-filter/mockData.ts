import squareIcon from 'assets/settings-page/square.png';
import filterIcon from 'assets/settings-page/filter-line.png';
import sortAZIcon from 'assets/settings-page/down.svg';

export const sortData = [
  {
    icon: squareIcon,
    title: 'Sort A to Z',
    sortIcon: sortAZIcon,
  },
  {
    icon: squareIcon,
    title: 'Sort Z to A',
    sortIcon: sortAZIcon,
  },
  {
    icon: squareIcon,
    title: 'Date Filter',
    sortIcon: filterIcon,
  },
];

export const selectFilter = [
  {
    key: 'hackerDictionary5',
    label: 'Hacker Dictionary5',
  },
  {
    key: 'hackerDictionary5',
    label: 'Hacker Dictionary5',
  },
  {
    key: 'hackerDictionary5',
    label: 'Hacker Dictionary5',
  },
  {
    key: 'hackerDictionary5',
    label: 'Hacker Dictionary5',
  },
  {
    key: 'hackerDictionary5',
    label: 'Hacker Dictionary5',
  },
  {
    key: 'hackerDictionary4',
    label: 'Hacker Dictionary4',
  },
  {
    key: 'hackerDictionary3',
    label: 'Hacker Dictionary3',
  },
  {
    key: 'hackerDictionary2',
    label: 'Hacker Dictionary2',
  },
  {
    key: 'hackerDictionary1',
    label: 'Hacker Dictionary1',
  },
];

export const selectAllCheckboxToggle = (booleanVal: boolean, obj: any) => {
  let tempObj = { ...obj };
  for (let key in tempObj) {
    tempObj[key] = booleanVal;
  }

  return tempObj;
};
export const checkAllCheckboxBoolean = (obj: any) => {
  let tempObj = JSON.parse(JSON.stringify({ ...obj }));
  let tempBoolean = false;
  for (let key in tempObj) {
    if (tempObj[key] === false) {
      tempBoolean = false;
      return false;
    } else {
      tempBoolean = true;
    }
  }

  return tempBoolean;
};
