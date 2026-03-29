import React from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CoinOverviewFallback } from './fallback';
import CandleStickChart from '../CandlestickChart';

const CoinOverview = async () => {

  try {
    // Use dynamic import so config/runtime errors thrown at module-load time
    // are also caught and we can safely render a fallback UI.
    const { fetcher } = await import('@/lib/coingecko.actions');
    const [coin, coinOHLCData] = await Promise.all([
      await fetcher<CoinDetailsData>('coins/bitcoin', {
        dex_pair_format: 'symbol',
      }),
      await fetcher<OHLCData[]>('coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: 1,

      }),

    ]);
    return (
      <div id="coin-overview">
        <CandleStickChart data={coinOHLCData} coinId='bitcoin'>
            <div className="header pt-2">
          <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
          <div className="info">
            <p>
              {coin.name}/{coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>

        </CandleStickChart>
      
      </div>
    );



  } catch (error) {
    console.error('CoinOverview fetch failed:', error);
    return <CoinOverviewFallback />;
  }



};

export default CoinOverview;
