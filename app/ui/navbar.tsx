"use client";

import { Navbar, Nav, Container } from 'react-bootstrap';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react'; // For toggling search bar and dropdown

export default function NavBar() {
  const { data: session } = useSession();
  const [showSearch, setShowSearch] = useState(false); // State to toggle search bar visibility
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const [isNavOpen, setIsNavOpen] = useState(false); // State to toggle hamburger dropdown visibility

  // Function to toggle dropdown when user icon is clicked
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  
  // Function to toggle hamburger menu
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <Navbar bg="gradient-to-r from-gray-200 to-gray-400" expand="lg" className="relative h-20">
      <Container className="flex justify-between items-center relative">

        {/* Centered Brand */}
        <div className="text-center mx-auto">
          <Navbar.Brand href="#" className="text-3xl text-red-500 font-bold">
            MyApp
          </Navbar.Brand>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden flex items-center">
          <button 
            className="navbar-toggler border-0 focus:outline-none" 
            onClick={toggleNav}
          >
            <div className="space-y-1">
              <div className="w-8 h-1 bg-black"></div>
              <div className="w-8 h-1 bg-black"></div>
              <div className="w-8 h-1 bg-black"></div>
            </div>
          </button>
        </div>

        {/* Right-Aligned Links */}
        <div className="hidden lg:flex ml-auto mr-10 mt-5 space-x-4 relative">
          <Nav className="flex items-center space-x-4">

            {/* Profile Icon Dropdown */}
            <div className="relative text-sm font-bold">
              <div onClick={toggleDropdown} className="cursor-pointer flex items-center">
                <UserCircleIcon className="h-8 w-8 text-blue-700" /> {/* Profile icon */}
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 border-2 border-blue-500 bg-gradient-to-r from-gray-200 to-gray-400 rounded-2xl shadow-md p-2 z-50">
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
        </div>
      </Container>

      {/* Dropdown Menu for Mobile */}
      {isNavOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-gradient-to-r from-gray-200 to-gray-400 shadow-md p-4 z-50">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <div className="block px-2 py-2 cursor-pointer" onClick={() => signIn()}>
            Sign in
          </div>
          <div className="text-right mt-2">
            <button onClick={toggleNav} className="text-gray-500 hover:text-red-500">
              Close
            </button>
          </div>
        </div>
      )}
    </Navbar>
  );
}
