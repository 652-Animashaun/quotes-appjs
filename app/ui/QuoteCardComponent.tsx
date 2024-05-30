// app/ui/QuotesCardComponent.tsx
import { Card } from "@tremor/react";

type Quote = {
  id: number;
  artist: string;
  quote: string;
  song: string;
};

export default function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div key={quote.id} className="col-span-12 md:col-span-8">
      <Card className="p-8" decoration="top" decorationColor="">
        <p className="text-lg">{quote.artist}</p>
        <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong">{quote.quote}</p>
        <div className="col-span-4 gap-12">
          <span className="hover:tracking-wide text-right">-{quote.song}</span>
        </div>
      </Card>
    </div>
  );
}


