import React, { useState, useEffect, useContext } from "react";
import { ListGroup, Alert, Container } from "react-bootstrap";
import ProductItem from "../productItem/ProductItem";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const SearchResults = ({ carts }) => {
  const location = useLocation();
  const [productosApi, setProductosApi] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { searchTerm } = location.state || "";
  const { userType } = useContext(AuthenticationContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm && productosApi.length > 0) {
      filterProducts();
    }
  }, [searchTerm, productosApi]);

  const fetchProducts = async () => {
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
        setProductosApi(data);
        console.log("Productos recibidos de la API:", data);
      } else {
        console.error(`Error al obtener productos: ${response.status}`);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const editProduct = async (updatedProduct) => {
    try {
      const response = await fetch("http://localhost:7054/Product/updateProduct", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:7054/Product/delete/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
      console.error("Error deleting product:", error);
    }
  };

  const filterProducts = () => {
    const filtered = productosApi.filter(
      (product) =>
        product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (userType === "admin" || userType === "super"
          ? true
          : product.deleteDate === null)
    );
    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    carts((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          return prevCart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        } else {
          alert("No puedes agregar más de este producto al carrito.");
          return prevCart;
        }
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <h2>Resultados de la búsqueda: {searchTerm}</h2>
      <div className="search-results-page">
        <br />
        {filteredProducts.length > 0 ? (
          <ListGroup>
            {filteredProducts.map((product) => 
              {
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
                </Container>
              );
            }
            )}
          </ListGroup>
        ) : (
          <p>No se encontraron resultados. Intente nuevamente.</p>
        )}
      </div>
    </>
  );
};

SearchResults.propTypes = {
  carts: PropTypes.func.isRequired,
};

export default SearchResults;
