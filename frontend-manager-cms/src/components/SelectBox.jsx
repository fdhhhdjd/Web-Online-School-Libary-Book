import Select from 'react-select';

const SelectBox = (props) => {
  console.log(props.optionData);
  return (
    <>
      {props.isMulti ? (
        <Select
          onChange={(e) => props.setData(Array.isArray(e) ? e.map((x) => x.value) : [])}
          className="basic-single"
          classNamePrefix="select"
          isMulti
          isClearable={true}
          isSearchable={true}
          name={props.name}
          options={props?.optionData}
          // value={props.isReset ? '' : props.data}
          defaultValue={props.defaultValue}
          isDisabled={props.isDisabled}
        />
      ) : (
        <Select
          onChange={(data) => props.setData(data.value)}
          className="basic-single"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          name={props.name}
          options={props.optionData}
          // value={props.isReset ? '' : props.data}
          defaultValue={props?.defaultValue}
          isDisabled={props.isDisabled}
        />
      )}
    </>
  );
};

export default SelectBox;
