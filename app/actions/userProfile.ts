// USER PROFILE ACTIONS
"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



export const userProfile = async () => {
	console.log("called actions/userProfile")
	try {
		const sessionCookie = JSON.parse(cookies().get('session')?.value);
		if (sessionCookie){
			const url = process.env.SERVERURL
			const res = await fetch(`${url}/user`, {
				method: "GET",
				headers: {
					"Authorization":`Bearer ${sessionCookie.user.bearerToken}`,
					"Content-Type":"application/json",

				},
				cache:"no-cache",
			})
			const jsonres = await res.json()
			return jsonres
		}
		else {
			redirect('/login')

		}

	}
	catch (error){
		console.error("Error fetching user session")
	}

}

export default userProfile
