export interface StockData {
  symbol: string;
  name: string;
  price: number;
  peRatio: number;
  pbRatio: number;
  roe: number;
  epsGrowth: number;
  deRatio: number;
  fcf: number;
  dividendYield: number;
  industry: string;
}

export interface FilterParams {
  peRatio?: {
    min?: number;
    max?: number;
  };
  pbRatio?: {
    min?: number;
    max?: number;
  };
  roe?: {
    min?: number;
    max?: number;
  };
  epsGrowth?: {
    min?: number;
    max?: number;
  };
  deRatio?: {
    min?: number;
    max?: number;
  };
  fcf?: {
    min?: number;
    max?: number;
  };
  dividendYield?: {
    min?: number;
    max?: number;
  };
  industry?: string;
} 