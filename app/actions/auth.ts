"use server"

import { cookies } from 'next/headers'

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
      // const encryptedSessionData = encrypt(responseData)
      console.log("responseData>>>", responseData)
      

      
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
    }
}

export const createUser = async (formData) => {
  // const url = `http://127.0.0.1:5000/login`;
  return register(formData);
};

export default createUser;