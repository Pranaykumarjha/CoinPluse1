"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
};

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const searchCoins = async (value: string) => {
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${value}`
      );
      const data = await res.json();

      setResults(data.coins.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">

      {/* INPUT */}
      <input
        type="text"
        placeholder="Search coins..."
        value={query}
        onChange={(e) => searchCoins(e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 outline-none"
      />

      {/* DROPDOWN */}
      {query && (
        <div className="absolute top-12 left-0 w-full bg-zinc-900 rounded-lg shadow-lg z-50">
          
          {loading && (
            <p className="p-2 text-sm text-gray-400">
              Searching...
            </p>
          )}

          {!loading && results.length === 0 && (
            <p className="p-2 text-sm text-gray-400">
              No results
            </p>
          )}

          {results.map((coin) => (
            <div
              key={coin.id}
              onClick={() => {
                router.push(`/coins/${coin.id}`);
                setQuery("");
                setResults([]);
              }}
              className="flex items-center gap-2 p-2 hover:bg-zinc-800 cursor-pointer"
            >
              <Image
                src={coin.thumb}
                alt={coin.name}
                width={20}
                height={20}
              />
              <span className="text-sm">
                {coin.name} ({coin.symbol.toUpperCase()})
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default GlobalSearch;