import React from "react";
import { formatCurrency } from "@/lib/utils";
import { CoinOverviewFallback } from "./fallback";
import CandleStickChart from "../CandlestickChart";

const CoinOverview = async () => {
  try {
    // 🔥 Binance price
    const priceRes = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
      { cache: "no-store" }
    );

    const priceData = await priceRes.json();

    // 🔥 Binance candles
    const ohlcRes = await fetch(
      "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100",
      { cache: "no-store" }
    );

    const rawOHLC = await ohlcRes.json();

    // 🔥 Convert Binance format → your chart format
    const coinOHLCData = rawOHLC.map((candle: any) => [
      candle[0], // time
      Number(candle[1]), // open
      Number(candle[2]), // high
      Number(candle[3]), // low
      Number(candle[4]), // close
    ]);

    return (
      <div id="coin-overview">
        <CandleStickChart data={coinOHLCData} coinId="bitcoin">
          <div className="header pt-2">

            {/* 🔥 No image (Binance doesn't provide) */}
            <div className="info">
              <p>Bitcoin / BTC</p>
              <h1>{formatCurrency(Number(priceData.price))}</h1>
            </div>

          </div>
        </CandleStickChart>
      </div>
    );
  } catch (error) {
    console.error("Binance fetch failed:", error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;