"use client";

import { Navbar, Nav, Container } from 'react-bootstrap';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { UserCircleIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function NavBar() {
  const { data: session, status } = useSession();
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Navbar expand="lg" className="relative border-3 h-20 bg-transparent">
      <Container className="flex justify-between items-center px-4 py-4 lg:px-8 lg:py-0 min-h-[5rem]">
        
        {/* Brand */}
        <Navbar.Brand 
          href="#" 
          className="text-2xl lg:text-3xl text-gray-800 font-bold absolute lg:relative left-4 lg:left-auto lg:mx-auto lg:text-center"
        >
          Afroquotes
        </Navbar.Brand>

        {/* Desktop Navigation */}
        <Navbar.Collapse id="basic-navbar-nav" className="hidden lg:flex flex-grow mt-3 lg:flex-grow-0 flex justify-end items-center space-x-4">
          <Nav className="flex items-center space-x-4">

            {/* Profile Icon Dropdown */}
            <div className="relative text-sm font-bold">
              <div onClick={toggleDropdown} className="cursor-pointer">
                <UserCircleIcon className="h-8 w-8 text-blue-600" />
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 border-2 border-gray-500 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl shadow-md p-5 z-50">
                  {!session ? (
                    <>
                      <Nav.Link href="/" className='ml-3'>Home</Nav.Link>
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
              <MagnifyingGlassIcon className="h-8 w-8 text-blue-600 cursor-pointer" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Hamburger Icon for Mobile - Positioned on the Far Right */}
        <div className="lg:hidden absolute right-4 cursor-pointer" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-8 w-8 text-red-600" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-gray-800" />
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black shadow-lg flex flex-col items-start py-4 z-50 lg:hidden">
            <Nav.Link href="#search" onClick={() => setShowSearch(!showSearch)} className="mb-3 flex items-center w-full px-4">
              <MagnifyingGlassIcon className="h-8 w-8 text-white" />
              <span className="ml-2 text-white">Search</span> {/* Optional: Add label for clarity */}
            </Nav.Link>

            <div onClick={toggleDropdown} className="cursor-pointer mb-3 flex items-center w-full px-4">
              <UserCircleIcon className="h-8 w-8 text-white" />
              <span className="ml-2 text-white">Profile</span> {/* Optional: Add label for clarity */}
            </div>

            {showDropdown && (
              <div className="bg-black text-white rounded-lg border-2 border-gray-500 shadow-md p-4 w-full px-4">
                {!session ? (
                  <>
                    <Nav.Link href="/" className='ml-3'>Home</Nav.Link>
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
        )}

        {/* Search Input - Rendered in a visible area */}
        {showSearch && (
          <div className="fixed top-16 right-4 w-full max-w-sm bg-white rounded-full shadow-md z-50 lg:w-64">
            <input
              type="text"
              placeholder="SEARCH"
              className="pl-10 pr-4 py-2 w-full text-black bg-white rounded-full border-0 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300"
              style={{
                borderImage: 'linear-gradient(to right, #00f2ea, #003cff) 1',
              }}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2 h-6 w-6 text-blue-600" />
          </div>
        )}
      </Container>
    </Navbar>
  );
}
