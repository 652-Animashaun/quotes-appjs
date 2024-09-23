import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import QuoteCardList from './QuoteCardList';

interface InfiniteScrollCmpProps {
  quotes: any[];
  fetchQuotes: (direction: 'next' | 'prev') => void;
  hasMore?: boolean;
}

const InfiniteScrollCmp: React.FC<InfiniteScrollCmpProps> = ({
  quotes,
  fetchQuotes,
  hasMore = true,
}) => {
  console.log(quotes)
  return (
    <InfiniteScroll
      dataLength={quotes.length}
      next={() => fetchQuotes('next')}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      refreshFunction={() => fetchQuotes('prev')}
      pullDownToRefresh = {true}
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
      }
    >
      <QuoteCardList quotes={quotes} />
    </InfiniteScroll>
  );
};

export default InfiniteScrollCmp;
