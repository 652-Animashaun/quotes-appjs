"use client"

import ProfilePage from '../ui/user_profile';
import userProfile, { updateUserProfile, getMoreUserQuotes } from '../actions/userProfile';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Page({searchParams}) {
  const [userData, setUserData] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(searchParams?.page) || 1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState(searchParams?.q || "");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  // const { sessionData: session, status } = getSession()
  // console.log("LOADPAGESESSION", session)


  useEffect(() => {
      console.log("Loading state changed:", loading);
    }, [loading]);

  const handleBioUpdate = async (data, action) => {
    console.log("bioUpdate", data, action)
    await updateUserProfile(data, action)
  }

  useEffect(() => {
    const getProfile = async () => {
      console.log("getProfile");
      setLoading(true);
      try {
        const response = await getMoreUserQuotes(query, currentPage);
        if (response) {
          setUserData(response)
        }
      } catch (error) {
        if (error.message === "REDIRECT_TO_LOGIN"){
          router.push('/login');
        } else {
          console.error("Error in fetching data:", error);
        }
      } finally {
        setLoading(false);
      }

    };

    getProfile(); // Call the function to fetch the profile
  }, [query, currentPage]); // Empty dependency array ensures this effect runs only once on mount

  const fetchMore = async (direction: 'next' | 'prev') => {
    try {
      const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
      console.log("direction: ", nextPage)
      const response = await getMoreUserQuotes(query, nextPage);
      setQuotes((prevQuotes) => direction === 'next' ? [...prevQuotes, ...response.quotes] : [...response.quotes, ...prevQuotes]);
      setCurrentPage(nextPage);
      setHasMore(response.links.next != null);
      router.replace(`${pathname}?q=${query}&page=${nextPage}`);
    } catch (error) {
      console.error(`Error fetching ${direction} quotes:`, error);
    }
  };


  // Conditional rendering: Render loading state or the ProfilePage
  return (
    // <ProfilePage userdata={userData} />
    <>
      {userData ? (
        <ProfilePage 
        userdata={userData} 
        updateBio={handleBioUpdate} 
        hasMore={hasMore}
        fetchQuotes={fetchMore}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
