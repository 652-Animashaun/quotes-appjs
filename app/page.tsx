import Search from './ui/search';
import QuoteCardList from './ui/QuoteCardList';
import {getQuotes} from './actions/fetchQuotes';
// import QuotesPage from './frontpage/page';
import {QuoteListSkeleton} from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Pagination from './ui/pagination';
import InfiniteScroll from 'react-infinite-scroll-component'


 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
  };
}) {


  const query = searchParams?.q || '';
  // console.log('QueryTerms?', query)
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getQuotes(query, currentPage)
  console.log(data)
  console.log(data.total_pages)
  console.log(data.links.next)
  
  return (
          <main>
            <Search />
            {/*<QuoteListSkeleton/>*/}
          {/*  <Suspense key={data.quotes} fallback={<QuoteListSkeleton />}>
              
            </Suspense>*/}
            {/*<QuoteCardList quotes={data.quotes}/>*/}

            <InfiniteScroll
                dataLength={data.total_pages} //This is important field to render the next data
                next={data.links.next}
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
                // releaseToRefreshContent={
                //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                // }
              >
                <QuoteCardList quotes={data.quotes}/>
            </InfiniteScroll>

          </main>
          )
        
}