import { Card, Metric, Text, Col, Grid } from '@tremor/react'

export default function QuoteCard({ quote }: { quote: Quote }) {
  // console.log(quote)
  return (
    <div key={quote.id} className="col-span-12 md:col-span-8">
      <Card
        className="p-8"
        decoration="top"
        decorationColor=""
        className="text-base"
      >
        <p className="text-lg">{quote.artist}</p>
        <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong ">
          {quote.quote}
        </p>

        <div className="col-span-4 gap-12">
          <span className="hover:tracking-wide text-right">-{quote.song}</span>
        </div>
      </Card>
    </div>
  )
}
