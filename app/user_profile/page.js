"use client"

import ProfilePage from '../ui/user_profile';
import userProfile, { updateUserProfile } from '../actions/userProfile';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const handleBioUpdate = async (bio) => {
    console.log("bioUpdate", bio)
    await updateUserProfile(bio, "bio")
  }



  useEffect(() => {
    const getProfile = async () => {
      console.log("getProfile");
      try {
        const user = await userProfile();
        if (user) {
          setUserData(user)
        }
      } catch (error) {
        if (error.message === "REDIRECT_TO_LOGIN"){
          router.push('/login');
        } else {
          console.error("Error in fetching data:", error);
        }
      }

    };

    getProfile(); // Call the function to fetch the profile
  }, [router]); // Empty dependency array ensures this effect runs only once on mount

  // Conditional rendering: Render loading state or the ProfilePage
  return (
    // <ProfilePage userdata={userData} />
    <>
      {userData ? (
        <ProfilePage userdata={userData} updateBio={handleBioUpdate} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
