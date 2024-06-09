import { getQuotes } from '../actions/fetchQuotes'

export default async function QuotesPage() {
  const data = await getQuotes()
  console.log(data, 'data gpttem back from network request')
  // return <QuoteCardList quotes={data.quotes} />
}
