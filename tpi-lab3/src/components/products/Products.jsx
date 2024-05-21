import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";
import { Card } from "react-bootstrap";
import PropTypes from 'prop-types'

const Products = ({ listProducts }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar2 />
      {listProducts.map((product, index) => (
        <Card key={index} style={{ marginBottom: '10px' }}>

          <Card.Body>
            {/* Aquí se muestra la imagen */}
            <img
              src={product.imageFileName}
              alt={product.nombre} // Agrega un atributo alt para accesibilidad
              style={{ maxWidth: '100px', maxHeight: '100px' }} // Establece estilos opcionales para el tamaño de la imagen
            />
            <Card.Title>{product.nombre}</Card.Title>
            <Card.Subtitle>{product.descripcion}</Card.Subtitle>
            <Card.Subtitle>{`$${product.precio}`}</Card.Subtitle>

            <Button
              size="sm"
              style={{ marginTop: '10px' }}>AGREGAR AL CARRITO</Button>
          </Card.Body>
        </Card>
      ))}
      <br />
      <Button onClick={handleClick}>Volver al inicio</Button>
    </div>
  );
};

Products.PropTypes = {
  listProducts: PropTypes.array
}

export default Products;
