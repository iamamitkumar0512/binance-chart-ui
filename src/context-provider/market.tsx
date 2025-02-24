"use client";
import WSService from "@/service/ws";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";

// Create a context with a default value
const MarketContext = createContext<{
  market: string | null;
  setMarket: Dispatch<SetStateAction<string | null>>;
  marketType: "SPOT" | "FUTURE";
  setMarketType: Dispatch<SetStateAction<"SPOT" | "FUTURE">>;
  isLive: boolean;
  setIsLive: Dispatch<SetStateAction<boolean>>;
  wsService: WSService;
  interval: string;
  limit: string;
  setInterval: Dispatch<SetStateAction<string>>;
  setLimit: Dispatch<SetStateAction<string>>;
}>({
  market: null,
  setMarket: () => {},
  marketType: "SPOT",
  setMarketType: () => {},
  isLive: false,
  setIsLive: () => {},
  wsService: WSService.getInstance(),
  interval: "5m",
  limit: "100",
  setInterval: () => {},
  setLimit: () => {},
});

interface MarketProviderProps {
  children: ReactNode;
}

export const MarketProvider: React.FC<MarketProviderProps> = ({ children }) => {
  const [market, setMarket] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [marketType, setMarketType] = useState<"SPOT" | "FUTURE">("SPOT");
  const [limit, setLimit] = useState("100");
  const [interval, setInterval] = useState("5m");

  useEffect(() => {
    const wsService = WSService.getInstance();
    wsService.initializeWs();
  }, []);

  const wsService = useMemo(() => WSService.getInstance(), []);

  return (
    <MarketContext.Provider
      value={{
        market,
        setMarket,
        isLive,
        setIsLive,
        marketType,
        setMarketType,
        wsService,
        limit,
        setInterval,
        interval,
        setLimit,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketContext = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error("useMarketConext must be used within a MarketProvider");
  }
  return context;
};
