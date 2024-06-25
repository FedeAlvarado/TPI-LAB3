import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";
import PropTypes from "prop-types";
import { BsCartX } from "react-icons/bs";
import "./cart.css";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import Banner from "../banner/Banner";
import { Modal } from "react-bootstrap";

const Cart = ({ cart, setCart }) => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const { userType } = useContext(AuthenticationContext);

  const handleClickExplore = () => {
    navigate("/products");
  };

  const handleClickHome = () => {
    navigate("/");
  };

  const handleRemove = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const handleQuantityChange = (id, e) => {
    const quantity = isNaN(parseInt(e.target.value))
      ? 1
      : parseInt(e.target.value);
    const product = cart.find((product) => product.id === id);

    if (quantity < 1) {
      e.target.value = 1;
      return;
    }

    if (quantity > product.stock) {
      alert("No puedes agregar más de este producto al carrito.");
      e.target.value = product.stock;
      return;
    }

    setCart(
      cart.map((product) =>
        product.id === id ? { ...product, quantity: quantity } : product
      )
    );
  };

  const handleProceedToPayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:7054/Product/updateProducts",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );

      if (response.ok) {
        console.log("Productos actualizados exitosamente");
        setShowModal(true);
        setCart([]);
        navigate("/");
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error("Error updating products:", error);
    }
  };

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <>
      <Navbar2 />
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <BsCartX style={{ fontSize: "10rem", marginBottom: "10px" }} fluid />
          <div style={{ margin: "40px" }}>
            <h3>Tu carrito está vacío.</h3>
            <p>¡Explora nuestro catálogo!</p>
          </div>
          <Button variant="primary" onClick={handleClickExplore}>
            Explorar productos
          </Button>
        </div>
      ) : (
        <>
          <Table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id} className="cart-row">
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "15px",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <input
                      type="number"
                      value={product.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(product.id, e)}
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td>${product.price * product.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(product.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ margin: "10px", textAlign: "right" }}>
          <p>Total: ${total}</p>
          </div>
          <div style={{ margin: "20px", textAlign: "right" }}>
            <Button variant="primary" onClick={handleProceedToPayment}>
              Proceder al pago
            </Button>
          </div>
        </>
      )}
      <div
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "10px" }}
      >
        <Button variant="secondary" onClick={handleClickHome}>
          Volver al inicio
        </Button>
      </div>
      <div>{userType === "user" && <Banner />}</div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>Su pedido fue registrado exitosamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Cart;
