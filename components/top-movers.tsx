'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

interface TopMoverData {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

interface TopMoversResponse {
  top_gainers: TopMoverData[];
  top_losers: TopMoverData[];
  most_actively_traded: TopMoverData[];
}

export function TopMovers() {
  const [data, setData] = useState<TopMoversResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopMovers = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        
        // Log the raw response for debugging
        console.log('API Response:', rawData);

        // Check if the API returned an error message and show the exact message
        if (rawData.Note) {
          throw new Error(`Alpha Vantage API: ${rawData.Note}`);
        }

        if (rawData['Error Message']) {
          throw new Error(`Alpha Vantage API: ${rawData['Error Message']}`);
        }

        if (rawData.Information) {
          throw new Error(`Alpha Vantage API: ${rawData.Information}`);
        }

        // Check if we have the expected data structure
        if (!rawData.top_gainers && !rawData.top_losers && !rawData.most_actively_traded) {
          throw new Error(`Unexpected API response: ${JSON.stringify(rawData)}`);
        }

        setData({
          top_gainers: rawData.top_gainers || [],
          top_losers: rawData.top_losers || [],
          most_actively_traded: rawData.most_actively_traded || []
        });
      } catch (error) {
        console.error('Error fetching top movers:', error);
        setError(
          error instanceof Error 
            ? error.message 
            : 'Failed to fetch market data. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopMovers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading market data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <Card className="p-6 max-w-2xl w-full">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-500 mb-2">Error</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <div className="text-sm text-gray-500 space-y-2">
              <p>Common Alpha Vantage API responses:</p>
              <ul className="list-disc list-inside">
                <li>"Thank you for using Alpha Vantage! Our standard API rate limit is 5 requests per minute and 500 requests per day."</li>
                <li>"The API key provided is invalid or has expired."</li>
                <li>"This API function (TOP_GAINERS_LOSERS) is available exclusively for premium users."</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const renderTable = (title: string, data: TopMoverData[]) => (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Change %</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.ticker}>
                <TableCell>
                  <Link 
                    href={`/stock/${item.ticker}`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {item.ticker}
                  </Link>
                </TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell className={item.change_amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
                  {item.change_amount}
                </TableCell>
                <TableCell className={item.change_percentage.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
                  {item.change_percentage}
                </TableCell>
                <TableCell>{parseInt(item.volume).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="space-y-8">
      {data && (
        <>
          {renderTable('Top Gainers', data.top_gainers)}
          {renderTable('Top Losers', data.top_losers)}
          {renderTable('Most Active', data.most_actively_traded)}
        </>
      )}
    </div>
  );
} 