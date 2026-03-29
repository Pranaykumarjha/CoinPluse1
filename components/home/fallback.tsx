import React from 'react';
import DataTable from '@/components/DataTable';

const skeletonTrendingCoins: TrendingCoin[] = Array.from({ length: 6 }, (_, i) => ({
  item: {
    id: `skeleton-${i}`,
    name: '—',
    symbol: '—',
    market_cap_rank: 0,
    thumb: '/converter.svg',
    large: '/converter.svg',
    data: {
      price: 0,
      price_change_percentage_24h: {
        usd: 0,
      },
    },
  },
}));

const trendingCoinsFallbackColumns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name',
    cell: () => (
      <div className="name-cell">
        <div className="name-link">
          <div className="name-image skeleton animate-pulse" />
          <div className="name-line skeleton animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    header: '24hr change',
    cell: () => (
      <div className="change-cell">
        <div className="price-change">
          <div className="change-icon skeleton animate-pulse" />
          <div className="change-line skeleton animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    header: 'Price',
    cell: () => (
      <div className="price-cell">
        <div className="price-line skeleton animate-pulse" />
      </div>
    ),
  },
];

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton animate-pulse" />
        <div className="info">
          <div className="header-line-sm skeleton animate-pulse" />
          <div className="header-line-lg skeleton animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function TrendingCoinsFallback() {
  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>

      <DataTable
        data={skeletonTrendingCoins}
        columns={trendingCoinsFallbackColumns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
      />
    </div>
  );
}

const skeletonCategories: Category[] = Array.from({ length: 6 }, (_, i) => ({
  name: '—',
  top_3_coins: ['/converter.svg', '/converter.svg', '/converter.svg'],
  market_cap_change_24h: 0,
  market_cap: 0,
  volume_24h: 0,
}));

const categoriesFallbackColumns: DataTableColumn<Category>[] = [
  {
    header: 'Category',
    cellClassName: 'category-cell',
    cell: () => <div className="category-skeleton skeleton animate-pulse" />,
  },
  {
    header: 'Top Gainers',
    cellClassName: 'top-gainers-cell',
    cell: () => (
      <div className="flex gap-2">
        <div className="coin-skeleton skeleton animate-pulse" />
        <div className="coin-skeleton skeleton animate-pulse" />
        <div className="coin-skeleton skeleton animate-pulse" />
      </div>
    ),
  },
  {
    header: '24h Change',
    cellClassName: 'change-header-cell',
    cell: () => (
      <div className="change-cell">
        <div className="price-change">
          <div className="change-icon skeleton animate-pulse" />
          <div className="change-line skeleton animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    header: 'Market Cap',
    cellClassName: 'market-cap-cell',
    cell: () => <div className="value-skeleton-md skeleton animate-pulse" />,
  },
  {
    header: '24h Change',
    cellClassName: 'volume-cell',
    cell: () => <div className="value-skeleton-md skeleton animate-pulse" />,
  },
];

export function CategoriesFallback() {
  return (
    <div id="categories-fallback">
      <h4>Top Categories</h4>
      <DataTable
        data={skeletonCategories}
        columns={categoriesFallbackColumns}
        rowKey={(_, index) => `category-skeleton-${index}`}
        tableClassName="mt-3"
      />
    </div>
  );
}

