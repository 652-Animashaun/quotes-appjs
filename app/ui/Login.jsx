// components/Login.js
"use client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from './css/LoginRegister.module.css';
import { authC } from '../actions/auth';
import {signIn, signOut, useSession} from "next-auth/react";
export default function Login() {
  // const { register, handleSubmit, formState: { errors } } = useForm();
  // const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    // Handle login logic here, then redirect to another page
    await authC(data)
    // router.push('/');
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
         <signIn onClick={() => signIn()}/>
      <p className={styles.link}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
