import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";

const Contact = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      Contact
      <br></br>
      <Button onClick={handleClick}>Volver al inicio</Button>
    </div>
  );
};

export default Contact;
