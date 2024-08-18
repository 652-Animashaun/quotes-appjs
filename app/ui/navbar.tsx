"use client"

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => signIn()} className="text-gray-700">
                Sign in
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/register" passHref>
                  <span className="text-gray-700">Register</span>
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
