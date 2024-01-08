// import { any } from 'joi';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { useAppSelector } from 'store/hooks';
// // import style from './input.module.scss';
// import { options } from './../../pages/employee-details/single-employee/employee-data-helper';
import style from './tagInput.module.scss';

interface Props {
  tags: string[];
  options: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
  label?: string;
}

const TagInput = ({ tags, setTags, placeholder, options, label }: Props) => {
  const removeTagData = (indexToRemove: number) => {
    const newtags: string[] = [
      ...tags.filter((_: any, index: number) => index !== indexToRemove),
    ];
    setTags([...newtags]);
  };
  const addTagData = (event: any) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  useEffect(() => {
    tags && setTags(tags);
  }, [tags]);
  return (
    <>
      <div className={style.tagInput}>
        {/* {label && <label>{label}</label>} */}
        <ul className={style.tags}>
          {tags.map((tag: string, index: number) => (
            <li key={index} className={style.tag}>
              <span className={style.tagTitle}>{tag}</span>
              <span
                className={style.tagCloseIcon}
                onClick={() => removeTagData(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>

        <input
          list="brow"
          type="text"
          onKeyUp={(event: any) => {
            const value = event.target.value;
            return (
              value !== '' &&
              value !== ' ' &&
              (event.key === ' ' || event.key === 'Spacebar'
                ? addTagData(event)
                : null)
            );
          }}
          placeholder={placeholder ? placeholder : 'Press space to add a tag'}
        />
        <datalist id="brow">
          {options.map((option: string, index: number) => {
            return <option key={index} value={option} />;
          })}
        </datalist>
      </div>
    </>
  );
};
export default TagInput;
