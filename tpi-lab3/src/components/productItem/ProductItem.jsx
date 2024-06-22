import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './productItem.css';

const ProductItem = ({ id, name, description, price, image, stock, addToCart, onEditProduct, onDeleteProduct, isLoggedIn = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    id,
    name,
    description,
    price,
    image,
    stock
  });

  const handleAddToCart = () => {
    if (stock > 0) {
      addToCart({ id, name, description, price, image, stock });
    }
  };

  const handleDelete = () => {
    onDeleteProduct(id);
  };

  const handleEdit = () => {
    onEditProduct(updatedProduct);
    setShowModal(false);
  };

  const handleNombreChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, name: e.target.value });
  };

  const handleDescripcionChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, description: e.target.value });
  };

  const handlePrecioChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) });
  };

  const handleImageFileNameChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, image: e.target.value });
  };

  const handleStockChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, stock: parseInt(e.target.value) });
  };

  return (
    <div>
      <Card className="product-card">
        {stock === 0 && <div className="out-of-stock">Sin stock</div>}
        <Card.Img 
          variant="top"
          src={image !== "" ? image : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"}
          className="img-fluid"
          style={{ maxWidth: '100%', objectFit: 'contain', height: '200px' }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{description}</Card.Subtitle>
          <Card.Subtitle>{`$${price}`}</Card.Subtitle>
          <Card.Text>
            <strong>Stock: </strong>{stock}
          </Card.Text>
          <Button size="sm" style={{ marginTop: '10px' }} onClick={handleAddToCart} disabled={stock === 0}>
            AGREGAR AL CARRITO
          </Button>
          {isLoggedIn && (
            <div className="admin-options" style={{ marginTop: '10px' }}>
              <Button 
                variant="primary" 
                size="sm" 
                style={{ marginRight: '5px' }}
                onClick={() => setShowModal(true)}>
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>Eliminar</Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedProduct.name} 
                onChange={handleNombreChange} 
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedProduct.description} 
                onChange={handleDescripcionChange} 
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control 
                type="number" 
                value={updatedProduct.price} 
                onChange={handlePrecioChange} 
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedProduct.image} 
                onChange={handleImageFileNameChange} 
              />
            </Form.Group>
            <Form.Group controlId="formProductStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control 
                type="number" 
                value={updatedProduct.stock} 
                onChange={handleStockChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleEdit}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  onEditProduct: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ProductItem;
