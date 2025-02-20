'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface StockChartProps {
  symbol: string;
}

interface PriceData {
  date: string;
  price: number;
}

export const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();
        
        const monthlyData = data['Monthly Time Series'];
        const transformedData: PriceData[] = Object.entries(monthlyData)
          .map(([date, values]: [string, any]) => ({
            date: date,
            price: parseFloat(values['4. close'])
          }))
          .reverse()
          .slice(-12); // Last 12 months

        setPriceData(transformedData);
      } catch (error) {
        console.error('Error fetching price data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceData();
  }, [symbol]);

  if (isLoading) {
    return <div>Loading chart...</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Price Chart</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
                month: 'long',
                year: 'numeric'
              })}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#2563eb" 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}; 