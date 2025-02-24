"use client";
import MarketSelctor from "@/components/MarketSelctor";
import Selector from "@/components/Selector";
import CandlestickChart from "@/components/StaticChart";
import { intervalOptions, limitOptions } from "@/constants";
import { useMarketContext } from "@/context-provider/market";
import useGetOHLCVData from "@/hooks/useGetOHLCVData";
import { transformKlineData } from "@/service/transformKLineData";
import WSService from "@/service/ws";
import { useCallback, useEffect, useState } from "react";
interface KlineData {
  openTime: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  closePrice: string;
  volume: string;
}

export default function Home() {
  const { market, isLive, wsService, limit, setLimit, interval, setInterval } =
    useMarketContext();
  const { data: staticData } = useGetOHLCVData();
  const [data, setData] = useState<KlineData[]>([]);

  useEffect(() => {
    if (!isLive) return;
    wsService.setOnDataReceivedCallback((newData) => {
      if (newData?.e) {
        const refactoredData = transformKlineData(newData);
        setData((prev) => [...prev, refactoredData]);
      }
    });
  }, [isLive, wsService]);

  useEffect(() => {
    setData([]);
  }, [market, interval]);

  const handleSelectSpotLive = useCallback(() => {
    if (!market) return;
    const wsService = WSService.getInstance();
    wsService.subscribeToStream({ market, interval });
  }, [interval, market]);

  useEffect(() => {
    if (isLive && market) {
      handleSelectSpotLive();
    }
  }, [handleSelectSpotLive, isLive, market]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <MarketSelctor />
        <Selector
          btnText={"Select Interval"}
          selectorOptions={intervalOptions}
          selectedValue={interval}
          setSelectorValue={setInterval}
        />
        {!isLive && (
          <Selector
            btnText={"Select Limit"}
            selectorOptions={limitOptions}
            selectedValue={limit}
            setSelectorValue={setLimit}
          />
        )}
      </div>
      {data && (
        <div className="flex-grow p-6">
          <CandlestickChart data={isLive ? data : staticData ?? []} />
        </div>
      )}
    </div>
  );
}
