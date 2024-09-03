// // USER PROFILE ACTIONS
"use server"
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// export const userProfile = async () => {
//     console.log("called actions/userProfile");
//     try {
//         const sessionCookie = cookies().get('session')?.value;

//         if (sessionCookie) {
//             const parsedSession = JSON.parse(sessionCookie);
//             if (parsedSession && parsedSession.user && parsedSession.user.bearerToken) {
//                 const url = process.env.SERVERURL;

//                 const res = await fetch(`${url}/user`, {
//                     method: "GET",
//                     headers: {
//                         "Authorization": `Bearer ${parsedSession.user.bearerToken}`,
//                         "Content-Type": "application/json",
//                     },
//                     cache: "no-cache",
//                 });

//                 if (!res.ok) {
//                     throw new Error(`Error fetching user data: ${res.statusText}`);
//                 }

//                 const jsonres = await res.json();
//                 return jsonres;
//             } else {
//             	redirect('/login');
//                 // console.error("Invalid session structure");
                
//             }
//         } else {
//             // console.error("Session cookie not found");
//             redirect('/login');
//         }
//     } catch (error) {
//         console.error("Error fetching user session:", error);
//         return null;  // Return null or an appropriate value to indicate failure
//     }
// }

// export default userProfile;




import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';

const sessionCookie = cookies().get('session')?.value;
const url = process.env.SERVERURL;

export const updateUserProfile = async (data, updatetype) => {
    console.log("called updateUserProfile!", data, updatetype)
    if (sessionCookie) {
        const parsedSession = JSON.parse(sessionCookie);
        if (parsedSession && parsedSession.user && parsedSession.user.bearerToken) {

            const res = await fetch(`${url}/user?update=${updatetype}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${parsedSession.user.bearerToken}`,
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
                body: {"user_id":`${parsedSession.user.id}`, "editedbio":`${JSON.stringify(data)}`}
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
        throw new Error("SOMENS UP!");
    }



}

export const userProfile = async () => {
    console.log("called actions/userProfile");
    try {
        if (sessionCookie) {
            const parsedSession = JSON.parse(sessionCookie);
            if (parsedSession && parsedSession.user && parsedSession.user.bearerToken) {

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
