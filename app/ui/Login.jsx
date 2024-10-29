"use client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from './css/LoginRegister.module.css';
import { SignIn } from '../actions/auth';
import {signIn, signOut, useSession} from "next-auth/react";


export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()

  const onSubmit = async (data) => {
    
    console.log("onSubmit");
    const {email, password} = data
    // Handle login logic here, then redirect to another page
    await SignIn(data)
    router.push('/');
    
    
  };
  return (
    <div className={styles.formContainer}>
      <h2 className='font-bold'>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.input} { ...register('email', { required: 'Email is required' })} placeholder="Email" />
          {errors.email && <span>{errors.email.message}</span>}
        <input className={styles.input} type="password" {...register('password', { required: 'Name is required' })} placeholder="Password" />
          {errors.password && <span>{errors.password.message}</span>}
        <button className={styles.button} type="submit">Login</button>
      </form>
         
      <p className={styles.link}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
