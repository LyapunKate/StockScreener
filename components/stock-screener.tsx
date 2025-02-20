'use client';

import { useState } from 'react';
import { FilterParameters } from './filter-parameters';
import { StockTable } from './stock-table';
import { TopMovers } from './top-movers';
import { StockData } from '@/types/stock';

export default function StockScreener() {
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = async (filters: any) => {
    setIsLoading(true);
    // TODO: Implement API call to fetch filtered stocks
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <FilterParameters onFilterChange={handleFilterChange} />
      {filteredStocks.length > 0 ? (
        <StockTable stocks={filteredStocks} />
      ) : (
        <TopMovers />
      )}
    </div>
  );
} 