import { fetchData } from 'next-auth/client/_utils'
import React from 'react'
import { render } from 'react-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getQuotes } from '../actions/fetchQuotes'
import QuoteCardComponent from './QuoteCardComponent'

<InfiniteScroll
  dataLength={getQuotes.length} //This is important field to render the next data
  next={getQuotes}
  hasMore={true}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
  // below props only if you need pull down functionality
  // refreshFunction={this.refresh}
  // pullDownToRefresh
  // pullDownToRefreshThreshold={50}
  // pullDownToRefreshContent={
  //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
  // }
  // refresButton={
  //   <button style={{ textAlign: 'center' }}>&#8595; Click to Refresh</button>
  // }
  // releaseToRefreshContent={
  //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
  // }
>
  // {QuoteCardComponent}
</InfiniteScroll>
