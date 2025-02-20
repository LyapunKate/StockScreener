import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StockData } from "@/types/stock";

interface StockDetailTableProps {
  stockData: StockData;
  industryAverages: Partial<StockData> | null;
}

const METRICS = [
  { key: 'peRatio', label: 'P/E Ratio' },
  { key: 'pbRatio', label: 'P/B Ratio' },
  { key: 'roe', label: 'Return on Equity (%)' },
  { key: 'epsGrowth', label: 'EPS Growth (%)' },
  { key: 'deRatio', label: 'Debt/Equity Ratio' },
  { key: 'fcf', label: 'Free Cash Flow' },
  { key: 'dividendYield', label: 'Dividend Yield (%)' },
];

export const StockDetailTable: React.FC<StockDetailTableProps> = ({ stockData, industryAverages }) => {
  const formatValue = (value: number, metric: string) => {
    if (metric === 'fcf') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(value);
    }
    return value.toFixed(2);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Industry Average</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {METRICS.map(({ key, label }) => (
            <TableRow key={key}>
              <TableCell>{label}</TableCell>
              <TableCell>
                {formatValue(stockData[key as keyof StockData] as number, key)}
              </TableCell>
              <TableCell>
                {industryAverages && industryAverages[key as keyof StockData] 
                  ? formatValue(industryAverages[key as keyof StockData] as number, key)
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 