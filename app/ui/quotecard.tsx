import { Card, Metric, Text, Col, Grid } from "@tremor/react";

export default function QuoteCard({quotes}:{quotes: Quotes[]}) {
	// console.log(quotes)
	return (

		<>
		
		<div class="">
			{quotes.map((quote)=>(

				<div class="grid grid-cols-2 gap-4 hover:bg-midnight">

				<div class="flex justify-center">

				
				<Card key={quote.id} className="p-8" decoration="top" decorationColor="">
				    <Text>{quote.artist}</Text>
				    <Metric>{quote.quote}</Metric>
				</Card>
				</div>
				</div>
				
				
			))}
			<div class="p-4">
			  <div class="flow-root ...">
			    <div class="my-4 ...">Well, let me tell you something, ...</div>
			  </div>
			  <div class="flow-root ...">
			    <div class="my-4 ...">Sure, go ahead, laugh if you want...</div>
			  </div>
			</div>

			</div>

			
		

		</>
		)
};