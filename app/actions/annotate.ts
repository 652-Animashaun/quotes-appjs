// // ANNOTATE
"use server"

import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { getCookies } from '../lib/session';


const url = process.env.SERVERURL;

export const Annotate = async (annotation) => {
    console.log("called /annotation!", annotation)

    const sessionCookie = getCookies()
    if (sessionCookie) {
        const parsedSession = JSON.parse(sessionCookie);
        if (parsedSession && parsedSession.user && parsedSession.user.bearerToken) {
            
            const res = await fetch(`${url}/annotate`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${parsedSession.user.bearerToken}`,
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
                body: JSON.stringify(annotation)
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
        throw new Error("Please log in to contribute.");
    }


}

