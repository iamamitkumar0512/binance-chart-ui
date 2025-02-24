"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMarketContext } from "@/context-provider/market";
import { OHCVLData } from "@/types/ohcvl";

const useGetOHLCVData = () => {
  const [data, setData] = useState<OHCVLData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { market, isLive, interval, limit } = useMarketContext();

  useEffect(() => {
    if (!market) return;
    if (isLive) return;
    const apiUrl = `http://localhost:3000/api/binance/spot/marketOHLCVData?symbol=${market}&interval=${interval}&limit=${Number(
      limit
    )}`;

    const fetchMarketData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(apiUrl);
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, [interval, isLive, limit, market]); // Runs whenever pathname changes

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetOHLCVData;
