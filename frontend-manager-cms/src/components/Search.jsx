import { useRef, useState } from 'react';
import HELPERS from 'utils/helper';

const Search = ({ filterOption, setData, initData, dataFilter, data }) => {
  const [option, setOption] = useState(filterOption[0]);
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);

  const handleChooseLabel = (label) => {
    setOption(label);
    setOpen(false);
    searchRef.current.value = '';
    setData(dataFilter || data);
  };

  const handleSearch = () => {
    const result = (dataFilter || data).filter((item) =>
      HELPERS.handleSearchText(item[option.value], searchRef.current.value),
    );
    setData(result);
  };

  return (
    <form>
      <div className="flex w-96">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200"
          type="button"
          onClick={() => setOpen(!open)}
        >
          {option.label}
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 outline-0"
            placeholder="Tìm kiếm..."
            ref={searchRef}
            onChange={(e) => handleSearch(e)}
            onFocus={() => setOpen(false)}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        id="dropdown"
        className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${!open ? 'hidden' : ''}`}
      >
        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
          {filterOption &&
            filterOption?.map((item, idx) => (
              <li key={idx}>
                <div className="block px-4 py-2 hover:bg-gray-100" onClick={() => handleChooseLabel(item)}>
                  {item.label}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </form>
  );
};

export default Search;
