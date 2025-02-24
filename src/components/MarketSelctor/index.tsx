"use client";
import React, { useState } from "react";
import useGetBinanceMarket from "@/hooks/useGetBinanceMarket";
import { useMarketContext } from "@/context-provider/market";

const MarketSelctor = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { market, setMarket } = useMarketContext();

  const { data, isLoading } = useGetBinanceMarket();

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
        {market ? market : "Select Market"}
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

      {/* Dropdown Menu */}
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
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {isLoading && (
            <li>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Loading ...
              </a>
            </li>
          )}
          {data?.marketSymbols?.length &&
            data.marketSymbols.map((marketName, i) => {
              return (
                <li
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setMarket(marketName);
                  }}
                  key={i}
                >
                  <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {marketName}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MarketSelctor;
