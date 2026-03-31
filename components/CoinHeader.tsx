import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

type CoinHeaderProps = {
  name: string;
  image: string;
  livePrice: number;
  livePriceChangePercentage24h: number;
  priceChangePercentage30d: number;
  priceChange24h: number;
};

const CoinHeader = ({
  name,
  image,
  livePrice,
  livePriceChangePercentage24h,
}: CoinHeaderProps) => {
  const isPositive = livePriceChangePercentage24h >= 0;

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Image src={image} alt={name} width={40} height={40} />
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <p className="text-lg font-bold">
          {formatCurrency(livePrice)}
        </p>

        {/* 🔥 CHANGE WITH ARROW */}
        <div
          className={`flex items-center justify-end gap-1 text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUp size={16} />
          ) : (
            <ArrowDown size={16} />
          )}
          <span>
            {livePriceChangePercentage24h.toFixed(2)}%
          </span>
        </div>
      </div>

    </div>
  );
};

export default CoinHeader;