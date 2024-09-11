"use server"
import { cookies } from 'next/headers';

async function getData(url) {
  // console.log("URL>>>>", url)
  const res = await fetch(url, {
    method: 'GET',
    // we'll set the authorization here later to
    // headers: {
    //   "Authorization": `Bearer ${sessionCookie.user.bearerToken}`,
    //   "Content-Type": "application/json",
    // }
          

  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');

  }

  return res.json();
}

export const getQuotes = async (query = '', currentPage = 1) => {
  const url = `http://127.0.0.1:5000?q=${query}&page=${currentPage}`;
  return getData(url);
};
