// // USER PROFILE ACTIONS
"use server"

import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';

export const userProfile = async () => {
    console.log("called actions/userProfile");
    try {
        const sessionCookie = cookies().get('session')?.value;

        if (sessionCookie) {
            const parsedSession = JSON.parse(sessionCookie);
            if (parsedSession && parsedSession.user && parsedSession.user.bearerToken) {
                const url = process.env.SERVERURL;

                const res = await fetch(`${url}/user`, {
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
export default userProfile;
