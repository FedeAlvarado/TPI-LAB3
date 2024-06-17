import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";
import PropTypes from 'prop-types'
import ProductItem from "../productItem/ProductItem";
import { listProduct } from "../../data/Data";

const Products = ({ isLoggedIn }) => {
  const [products, setProducts] = useState(listProduct);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const editProduct = (id, updatedProduct) => {
    setProducts(prevProducts => prevProducts.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  return (
    <div>
      <Navbar2 />
      {products.length > 0 ? products.map((product) => (
        <ProductItem 
          key={product.id}
          id={product.id}
          nombre={product.nombre}
          descripcion={product.descripcion}
          precio={product.precio}
          imageFileName={product.imageFileName}
          isLoggedIn={isLoggedIn}
          onEditProduct={editProduct}
          onDeleteProduct={deleteProduct}
        />
      )) : (<p>ERROR AL CARGAR LOS DATOS</p>)}
      
      <Button onClick={handleClick}>Volver al inicio</Button>
    </div>
  );
};

Products.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Products;
