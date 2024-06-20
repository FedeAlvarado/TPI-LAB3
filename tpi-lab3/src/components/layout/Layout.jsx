import React from "react";
import Navbar2 from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {

  return (
    <>
      <Navbar2 />
      {children}
      <Footer />
    </>
  );
};



export default Layout;
