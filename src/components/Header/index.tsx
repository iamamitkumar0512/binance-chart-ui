"use client";
import { useMarketContext } from "@/context-provider/market";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  const { setIsLive, setMarketType, marketType, setMarket, market, isLive } =
    useMarketContext();

  useEffect(() => {
    if (market) {
      setMarket(null);
    }
  }, [marketType, isLive]);

  const isActive = (type: string, live: boolean) =>
    marketType === type && isLive === live;

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              src="https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg"
              width={20}
              height={20}
              className="mr-3 h-6 sm:h-9"
              alt="bnb Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Binance
            </span>
          </Link>

          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li
                onClick={() => {
                  setMarketType("SPOT");
                  setIsLive(true);
                }}
              >
                <span
                  className={`block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 ${
                    isActive("SPOT", true)
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-400"
                  } hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700
                  dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  Spot-Live
                </span>
              </li>
              <li
                onClick={() => {
                  setMarketType("SPOT");
                  setIsLive(false);
                }}
              >
                <span
                  className={`block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 ${
                    isActive("SPOT", false)
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-400"
                  } hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700
                  dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  Spot
                </span>
              </li>
              <li
                onClick={() => {
                  setMarketType("FUTURE");
                  setIsLive(true);
                }}
              >
                <span
                  className={`block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 ${
                    isActive("FUTURE", true)
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-400"
                  } hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700
                  dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  Future-Live
                </span>
              </li>
              <li
                onClick={() => {
                  setMarketType("FUTURE");
                  setIsLive(false);
                }}
              >
                <span
                  className={`block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 ${
                    isActive("FUTURE", false)
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-400"
                  } hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700
                  dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  Future
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
