import { React, useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductModal = ({ show, handleClose, createProduct }) => {
    const [product, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        stock: ""
    });

    const handleNewProduct = () => {
        createProduct(product);
        setNewProduct({
            name: "", description: "", price: "",
            image: "", stock: ""
          });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...product,
            [name]: value
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre"
                  name="name"
                  value={product.name}
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Descripcion"
                  name="description"
                  value={product.description} 
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Precio"
                  name="price"
                  value={product.price} 
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formProductImage">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="URL imagen"
                  name="image"
                  value={product.image} 
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Stock"
                  name="stock"
                  value={product.stock} 
                  onChange={handleChange} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" onClick={handleNewProduct}>Confirmar</Button>
          </Modal.Footer>
        </Modal>
      );
};

ProductModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    createProduct: PropTypes.func.isRequired,
};

export default ProductModal;
