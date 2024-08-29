"use client"

import ProfilePage from '../ui/user_profile';
import userProfile from '../actions/userProfile';
import { useState, useEffect } from 'react';

export default function Page() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      console.log("getProfile");
      try {
        const user = await userProfile();
        if (user) {
          setUserData(user);
          console.log("USER FETCHED", user.id, user.bio);
        }
      } catch (error) {
        console.error("USER DATA PAGE FETCH ERROR", error);
      }
    };

    getProfile(); // Call the function to fetch the profile
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Conditional rendering: Render loading state or the ProfilePage
  return (
    <>
      {userData ? (
        <ProfilePage userdata={userData} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
