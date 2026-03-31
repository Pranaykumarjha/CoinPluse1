"use client";

import { Separator } from "@/components/ui/separator";
import CandlestickChart from "@/components/CandlestickChart";
import { formatCurrency, timeAgo } from "@/lib/utils";
import DataTable from "./DataTable";
import { useState } from "react";
import { useBinanceWebSocket, Trade } from "@/hooks/useBinanceWebSocket";
import CoinHeader from "./CoinHeader";

const LiveDataWrapper = ({
  coinId,
  coin,
  coinOHLCData = [],
}: any) => {
  const [liveInterval, setLiveInterval] = useState<"1s" | "1m">("1s");

  // 🔥 Binance (FREE)
  const { trades } = useBinanceWebSocket({
    symbol: "btcusdt", // you can make dynamic later
  });

  const tradeColumns = [
    {
      header: "Price",
      cell: (trade: Trade) =>
        trade.price ? formatCurrency(trade.price) : "-",
    },
    {
      header: "Amount",
      cell: (trade: Trade) =>
        trade.amount?.toFixed(4) ?? "-",
    },
    {
      header: "Value",
      cell: (trade: Trade) =>
        trade.value ? formatCurrency(trade.value) : "-",
    },
    {
      header: "Buy/Sell",
      cell: (trade: Trade) => (
        <span
          className={
            trade.type === "b"
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {trade.type === "b" ? "Buy" : "Sell"}
        </span>
      ),
    },
    {
      header: "Time",
      cell: (trade: Trade) =>
        trade.timestamp ? timeAgo(trade.timestamp) : "-",
    },
  ];

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          coin.market_data.price_change_percentage_24h
        }
        priceChangePercentage30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={
          coin.market_data.price_change_24h_in_currency.usd
        }
      />
      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart
          coinId={coinId}
          data={coinOHLCData}
          mode="historical"
          initialPeriod="daily"
          liveInterval={liveInterval}
          setLiveInterval={setLiveInterval}
        />
        <h4>Trend Overview</h4>
      </div>

      <Separator className="divider" />

      <div className="trades">
        <h4>Recent Trades</h4>

        {trades.length === 0 ? (
          <p className="text-gray-400">Loading trades...</p>
        ) : (
          <DataTable
            columns={tradeColumns}
            data={trades}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        )}
      </div>
    </section>
  );
};

export default LiveDataWrapper;