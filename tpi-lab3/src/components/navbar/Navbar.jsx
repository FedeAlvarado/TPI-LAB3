import React, { useState, useContext } from 'react';
import { Offcanvas, Navbar, Nav, Modal, Container, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { FaTools, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Searcher from "../searcher/Searcher";
import './NavBar.css';
import Banner from '../banner/Banner';

const Navbar2 = ({ listProduct }) => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showOut, setShowOut] = useState(false);

  const { userType, logged, handleLogout } = useContext(AuthenticationContext);

  const handleClick = (e) => {
    e.preventDefault();
    const url = e.currentTarget.getAttribute('to');
    setShowOffcanvas(false);
    navigate(url);
  };

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleOut = () => {
    handleLogout();
    setShowOut(false);
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} bg="primary" data-bs-theme="dark" className="fixed-top w-100">
          <Container fluid>
            <Button variant="link" onClick={handleClick} to="/dashboard" className="d-flex align-items-center text-white" style={{ fontFamily: 'Arial', fontSize: '140%', textDecoration: 'none' }}>
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

                  {logged ? (
                      <Nav.Link className='nav-link' onClick={() => setShowOut(true)}>Log-out</Nav.Link>
                    ) : (
                      <Nav.Link className='nav-link' onClick={handleClick} to="/login">Log-in</Nav.Link>
                    )}

                    <Nav.Link className='nav-link' onClick={handleClick} to="/dashboard">Inicio</Nav.Link>
                    <Nav.Link className='nav-link' onClick={handleClick} to="/products">Productos</Nav.Link>
                    <Nav.Link className='nav-link' onClick={handleClick} to="/cart">Carrito</Nav.Link>
                    <Nav.Link className='nav-link' onClick={handleClick} to="/contact">Contacto</Nav.Link>
                    <Nav.Link className='nav-link' onClick={handleClick} to="/contact">Log-out</Nav.Link>
                    {userType === "admin" && (
                      <Nav.Link className='nav-adm' style={{ color: 'red', fontWeight: 'bold', padding: '10px' }} onClick={handleClick} to="/superadmin">Administradores</Nav.Link>
                    )}

                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Container>
        </Navbar>
      ))}

      <Modal show={showOut} onHide={() => setShowOut(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cerrar sesión?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOut(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleOut}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar2;
