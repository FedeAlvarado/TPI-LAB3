import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";
import PropTypes from 'prop-types';
import ProductItem from "../productItem/ProductItem";
import ProductModal from "../productModal/ProductModal";
import './products.css';
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Container } from "react-bootstrap";
import Banner from "../banner/Banner";

const Products = ({ carts }) => {
  const [productsApi, setProductsApi] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { userType } = useContext(AuthenticationContext);


  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:7054/Product', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProductsApi(data);
        console.log("Se reciben los productos de la api");
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error fetching products:', error);
    }
  };

  const editProduct = async (updatedProduct) => {
    try {
      const response = await fetch('http://localhost:7054/Product/updateProduct', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        console.log("Producto actualizado exitosamente");
        alert("Producto actualizado exitosamente");
        fetchProducts();
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error updating product:', error);
    }
  };

  const createProduct = async (newProduct) => {
    try {
      const response = await fetch(`http://localhost:7054/Product/create`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        console.log("Producto creado exitosamente");
        alert("Producto creado exitosamente");
        fetchProducts();
        setShowModal(false);
        return;
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error creating product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:7054/Product/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log("Producto eliminado exitosamente");
        alert("Producto eliminado exitosamente");
        fetchProducts();
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error deleting product:', error);
    }
  };

  const addToCart = (product) => {
    carts(prevCart => {
      const existingProduct = prevCart.find(p => p.id === product.id);
      if (existingProduct) {
        return prevCart.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar2 />
      <ProductModal
        show={showModal}
        handleClose={handleCloseModal}
        createProduct={createProduct}
      />
      {(userType.role === "admin" || userType.role === "super") && (<Button variant="success" onClick={() => setShowModal(true)}>Crear Producto</Button>
    )}
      {productsApi.length > 0 ? (
        <div className="product-grid">
          {productsApi.map((product) => (
            <Container style={{ width: '1280px' }}>
              <ProductItem
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                stock={product.stock}
                onEditProduct={editProduct}
                onDeleteProduct={deleteProduct}
                addToCart={addToCart} 
              />
            </Container>
          ))}
        </div>
      ) : (
        <p>ERROR AL CARGAR LOS DATOS</p>
      )}
      {userType.role === "user" && ( <Banner/>)}
      {/* <Button onClick={handleClick}>Volver al inicio</Button> */}
    </>
  );
  
};

Products.propTypes = {
  carts: PropTypes.func.isRequired,
};

export default Products;
