# Project overview
Use this guide to build a web-app where users can search stocks by adjusting such parameters as:
- P/E 
- P/B
- ROE
- EPS Growth
- D/E
- FCF
- Dividend Yield
- Industry

The app should display the stocks that match the user's criteria.

# Feature requirements
- The app should be built with Next.js, Shadcn/UI, Lucide, Supabase, Clerk.
- The app should be responsive and look good on both mobile and desktop.
- The app should be built with accessibility in mind.
- The app should be built with performance in mind.
- The app should be built with security in mind.
- The app should be built with scalability in mind.
- The app should be built with maintainability in mind.

- The user should be able to search for stocks by adjusting the parameters above. For each parameter create a dropdown list with the possible values. 
- The user should be able to see the stocks that match the criteria.
- If user doesn't choose some of the parameters, the app should display all the stocks that match the criteria that user has chosen and do not aplly any filters on the parameters that user has not chosen.
- Stock schoulb be represented in the table with the following columns: Symbol, Name, Price, P/E, P/B, ROE, EPS Growth, D/E, FCF, Dividend Yield, and Industry.
- The user schould be able to sort the result table by each column in ascending and descending order.
- The user schould be able to choose any of the stocks from the table and see the stock's price monthly chart on a separate page.
- The app should be able to display the chart for any stock from the table.
- If user doesn't choose any parameters, the app should display Top Gainers, Losers, and Most Actively Traded Tickers (US Market) from api - https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo. 
- On the separate page with the information about the stock the user should be able to see the stock's price monthly chart and a table with columns: Symbol, Name, Price, P/E, P/B, ROE, EPS Growth, D/E, FCF, Dividend Yield, and Industry and industry average value for each column.
- To find all stock's symbols use this api https://www.alphavantage.co/query?function=LISTING_STATUS&date=2014-07-10&state=listed&apikey=demo In date field put current date each time.
- After getting all listed stocks get info about them using this api https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo save all this this data in the database and based on the clients search return the suitable stocks from the database according to search parametres.

# Relevant docs

The documentation for API that you schould use is here: https://www.alphavantage.co/documentation/#
You schould use this three nethods: 
https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo.
https://www.alphavantage.co/query?function=LISTING_STATUS&date=2014-07-10&state=listed&apikey=demo
https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo

Here is documentation for each method:

TOP_GAINERS_LOSERS:
API Parameters

❚ Required: function

The API function of your choice. In this case, function=TOP_GAINERS_LOSERS

❚ Required: apikey

Your API key. 

Output:

{
    "metadata": "Top gainers, losers, and most actively traded US tickers",
    "last_updated": "2024-12-13 16:15:59 US/Eastern",
    "top_gainers": [
        {
            "ticker": "HUBCZ",
            "price": "0.0193",
            "change_amount": "0.0128",
            "change_percentage": "196.9231%",
            "volume": "290692"
        }
    ],
    "top_losers": [
        {
            "ticker": "NXLIW",
            "price": "0.2103",
            "change_amount": "-0.2898",
            "change_percentage": "-57.9484%",
            "volume": "1444"
        }
    ],
    "most_actively_traded": [
        {
            "ticker": "MSTZ",
            "price": "0.84",
            "change_amount": "-0.07",
            "change_percentage": "-7.6923%",
            "volume": "944424154"
        }
    ]
}

LISTING_STATUS:

API Parameters

❚ Required: function

The API function of your choice. In this case, function=LISTING_STATUS

❚ Optional: date

If no date is set, the API endpoint will return a list of active or delisted symbols as of the latest trading day. If a date is set, the API endpoint will "travel back" in time and return a list of active or delisted symbols on that particular date in history. Any YYYY-MM-DD date later than 2010-01-01 is supported. For example, date=2013-08-03

❚ Optional: state

By default, state=active and the API will return a list of actively traded stocks and ETFs. Set state=delisted to query a list of delisted assets.

❚ Required: apikey

Your API key. Claim your free API key here.

Output:

csv with this table: symbol	name	exchange	assetType	ipoDate	delistingDate	status

OVERVIEW

API Parameters

❚ Required: function

The function of your choice. In this case, function=OVERVIEW

❚ Required: symbol

The symbol of the ticker of your choice. For example: symbol=IBM.

❚ Required: apikey

Your API key. 

{
    "Symbol": "IBM",
    "AssetType": "Common Stock",
    "Name": "International Business Machines",
    "Description": "International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",
    "CIK": "51143",
    "Exchange": "NYSE",
    "Currency": "USD",
    "Country": "USA",
    "Sector": "TECHNOLOGY",
    "Industry": "COMPUTER & OFFICE EQUIPMENT",
    "Address": "1 NEW ORCHARD ROAD, ARMONK, NY, US",
    "OfficialSite": "https://www.ibm.com",
    "FiscalYearEnd": "December",
    "LatestQuarter": "2024-09-30",
    "MarketCapitalization": "213426569000",
    "EBITDA": "14676000000",
    "PERatio": "33.65",
    "PEGRatio": "7.64",
    "BookValue": "26.44",
    "DividendPerShare": "6.66",
    "DividendYield": "0.0289",
    "EPS": "6.86",
    "RevenuePerShareTTM": "68.11",
    "ProfitMargin": "0.102",
    "OperatingMarginTTM": "0.141",
    "ReturnOnAssetsTTM": "0.0473",
    "ReturnOnEquityTTM": "0.267",
    "RevenueTTM": "62579999000",
    "GrossProfitTTM": "32688000000",
    "DilutedEPSTTM": "6.86",
    "QuarterlyEarningsGrowthYOY": "0.141",
    "QuarterlyRevenueGrowthYOY": "0.015",
    "AnalystTargetPrice": "216.3",
    "AnalystRatingStrongBuy": "2",
    "AnalystRatingBuy": "5",
    "AnalystRatingHold": "9",
    "AnalystRatingSell": "3",
    "AnalystRatingStrongSell": "1",
    "TrailingPE": "33.65",
    "ForwardPE": "21.41",
    "PriceToSalesRatioTTM": "3.41",
    "PriceToBookRatio": "8.73",
    "EVToRevenue": "4.152",
    "EVToEBITDA": "20.54",
    "Beta": "0.71",
    "52WeekHigh": "239.35",
    "52WeekLow": "152.38",
    "50DayMovingAverage": "222.63",
    "200DayMovingAverage": "195.71",
    "SharesOutstanding": "924645000",
    "DividendDate": "2024-12-10",
    "ExDividendDate": "2024-11-12"
}

# Current file structure

STOCK_SCREENER/
├── .next/
├── app/
│   ├── fonts/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── components/ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── select.tsx
│       └── table.tsx
│   └── lib/
│       └── utils.ts
├── node_modules/
├── requirements/
├── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
└── postcss.config.mjs

# Rules

- All new components schould go in /components an be named like example-component.tsx unless otherwise specified
- All new pages go in /app



