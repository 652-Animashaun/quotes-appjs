// // USER PROFILE ACTIONS
"use server"

import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { getCookies } from '../lib/session';


const url = process.env.SERVERURL;

export const updateUserProfile = async (data, action) => {
    console.log("called updateUserProfile!", data, action)
    // const updateaction = JSON.stringify(action)
    const sessionCookie = getCookies()
    if (sessionCookie) {
        const parsedSession = JSON.parse(sessionCookie);
        if (parsedSession && parsedSession.user && parsedSession.user.bearerToken) {
            const payload = JSON.stringify({"user_id":`${parsedSession.user.id}`, [action]:data})
            const res = await fetch(`${url}/user?update=${action}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${parsedSession.user.bearerToken}`,
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
                body: payload
            });

            if (!res.ok) {
                throw new Error(`Error fetching user data: ${res.statusText}`);
            }

            const jsonres = await res.json();
            return jsonres;
        } else {
            console.error("Invalid session structure");
        }
    } else {
        console.error("Session cookie not found");
        throw new Error("SOMN'S UP B!");
    }


}

export const userProfile = async (moreUrl) => {
    console.log("called actions/userProfile");
    const sessionCookie = getCookies()
    try {
        if (sessionCookie) {
            const parsedSession = JSON.parse(sessionCookie);
            if (parsedSession && parsedSession.user && parsedSession.user.bearerToken) {

                const res = await fetch(moreUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${parsedSession.user.bearerToken}`,
                        "Content-Type": "application/json",
                    },
                    cache: "no-cache",
                });

                if (!res.ok) {
                    throw new Error(`Error fetching user data: ${res.statusText}`);

                }

                const jsonres = await res.json();
                return jsonres;
            } else {
                console.error("Invalid session structure");
                throw new Error("REDIRECT_TO_LOGIN");
            }
        } else {
            console.error("Session cookie not found");
            throw new Error("REDIRECT_TO_LOGIN");
        }
    } catch (error) {
        console.error("Error fetching user session:", error);
        throw error;
    }
};



export const getMoreUserQuotes = async (query = '', currentPage = 1) => {
  const moreUrl = `http://127.0.0.1:5000/user?q=${query}&page=${currentPage}`;
  return userProfile(moreUrl);
};

export default userProfile;
