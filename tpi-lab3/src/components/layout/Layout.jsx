import React from "react";
import Navbar2 from "../navbar/Navbar";

const Layout = ({children}) => {
  return (
    <>
      <Navbar2></Navbar2>

      <div >{children}
        </div> 
{/* VALIDAR CON USESTATE PARA QUE SE MODIFIQUE EL HIJO ---- OTRA OPCION ES BAJAR EL NAVBAR */}
      {/* FOOTER */}
      
    </>
  );
};

export default Layout;
