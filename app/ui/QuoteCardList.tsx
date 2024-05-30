'use client' // Add this line at the top

import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import QuoteCard from './QuoteCardComponent'

export default function QuoteCardList({ initialQuotes }) {
  const [quotes, setQuotes] = useState(initialQuotes || [])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreData = async () => {
    try {
      const data = await getQuotes('', page + 1) // Use the getQuotes function for fetching
      const newQuotes = data.quotes

      if (newQuotes.length === 0) {
        setHasMore(false)
      } else {
        setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes])
        setPage(page + 1)
      }
    } catch (error) {
      console.error('Error fetching more quotes:', error)
      setHasMore(false)
    }
  }

  return (
    <InfiniteScroll
      dataLength={quotes.length || 0} // Ensure quotes is an array before accessing length
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
      }
      refreshFunction={() => window.location.reload()}
    >
      <div className="grid grid-cols-12 gap-4">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
    </InfiniteScroll>
  )
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
