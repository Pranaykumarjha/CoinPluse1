"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

type ConverterProps = {
  symbol: string;
  icon: string;
  priceList: Record<string, number>;
};

const Converter = ({ symbol, icon, priceList }: ConverterProps) => {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("usd");

  const price = priceList[currency] || 0;
  const convertedValue = amount * price;

  return (
    <div className="bg-zinc-900 p-4 rounded-xl space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        
        {/* LEFT: coin info */}
        <div className="flex items-center gap-2">
          <Image src={icon} alt={symbol} width={30} height={30} />
          <h3 className="font-semibold uppercase">{symbol}</h3>
        </div>

        {/* RIGHT: converter icon */}
        <Image
          src="/converter.svg"
          alt="converter"
          width={32}
          height={32}
          className="icon"
        />
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 rounded bg-zinc-800 outline-none"
        />

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-2 rounded bg-zinc-800"
        >
          {Object.keys(priceList).map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* RESULT */}
      <div className="text-lg font-semibold">
        {formatCurrency(convertedValue)} {currency.toUpperCase()}
      </div>

    </div>
  );
};

export default Converter;