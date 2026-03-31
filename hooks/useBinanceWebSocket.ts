"use client";
import { useEffect, useRef, useState } from "react";

export type Trade = {
  price: number;
  amount: number;
  value: number;
  timestamp: number;
  type: "b" | "s";
};

type Props = {
  symbol: string; // e.g. btcusdt
};

export const useBinanceWebSocket = ({ symbol }: Props) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`
    );

    wsRef.current = ws;

    ws.onmessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data);

      const price = Number(msg.p);
      const amount = Number(msg.q);

      const newTrade: Trade = {
        price,
        amount,
        value: price * amount,
        timestamp: msg.T,
        type: msg.m ? "s" : "b", // seller => sell
      };

      setTrades((prev) => [newTrade, ...prev].slice(0, 10));
    };

    // ws.onerror = (err) => {
    //   console.error("WS Error:", err);
    // };

    ws.onclose = () => {
      console.log("WS Closed");
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return { trades };
};