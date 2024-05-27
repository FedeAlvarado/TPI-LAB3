import React from "react";
import Navbar2 from "../navbar/Navbar";
import Carrousel from "../carrousel/Carrousel";
import PropTypes from 'prop-types'

const Layout = ({listProducts}) => {

const Layout = ({children}) => {
  return (
    <>
      <Navbar2></Navbar2>

      <div >{children}
      {/* <Carrousel listProducts={listProducts}>HOLA</Carrousel> */}
        </div> 
{/* VALIDAR CON USESTATE PARA QUE SE MODIFIQUE EL HIJO ---- OTRA OPCION ES BAJAR EL NAVBAR */}
      {/* FOOTER */}
      
    </>
  );
};

Layout.propTypes = {
  listProducts: PropTypes.array.isRequired
}

export default Layout;
