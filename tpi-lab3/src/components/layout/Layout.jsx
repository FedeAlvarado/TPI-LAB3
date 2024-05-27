import React from "react";
import Navbar2 from "../navbar/Navbar";
import Carrousel from "../carrousel/Carrousel";
import PropTypes from 'prop-types'

const Layout = ({listProducts}) => {

  return (
    <>
      <Navbar2></Navbar2>

      <div>Layout</div>
      <Carrousel listProducts={listProducts}>HOLA</Carrousel>
    </>
  );
};

Layout.propTypes = {
  listProducts: PropTypes.array.isRequired
}

export default Layout;
