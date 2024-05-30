import Search from './ui/search'
import QuoteCardList, InfiniteScroll from './ui/QuoteCardList'
import { getQuotes } from './actions/fetchQuotes'
// import QuotesPage from './frontpage/page';
import { QuoteListSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    q?: string
    page?: string
  }
}) {
  const query = searchParams?.q || ''
  // console.log('QueryTerms?', query)
  const currentPage = Number(searchParams?.page) || 1
  const data = await getQuotes(query, currentPage)

  return (
    <main>
      <Search />
      {/*<QuoteListSkeleton/>*/}
      <Suspense key={data.quotes} fallback={<QuoteListSkeleton />}>
        <QuoteCardList quotes={data.quotes} />
      </Suspense>
    </main>
  )
}
