import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";

const Products = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar2></Navbar2>
      Products
      <br></br>
      <Button onClick={handleClick}>Volver al inicio</Button>
    </div>
  );
};

export default Products;
