import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Navbar2 from "../navbar/Navbar";
import PropTypes from 'prop-types';

const Cart = ({ listProducts }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(listProducts);

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    
    const updatedProducts = listProducts.map(product => ({
      ...product,
      quantity: product.quantity || 1 // Inicializa la cantidad de cada producto en 1 si aún no está definida
    }));
    setProducts(updatedProducts);
  }, [listProducts]);

  const handleRemove = (id) => {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1); // Elimina el producto en el índice encontrado
      setProducts(updatedProducts);
    }
  };
  

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], quantity: parseInt(quantity, 10) };
    setProducts(updatedProducts); // Actualizar el estado con la copia actualizada del arreglo de productos
  };
  

  const total = products.reduce((acc, product) => acc + (product.precio * product.quantity), 0);

  return (
    <div>
      <Navbar2 />
      <h1>Carrito de Compras</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Precio total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td><img src={product.imageFileName} alt={product.nombre} style={{ width: "100px", height: "100px" }} /></td>
              <td>{product.nombre}</td>
              <td>${product.precio}</td>
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>${product.precio * product.quantity}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(product.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ margin: '20px', textAlign: 'right' }}>
        <p>Total: ${total}</p>
        <Button variant="primary" onClick={() => console.log("Proceder al pago")}>Proceder al pago</Button>
      </div>
      <Button onClick={handleClick}>Volver al inicio</Button>
    </div>
  );
};

Cart.propTypes = {
  listProducts: PropTypes.array
}

export default Cart;
