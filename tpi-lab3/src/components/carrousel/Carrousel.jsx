import React from "react";
import PropTypes from 'prop-types'
import { Carousel } from "react-bootstrap";

const Carrousel = ({ listProducts }) => {
  return (
    <Carousel data-bs-theme="dark">
    {listProducts.map((product, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={product.imageFileName} // Asumiendo que cada producto tiene un campo imageFileName
          alt={product.nombre}
        />
        <Carousel.Caption>
          <h3>{product.nombre}</h3>

        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>

   )
  
};
Carrousel.propTypes = {
  listProducts: PropTypes.array.isRequired
}
export default Carrousel;
