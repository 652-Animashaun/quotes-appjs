import React from 'react';
import QuoteCard from './QuoteCardComponent';
import { QuoteSkeleton } from './skeletons';
import { Suspense } from 'react';

// Assuming Quotes is an array of quote objects with specific properties
type Quote = {
  id: number;
  text: string;
  author: string;
  // Add other properties as needed
};

type QuoteCardListProps = {
  quotes: Quote[];
};

export default function QuoteCardList({ quotes }: QuoteCardListProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {quotes.map((quote) => (
        <Suspense key={quote.id} fallback={<QuoteSkeleton />}>
          <QuoteCard key={quote.id} quote={quote} />
        }
        }
        </Suspense>
      ))}
    </div>
  );
}
