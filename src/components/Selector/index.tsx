import React, { useState } from "react";

const Selector = ({
  btnText,
  selectorOptions,
  selectedValue,
  setSelectorValue,
}: {
  btnText: string;
  selectorOptions: string[];
  selectedValue: string;
  setSelectorValue: any;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="p-4 flex flex-col items-start">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  inline-flex items-center w-44 dark:bg-blue-600 dark:hover:bg-blue-700 
                  dark:focus:ring-blue-800"
        type="button"
      >
        {selectedValue ? selectedValue : btnText}
        <svg
          className="w-2.5 h-2.5 ml-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 
        dark:bg-gray-700 mt-2 max-h-[calc(100vh-150px)] overflow-y-auto`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <ul>
          {selectorOptions?.length &&
            selectorOptions.map((item, i) => {
              return (
                <li
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setSelectorValue(item);
                  }}
                  key={i}
                >
                  <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {item}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Selector;
