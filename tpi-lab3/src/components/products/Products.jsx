import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";
import PropTypes from 'prop-types'
import ProductItem from "../productItem/ProductItem";


const Products = ({ listProducts }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar2 />
      {listProducts.length > 0 ? listProducts.map((product) => (
        <ProductItem 
        // key={product.id}
        nombre={product.nombre}
        descripcion={product.descripcion}
        precio={product.precio}
        imageFileName={product.imageFileName}
        />
      ))
       : (<p>ERROR AL CARGAR LOS DATOS</p>
      )}
      
      
      <Button onClick={handleClick}>Volver al inicio</Button>
    </div>
  );
};

Products.propTypes = {
  listProducts: PropTypes.array
}

export default Products;
