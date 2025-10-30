import { PriceAggregatorExample } from '@/components/examples/PriceAggregatorExample';

export default function TestPriceAggregatorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Price Aggregator Test</h1>
        <p className="text-gray-600">
          Testing our CTO-level price aggregator with multiple free APIs
        </p>
      </div>

      <PriceAggregatorExample />
    </div>
  );
}
