import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductItem = ({ id, nombre, descripcion, precio, imageFileName, stock, addToCart, onEditProduct, onDeleteProduct, isLoggedIn = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    id,
    nombre,
    descripcion,
    precio,
    imageFileName,
    stock
  });

  const handleAddToCart = () => {
    addToCart({ id, nombre, descripcion, precio, imageFileName, stock });
  };

  const handleDelete = () => {
    onDeleteProduct(id);
  };

  const handleEdit = () => {
    onEditProduct(id, updatedProduct);
    setShowModal(false);
  };

  const handleNombreChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, nombre: e.target.value });
  };

  const handleDescripcionChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, descripcion: e.target.value });
  };

  const handlePrecioChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, precio: parseFloat(e.target.value) });
  };

  const handleImageFileNameChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, imageFileName: e.target.value });
  };

  const handleStockChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, stock: parseInt(e.target.value) });
  };

  return (
    <div>
      <Card>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <Card.Img 
            src={imageFileName !== "" ? imageFileName : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"}
            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }}
            className="img-fluid"
          />
        </div>
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Subtitle>{descripcion}</Card.Subtitle>
          <Card.Subtitle>{`$${precio}`}</Card.Subtitle>
          <Card.Subtitle>Cantidad disponible:{stock}</Card.Subtitle>
          <Button size="sm" style={{ marginTop: '10px' }} onClick={handleAddToCart}>AGREGAR AL CARRITO</Button>
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
                value={updatedProduct.nombre} 
                onChange={handleNombreChange} 
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedProduct.descripcion} 
                onChange={handleDescripcionChange} 
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control 
                type="number" 
                value={updatedProduct.precio} 
                onChange={handlePrecioChange} 
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedProduct.imageFileName} 
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
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  imageFileName: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  onEditProduct: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ProductItem;
