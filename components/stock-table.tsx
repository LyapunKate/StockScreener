'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StockData } from "@/types/stock";
import { useState } from "react";

interface StockTableProps {
  stocks: StockData[];
}

export function StockTable({ stocks }: StockTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof StockData | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof StockData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return sortDirection === 'asc' 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(stocks[0] || {}).map((key) => (
              <TableHead 
                key={key}
                className="cursor-pointer"
                onClick={() => handleSort(key as keyof StockData)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortColumn === key && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStocks.map((stock) => (
            <TableRow key={stock.symbol}>
              {Object.values(stock).map((value, index) => (
                <TableCell key={index}>
                  {typeof value === 'number' ? value.toFixed(2) : value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 