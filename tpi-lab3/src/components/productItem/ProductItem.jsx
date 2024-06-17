import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductItem = ({ id, nombre, descripcion, precio, imageFileName, isLoggedIn, onEditProduct, onDeleteProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ nombre, descripcion, precio, imageFileName });

  const handleDelete = () => {
    onDeleteProduct(id);
  };

  const handleEdit = () => {
    onEditProduct(id, updatedProduct);
    setShowModal(false);
  };

  return (
    <div>
      <Card>
        <Card.Img 
          src={imageFileName !== "" ? imageFileName : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"}
          style={{maxWidth: '100px', maxHeight: '100px'}}
        />
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Subtitle>{descripcion}</Card.Subtitle>
          <Card.Subtitle>{`$${precio}`}</Card.Subtitle>
          <Button
            size="sm"
            style={{ marginTop: '10px' }}>AGREGAR AL CARRITO</Button>
          {isLoggedIn && (
            <div className="admin-options" style={{ marginTop: '10px' }}>
              <Button 
                variant="primary" 
                size="sm" 
                style={{ marginRight: '5px' }}
                onClick={() => setShowModal(true)}
              >
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
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, nombre: e.target.value })} 
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedProduct.descripcion} 
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, descripcion: e.target.value })} 
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control 
                type="number" 
                value={updatedProduct.precio} 
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, precio: parseFloat(e.target.value) })} 
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedProduct.imageFileName} 
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageFileName: e.target.value })} 
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
  )
};

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  imageFileName: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onEditProduct: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};

export default ProductItem;