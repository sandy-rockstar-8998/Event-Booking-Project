import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Navbar1() {
  const [isLoggedIn , setIsLoggedIn] = useState(
    !!localStorage.getItem("username")
  );

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("username"));
    };
    window.addEventListener("storage", checkLogin);
    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container className='m-2 ps-5'>
        <Navbar.Brand as={Link} to="/">Online Event Booking</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" > Home </Nav.Link>  
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <div style={{marginBottom:"20px"}}>
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login">Admin Login</Nav.Link>
            )}     
          </div>       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;