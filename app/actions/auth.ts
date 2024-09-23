// "use server"
// import { cookies } from 'next/headers'
import { signIn } from 'next-auth/react';


export async function SignIn(form) {
    const {email, password} = form
    const res = await signIn('credentials', 
      {
        redirect: false,
        email, 
        password
      })
    // console.log("Login API response", res.body.json())
    return res
  }


async function register(formData) {
  console.log("formData>>>>", formData)
  try {
        // Assume a login API endpoint exists
        const response = await fetch('http://127.0.0.1:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        // Handle successful login (e.g., store token, redirect)
        

        const responseData = await response.json();
        return responseData
        // const encryptedSessionData = encrypt(responseData)
        
        

        
      } catch (error) {
        console.error('Error registering user:', error);
      } finally {
      }
}

export const createUser = async (formData) => {
  // const url = `http://127.0.0.1:5000/login`;
  const user = await register(formData)
  console.log("responseData>>>", user)

  return user;
};

export default createUser;