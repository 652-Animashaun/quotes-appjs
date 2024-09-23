// components/Register.js
"use client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from './css/LoginRegister.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css'; // Assuming you have a Tailwind CSS setup
import createUser from '../actions/auth';
import { signIn } from 'next-auth/react';




export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    // Handle registration logic here, then redirect to another page
    const user = await createUser(data)
    router.push('/login');
  };

  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.input} {...register('first_name', { required: 'Name is required' })} placeholder="Firstname" />
        {errors.firstname && <span>{errors.firstname.message}</span>}
        <input className={styles.input} {...register('last_name', { required: 'Name is required' })} placeholder="Lastname" />
        {errors.lastname && <span>{errors.lastname.message}</span>}
        <input className={styles.input} {...register('username', { required: 'Name is required' })} placeholder="Username" />
        {errors.username && <span>{errors.username.message}</span>}

        
        <input className={styles.input} {...register('email', { required: 'Email is required' })} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
        
        <input className={styles.input} type="password" {...register('password', { required: 'Password is required' })} placeholder="Password" />
        {errors.password && <span>{errors.password.message}</span>}
        
        <button className={styles.button} type="submit">Register</button>
      </form>
      <p className={styles.link}>
        Already have an account? <a href="" onClick={() => signIn()}>Login</a>
      </p>
    </div>
  );
}
