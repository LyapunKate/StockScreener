'use client';

import { useEffect, useState } from 'react';
import { StockDetailTable } from '../../../components/stock-detail-table';
import { StockChart } from '../../../components/stock-chart';
import { StockData } from '@/types/stock';

export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [industryAverages, setIndustryAverages] = useState<Partial<StockData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${params.symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();
        
        // Transform API data to match StockData interface
        const transformedData: StockData = {
          symbol: data.Symbol,
          name: data.Name,
          price: parseFloat(data.AnalystTargetPrice),
          peRatio: parseFloat(data.PERatio),
          pbRatio: parseFloat(data.PriceToBookRatio),
          roe: parseFloat(data.ReturnOnEquityTTM) * 100,
          epsGrowth: parseFloat(data.QuarterlyEarningsGrowthYOY) * 100,
          deRatio: parseFloat(data.DebtToEquityRatio),
          fcf: parseFloat(data.OperatingCashFlow),
          dividendYield: parseFloat(data.DividendYield) * 100,
          industry: data.Industry
        };

        setStockData(transformedData);
        
        // TODO: Fetch industry averages
        // This would typically come from your database
        setIndustryAverages({
          // Mock data for now
          peRatio: 15,
          pbRatio: 2,
          roe: 12,
          epsGrowth: 10,
          deRatio: 1.5,
          fcf: 1000000000,
          dividendYield: 2.5
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [params.symbol]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!stockData) {
    return <div className="flex justify-center items-center min-h-screen">Stock not found</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {stockData.name} ({stockData.symbol})
          </h1>
          <span className="text-2xl font-semibold">
            ${stockData.price.toFixed(2)}
          </span>
        </div>
        
        <StockChart symbol={params.symbol} />
        
        <StockDetailTable 
          stockData={stockData} 
          industryAverages={industryAverages} 
        />
      </main>
    </div>
  );
} 