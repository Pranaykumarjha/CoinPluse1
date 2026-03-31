"use client";

import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

type Coin = {
  symbol: string;
  price: number;
  change: number;
};

const TopMovers = () => {
  const [gainers, setGainers] = useState<Coin[]>([]);
  const [losers, setLosers] = useState<Coin[]>([]);
  const [activeTab, setActiveTab] = useState<"gainers" | "losers">("gainers");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.binance.com/api/v3/ticker/24hr"
        );
        const data = await res.json();

        const usdtPairs = data.filter((coin: any) =>
          coin.symbol.endsWith("USDT")
        );

        const mapped = usdtPairs.map((coin: any) => ({
          symbol: coin.symbol.replace("USDT", ""),
          price: Number(coin.lastPrice),
          change: Number(coin.priceChangePercent),
        }));

        const sorted = [...mapped].sort(
          (a, b) => b.change - a.change
        );

        setGainers(sorted.slice(0, 5));
        setLosers(sorted.slice(-5).reverse());
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const coins = activeTab === "gainers" ? gainers : losers;

  return (
    <div className="bg-zinc-900 p-3 sm:p-4 rounded-xl space-y-4 w-full">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        
        <h4 className="font-semibold text-base sm:text-lg">
          Top Movers
        </h4>

        {/* TOGGLE */}
        <div className="flex bg-zinc-800 rounded-lg p-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("gainers")}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs sm:text-sm rounded-md transition ${
              activeTab === "gainers"
                ? "bg-green-500 text-black"
                : "text-gray-400"
            }`}
          >
            Gainers
          </button>

          <button
            onClick={() => setActiveTab("losers")}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs sm:text-sm rounded-md transition ${
              activeTab === "losers"
                ? "bg-red-500 text-black"
                : "text-gray-400"
            }`}
          >
            Losers
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {coins.map((coin) => (
          <div
            key={coin.symbol}
            className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition p-2 sm:p-3 rounded-lg"
          >
            {/* LEFT */}
            <span className="font-medium text-sm sm:text-base">
              {coin.symbol}
            </span>

            {/* RIGHT */}
            <div className="text-right">
              <p className="text-xs sm:text-sm">
                {formatCurrency(coin.price)}
              </p>
              <p
                className={`text-xs ${
                  coin.change >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.change.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TopMovers;