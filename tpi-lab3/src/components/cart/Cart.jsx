import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../navbar/Navbar';
import PropTypes from 'prop-types';
import { BsCartX } from "react-icons/bs";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleClickExplore = () => {
    navigate('/products');
  };

  const handleClickHome = () => {
    navigate('/dashboard');
  };

  const handleRemove = (id) => {

  };

  const handleQuantityChange = (id, quantity) => {
  }

  const handleProceedToPayment = async () => {
    try {
      const response = await fetch('http://localhost:7054/Product/updateProducts', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart),
      });

      if (response.ok) {
        console.log("Productos actualizados exitosamente");
        alert("Su pedido fue registrado exitosamente");
        navigate('/dashboard');
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error updating products:', error);
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <BsCartX style={{ fontSize: '3rem', marginBottom: '10px' }}/>
          <h3>Tu carrito está vacío.</h3>
          <p>¡Explora nuestro catálogo!</p>
          <Button variant="primary" onClick={handleClickExplore}>Explorar productos</Button>
        </div>
      ) : (
        <>
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
              {cart.map(product => (
                <tr key={product.id}>
                  <td><img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} /></td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>${product.price * product.quantity}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemove(product.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ margin: '20px', textAlign: 'right' }}>
            <Button variant="primary" onClick={handleProceedToPayment}>Proceder al pago</Button>
          </div>
        </>
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="secondary" onClick={handleClickHome}>Volver al inicio</Button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default Cart;
