import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";
import ProductItem from "../productItem/ProductItem";
import ProductModal from "../productModal/ProductModal";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import Banner from "../banner/Banner";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import "./products.css";
import useCarrito from "../../hooks/useCarrito";

const Products = ({ carts }) => {
  const [productsApi, setProductsApi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  

  const navigate = useNavigate();
  const { userType } = useContext(AuthenticationContext);

  const { showSuccessMessage, addToCart} = useCarrito();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:7054/Product", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (updatedProduct) => {
    try {
      const response = await fetch(
        "http://localhost:7054/Product/updateProduct",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

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
      console.error("Error updating product:", error);
    }
  };

  const createProduct = async (newProduct) => {
    try {
      const response = await fetch(`http://localhost:7054/Product/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        console.log("Producto creado exitosamente");
        alert("Producto creado exitosamente");
        fetchProducts();
        setShowModal(false);
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error("Error creating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:7054/Product/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

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
      console.error("Error deleting product:", error);
    }
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
      {(userType === "admin" || userType === "super") && (
        <Button variant="success" onClick={() => setShowModal(true)}>
          Crear Producto
        </Button>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : productsApi.length > 0 ? (
        <div className="product-grid">
          {productsApi
            .filter((product) =>
              userType === "admin" || userType === "super"
                ? true
                : product.deleteDate === null
            )
            .map((product) => {
              const isDeleted = product.deleteDate !== null;
              return (
                <Container
                  key={product.id}
                  className={`product-container ${
                    isDeleted && (userType === "admin" || userType === "super")
                      ? "deleted-product"
                      : ""
                  }`}
                >
                  {isDeleted &&
                    (userType === "admin" || userType === "super") && (
                      <>
                        <div className="deleted-label">Eliminado</div>
                        <div className="overlay"></div>
                      </>
                    )}

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
                  {showSuccessMessage && (
                    <Alert variant="success" className="fixed-top-right">
                      PRODUCTO AÑADIDO A CARRITO
                    </Alert>
                  )}
                </Container>
              );
            })}
        </div>
      ) : (
        <p>ERROR AL CARGAR LOS DATOS</p>
      )}
      {userType === "user" && <Banner />}
      <br />
      <Button onClick={handleClick}>Volver al inicio</Button>
    </>
  );
};

export default Products;
