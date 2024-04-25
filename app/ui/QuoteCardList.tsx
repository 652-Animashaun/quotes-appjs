
import QuoteCard from './QuoteCardComponent';
import {QuoteSkeleton} from './skeletons';
import { Suspense } from 'react';

export default function QuoteCardList({ quotes }: { quotes: Quotes[] }) {
  // console.log(quotes);
  return (
    <div class="grid grid-cols-12 gap-4">

      {quotes.map((quote) => (

	        <QuoteCard key={quote.id} quote={quote} />
      ))}

    </div>
  );
}


// export default function QuoteCardList({q, page}) {
//   console.log(quotes);
//   return (
//     <div class="grid grid-cols-12 gap-4">
//       {quotes.map((quote) => (
//         <QuoteCard key={quote.id} quote={quote} />
//       ))}
//     </div>
//   );
// }