"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useMarketContext } from "@/context-provider/market";

const useGetBinanceMarket = () => {
  const [data, setData] = useState<{
    marketSymbols: string[];
    total: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { marketType } = useMarketContext();
  const typeOfMarket = marketType === "SPOT" ? "spot" : "future";

  useEffect(() => {
    const apiUrl = `http://localhost:3000/api/binance/${typeOfMarket}/marketsSymbol`;

    const fetchMarketData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, [typeOfMarket]); // Runs whenever pathname changes

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetBinanceMarket;
