



async function getData({url}:{url: URL}) {
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export const getQuotes = (query, currentPage)=> {
	const url = `http://127.0.0.1:5000?q=${query}`
	console.log(url)

	return getData({url})
}