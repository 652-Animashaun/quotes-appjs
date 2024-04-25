import {getQuotes} from '../actions/fetchQuotes';




export default async function QuotesPage(){
    const data = await getQuotes()
    // console.log(data)
    return (
       <QuoteCardList quotes={data.quotes}/>
        )
}
    