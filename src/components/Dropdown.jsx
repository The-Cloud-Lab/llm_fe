import { useEffect, React, useState } from "react";
import Select from 'react-select';

export default function Dropdown({ dataSetValue,dropdowndata }) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  return (
    <>
    <div>

    </div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={"hello"}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={dropdowndata.map((item) => ({ value: item, label: item }))}
        onChange={dataSetValue}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: 'lightblue',
            primary: '#1976d2',
          },
        })}
        styles={{
          control: (provided) => ({
            ...provided,
            width: '500px', // Set the width to 50%
          }),
        }}
      />

      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      ></div>
    </>
  );
}
