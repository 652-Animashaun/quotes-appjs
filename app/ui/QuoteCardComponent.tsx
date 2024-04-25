import { Card, Metric, Text, Col, Grid } from "@tremor/react";

export default function QuoteCard({quote}:{quote: Quote}){
	// console.log(quote)
	 return (
		 	<div key={quote.id} class="col-span-12 md:col-span-8">

				<Card className="p-8" decoration="top" decorationColor="" class="text-base">
				    <p class="text-lg" >{quote.artist}</p>
				    <p class="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong ">{quote.quote}</p>
				    
				    <div class="col-span-4 gap-12">
				    	<span class="hover:tracking-wide text-right">-{quote.song}</span>
				    </div>
				</Card>
			</div>
			)
}