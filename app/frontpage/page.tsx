import { getQuotes } from '../actions/fetchQuotes'
import QuoteCardList from '../ui/QuoteCardList'

export default async function QuotesPage() {
  const data = await getQuotes('', 1)

  return <QuoteCardList initialQuotes={data.quotes} />
}
