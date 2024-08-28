"use client";

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"




export default function NavBar() {
  const { data: session, status } = useSession();
  


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            {/*<NavDropdown title="Menu" id="basic-nav-dropdown">
              {session ? (
                <>
                  <NavDropdown.Item href="#">
                    {session.user.username}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => signOut()}>
                    Sign out
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={() => signIn()}>
                    Sign in
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href="/register" passHref>
                      <span className="text-gray-700">Register</span>
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>*/}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
