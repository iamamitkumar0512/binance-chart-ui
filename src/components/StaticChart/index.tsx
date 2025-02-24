"use client";

import { useMarketContext } from "@/context-provider/market";
import { OHCVLData } from "@/types/ohcvl";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import react-apexcharts to disable SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CandlestickChart = ({ data }: { data: OHCVLData[] }) => {
  const { market, marketType, isLive } = useMarketContext();

  if (!market) return null; // Prevent rendering if market is not available

  const seriesData = data.map((item) => ({
    x: new Date(item.openTime),
    y: [
      parseFloat(item.openPrice),
      parseFloat(item.highPrice),
      parseFloat(item.lowPrice),
      parseFloat(item.closePrice),
      parseFloat(item.volume),
    ],
  }));

  const options: any = {
    chart: {
      type: "candlestick",
      height: 990,
      toolbar: {
        show: false,
      },
      background: "#ffffff",
      foreColor: "#333",
    },
    title: {
      text: `${marketType}${isLive ? "-Live" : ""} ${market}`,
      align: "left",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd MMM yyyy HH:mm",
        style: {
          colors: "#333",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00B746",
          downward: "#EF403C",
        },
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy HH:mm",
      },
    },
  };

  const series = [{ data: seriesData }];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        height={600}
        type="candlestick"
      />
    </div>
  );
};

export default CandlestickChart;
