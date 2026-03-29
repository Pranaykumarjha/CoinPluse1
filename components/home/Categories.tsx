import { fetcher } from '@/lib/coingecko.actions'
import React from 'react'
import DataTable from '../DataTable';
import Image from 'next/image';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CategoriesFallback } from './fallback';
const Categories = async () => {
    let categories: Category[] = [];
    try {
      categories = await fetcher<Category[]>('coins/categories');
    } catch (error) {
      console.error('Categories fetch failed:', error);
      return <CategoriesFallback />;
    }

    const columns: DataTableColumn<Category>[] = [
        {
            header: 'Category',
            cellClassName: 'category-cell',
            cell: (category) => category.name
        },
        {
            header: 'Top Gainers',
            cellClassName: 'top-gainers-cell',
            cell: (category) =>
                category.top_3_coins.map((coin) => (
                    <Image src={coin} alt={coin} key={coin} width={28} height={28} />
                )),
        },
        {
            header: '24h Change',
            cellClassName: 'change-header-cell',
            cell: (category) => {
                const isTrendingUp = category.market_cap_change_24h > 0;

                return (
                    <div className={cn('change-cell000', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                        <p className='flex items-center'>
                            {isTrendingUp ? <TrendingUp width={16} height={16} /> : <TrendingDown width={16} height={16} />}
                            {formatPercentage(category.market_cap_change_24h)}
                        </p>
                    </div>
                );
            },
        },
        {
            header: 'Market Cap',
            cellClassName: 'market-cap-cell',
            cell: (category) => formatCurrency(category.market_cap),
        },
        {
            header: '24h Change',
            cellClassName: 'volume-cell',
            cell: (category) => formatCurrency(category.volume_24h)
        }
    ]
    return (
        <div id='categories' className='custom-scrollbar'>
            <h4>Top Categories</h4>
            <DataTable columns={columns} data={categories?.slice(0, 10)} rowKey={(_, index) => index}
                tableClassName='mt-3' />

        </div>
    )
}

export default Categories
