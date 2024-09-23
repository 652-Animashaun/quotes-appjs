
import QCard from './QCard';
import { QuoteSkeleton } from './skeletons';
import { Suspense } from 'react';
import React, { useState, useEffect, useRef } from 'react'


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


 





export default function QuoteCardList({ quotes }) {
	
  useEffect(() => {
    if (quotes.length > 0) {
      console.log("Quotes data is available:", quotes);
    }
  }, [quotes]);

  return (
    <>
      {quotes && quotes.length > 0 ? (
        quotes.map((quote) => (
          <Suspense key={quote.id} fallback={<QuoteSkeleton />}>
            <QCard quote={quote} />
          </Suspense>
        ))
      ) : (
        <div>
          <h2>No Data Loaded</h2>
        </div>
      )}
    </>
  );
}


