"use client"


import ProfilePage from '../ui/user_profile';
import userProfile from '../actions/userProfile';
import {useState, useEffect } from 'react';

export default function Page () {
  const [data, setData] = useState()


  const getProfile = async () =>{
    console.log("getProfile")
    const response = await userProfile()


    console.log("USERPAGE_RESPONSE", response)
    setData(response)
  }

  useEffect(()=>{
    getProfile()
  }, [])

  return (
    <ProfilePage/>
    )

  
}