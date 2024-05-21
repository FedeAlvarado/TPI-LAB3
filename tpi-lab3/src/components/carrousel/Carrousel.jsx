import React from "react";
import PropTypes from 'prop-types'
import { Carousel } from "react-bootstrap";

const Carrousel = ({ listProducts }) => {
  <Carousel>
    {/* {listProducts.map((product, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={`images/${product.imageFileName}`} // Asumiendo que cada producto tiene un campo imageFileName
          alt={product.nombre}
        />
        <Carousel.Caption>
          <h3>{product.nombre}</h3>
          <p>{product.descripcion}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))} */}
  </Carousel>

};
Carrousel.PropTypes = {
  listProducts: PropTypes.array
}
export default Carrousel;
