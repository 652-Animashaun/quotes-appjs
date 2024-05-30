import { URL } from 'url' // Import the URL module

async function getData({ url }) {
  const res = await fetch(url)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const getQuotes = (query = '', currentPage = 1, limit = 10) => {
  const urlString = `http://127.0.0.1:5000?q=${query}&page=${currentPage}&limit=${limit}`
  const url = new URL(urlString) // Create a new URL object

  return getData({ url })
}
