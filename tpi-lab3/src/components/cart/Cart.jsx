import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";

const Cart = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar2></Navbar2>
      Cart
      <br></br>
      <Button onClick={handleClick}>Volver al inicio</Button>
    </div>
  );

};

export default Cart;
