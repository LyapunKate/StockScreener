# Stock Screener App

A powerful web application that allows users to screen and analyze stocks based on various financial metrics. Built with Next.js and powered by Alpha Vantage API.

## Features

- **Stock Screening**: Filter stocks by multiple parameters:
  - P/E Ratio
  - P/B Ratio
  - Return on Equity (ROE)
  - EPS Growth
  - Debt/Equity Ratio
  - Free Cash Flow
  - Dividend Yield
  - Industry

- **Market Overview**: View real-time market data including:
  - Top Gainers
  - Top Losers
  - Most Actively Traded Stocks

- **Stock Details**: For each stock, view:
  - Detailed financial metrics
  - Monthly price chart
  - Industry average comparisons

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) - JavaScript runtime
- **Framework**: [Next.js](https://nextjs.org) - React framework
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Database**: Supabase
- **API**: Alpha Vantage
- **Type Safety**: TypeScript

## Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js) or other package managers (yarn, pnpm, bun)

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables in `.env.local`:
```env
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about the technologies used in this project:

- [Node.js Documentation](https://nodejs.org/docs) - Node.js runtime and APIs
- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Alpha Vantage API](https://www.alphavantage.co/documentation/) - Stock market data API
- [Supabase Documentation](https://supabase.io/docs) - Open source Firebase alternative
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework


