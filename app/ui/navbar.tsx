"use client";

import { Navbar, Nav, Container } from 'react-bootstrap';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react'; // For toggling search bar and dropdown

export default function NavBar() {
  const { data: session, status } = useSession();
  const [showSearch, setShowSearch] = useState(false); // State to toggle search bar visibility
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  // Function to toggle dropdown when user icon is clicked
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <Navbar bg="gradient-to-r from-gray-200 to-gray-400" expand="lg" className="relative h-20">
      <Container className="flex justify-center items-center relative">

        {/* Centered Brand */}
        <div className="absolute left-0 right-0 mx-auto text-center">
          <Navbar.Brand href="#" className="text-3xl text-red-500 font-bold">
            MyApp
          </Navbar.Brand>
        </div>

        {/* Right-Aligned Links */}
        <div className="ml-auto mr-10 mt-5 flex items-center space-x-4 relative">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="flex items-center space-x-4">
            <Nav className="flex items-center space-x-4">

              {/* Profile Icon Dropdown */}
              <div className="relative text-sm font-bold">
                <div onClick={toggleDropdown} className="cursor-pointer">
                  <UserCircleIcon className="h-8 w-8 text-blue-700" /> {/* Profile icon */}
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 border-2 border-blue-500 bg-gradient-to-r from-gray-200 to-gray-400 rounded-2xl shadow-md p-2 z-50">
                    {/* Show login options if the user is not signed in */}
                    {!session ? (
                      <>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <div className="block px-2 py-2 cursor-pointer" onClick={() => signIn()}>
                          Sign in
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Show user's email and sign out option when signed in */}
                        <Nav.Link href="/" className='ml-3'>Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <div className="block px-3 py-2">{session.user?.email}</div>
                        <div className="block px-3 py-2 cursor-pointer" onClick={() => signOut()}>
                          Sign out
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Search Icon */}
              <Nav.Link href="#search" onClick={() => setShowSearch(!showSearch)}>
                <MagnifyingGlassIcon className="h-8 w-8 text-blue-700 cursor-pointer" /> {/* Search Icon */}
              </Nav.Link>

              {/* Search Input Field (Toggles based on search icon click) */}
              {showSearch && (
                <div className="relative ml-4">
                  <input
                    type="text"
                    placeholder="SEARCH"
                    className="pl-10 pr-4 py-2 w-64 text-black bg-white rounded-full border-0 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               border-transparent transition-all duration-300"
                    style={{
                      borderImage: 'linear-gradient(to right, #00f2ea, #003cff) 1',
                    }}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-2 h-6 w-6 text-blue-600" />
                </div>
              )}

            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
