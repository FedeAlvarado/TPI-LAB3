import React, { useState, useContext } from 'react';
import { Offcanvas, Navbar, Nav, Form, Container, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { FaTools, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Searcher from "../searcher/Searcher";



const Navbar2 = ({ listProduct }) => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const url = e.currentTarget.getAttribute('to');
    setShowOffcanvas(false);
    navigate(url);
  };

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);

  };

  const { userType } = useContext(AuthenticationContext);


  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} bg="primary" data-bs-theme="dark" className="fixed-top w-100">
          <Container fluid>
          <Button variant="link" onClick={handleClick} to="/dashboard" className="d-flex align-items-center text-white">
              <FaTools fontSize={"28px"} className="me-2" /> Ferretotal
            </Button>
            <Searcher products={listProduct} />

            <div className="navdiv d-flex align-items-center">
              <FaUserCircle onClick={handleClick} to={"/login"} fontSize={"28px"} style={{ color: 'white' }} />
              <FaShoppingCart onClick={handleClick} to={"/cart"} fontSize={"28px"} style={{ color: 'white' }} />

              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleOffcanvasToggle} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                show={showOffcanvas}
                onHide={() => setShowOffcanvas(false)}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link onClick={handleClick} to="/dashboard">Inicio</Nav.Link>
                    <Nav.Link onClick={handleClick} to="/login">Log-in</Nav.Link>
                    <Nav.Link onClick={handleClick} to="/products">Productos</Nav.Link>
                    <Nav.Link onClick={handleClick} to="/cart">Carrito</Nav.Link>
                    <Nav.Link onClick={handleClick} to="/contact">Contacto</Nav.Link>
                    {/* {userType === "superadmin" &&  (<Nav.Link onClick={handleClick} to="/superadmin">Administradores</Nav.Link>)} */}
                    <Nav.Link onClick={handleClick} to="/superadmin">Administradores</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Navbar2;
