import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import ProductItem from '../productItem/ProductItem';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'

const SearchResults = ({carts}) => {
  const location = useLocation();
  const [productosApi, setProductosApi] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { searchTerm } = location.state || '';

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
      const response = await fetch('http://localhost:7054/Product', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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
      console.error('Error al obtener productos:', error);
    }
  };

  const filterProducts = () => {
    const filtered = productosApi.filter(product =>
      product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
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

  return (
    <>
    <h2>Resultados de la búsqueda: {searchTerm}</h2>
    <div className="search-results-page">
      
      <br/>
      {filteredProducts.length > 0 ? (
        <ListGroup>
          {filteredProducts.map((product, index) => (
            <React.Fragment key={index}>
              <ListGroup.Item>
                <ProductItem
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  stock={product.stock}
                  addToCart={addToCart}
                />
              </ListGroup.Item>
              <br />
            </React.Fragment>
          ))}
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
