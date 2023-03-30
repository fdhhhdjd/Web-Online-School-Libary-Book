import Select from 'react-select';

const SelectBox = (props) => {
  return (
    <>
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
      />
    </>
  );
};

export default SelectBox;
