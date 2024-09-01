"use server"
import { cookies } from 'next/headers';

async function getData(url) {
  // const sessionCookie = JSON.parse(cookies().get('session')?.value);


  
  // if (!sessionCookie) {
  //   throw new Error('Session cookie not found');
  // }
  
  // console.log("COOKIE_SESS", sessionCookie.user["bearerToken"])
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
    // console.log("!!!!COOKIE_SESS", sessionCookie)
    throw new Error('Failed to fetch data');

  }

  return res.json();
}

export const getQuotes = async (query = '', currentPage = 1) => {
  const url = `http://127.0.0.1:5000?q=${query}&page=${currentPage}`;
  return getData(url);
};
