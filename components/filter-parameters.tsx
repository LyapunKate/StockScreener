'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilterParams } from '@/types/stock';

const RANGES = {
  peRatio: ['Any', '< 10', '10-15', '15-20', '20-25', '> 25'],
  pbRatio: ['Any', '< 1', '1-2', '2-3', '3-4', '> 4'],
  roe: ['Any', '< 5%', '5-10%', '10-15%', '15-20%', '> 20%'],
  epsGrowth: ['Any', '< 0%', '0-10%', '10-20%', '20-30%', '> 30%'],
  deRatio: ['Any', '< 0.5', '0.5-1', '1-1.5', '1.5-2', '> 2'],
  fcf: ['Any', 'Negative', '0-1B', '1B-5B', '5B-10B', '> 10B'],
  dividendYield: ['Any', '0%', '0-2%', '2-4%', '4-6%', '> 6%'],
};

const PARAMETER_LABELS = {
  peRatio: 'P/E Ratio',
  pbRatio: 'P/B Ratio',
  roe: 'Return on Equity',
  epsGrowth: 'EPS Growth',
  deRatio: 'Debt/Equity Ratio',
  fcf: 'Free Cash Flow',
  dividendYield: 'Dividend Yield',
};

interface FilterParametersProps {
  onFilterChange: (filters: FilterParams) => void;
}

export function FilterParameters({ onFilterChange }: FilterParametersProps) {
  const [filters, setFilters] = useState<FilterParams>({});

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'Any' ? undefined : value
    }));
  };

  const handleApplyFilters = () => {
    // Remove any undefined values before sending
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );
    onFilterChange(cleanedFilters as FilterParams);
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(RANGES).map(([key, values]) => (
          <div key={key} className="flex flex-col gap-2">
            <label 
              htmlFor={key} 
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {PARAMETER_LABELS[key as keyof typeof PARAMETER_LABELS]}
            </label>
            <Select
              defaultValue="Any"
              onValueChange={(value) => handleFilterChange(key as keyof FilterParams, value)}
            >
              <SelectTrigger id={key}>
                <SelectValue placeholder="Select value" />
              </SelectTrigger>
              <SelectContent>
                {values.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <Button 
        className="mt-6"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </Card>
  );
} 