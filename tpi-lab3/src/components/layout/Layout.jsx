import React from "react";
import Navbar2 from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {

  return (
    <>
      <Navbar2 />
      <Container style={{ marginTop: '20px', marginBottom: '100px', width: '1280px' }}>
        {children} 
      </Container>
      <Footer />
    </>
  );
};



export default Layout;
