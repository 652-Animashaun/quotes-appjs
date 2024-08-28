// USER PROFILE ACTIONS
"use server"
import { cookies } from 'next/headers';

export const userProfile = async () => {
	const session = JSON.parse(cookies().get('session').value);
	console.log("called actions/userProfile")

	const url = process.env.SERVERURL
	const res = await fetch(`${url}/user`, {
		method: "GET",
		headers: {
			"Authorization":`Bearer ${session.user.bearerToken}`,
			"Content-Type":"application/json",
		}
	})
	const jsonres = await res.json()
	console.log(jsonres)
	return jsonres
	
}

export default userProfile