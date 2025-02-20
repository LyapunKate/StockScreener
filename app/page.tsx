import StockScreener from "@/components/stock-screener";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Stock Screener</h1>
        <StockScreener />
      </main>
    </div>
  );
}
