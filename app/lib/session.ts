"server-only"

import { cookies } from 'next/headers';


export async function setSessionCookie(session){
	
	
	cookies().set('session', JSON.stringify(session),{
	httpOnly: true,
	path:'/',
	SameSite: 'lax',
		}) 
	console.log('SESSION USER ID', session.user.id);
	
	return
}