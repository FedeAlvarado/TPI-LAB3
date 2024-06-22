import React from "react";
import PropTypes from 'prop-types'
import { Carousel } from "react-bootstrap";
import Banner from "../banner/Banner";

const Carrousel = ({ listProducts }) => {

  return (
    <div>
      <Carousel fade interval={2000} data-bs-theme="dark">
    {listProducts.map((product, index) => (
      <Carousel.Item key={index}>
          <a href={`/products/${product.id}`}>
            <img
              className="d-block w-100"
              src={product.imageFileName}
              alt={product.nombre}
            />
          </a>
      </Carousel.Item>
    ))}; 
  </Carousel>
  <Banner/>
    </div>
    
   )
};
Carrousel.propTypes = {
  listProducts: PropTypes.array.isRequired
}
export default Carrousel;
