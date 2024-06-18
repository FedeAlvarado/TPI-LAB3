import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ProductItem from '../productItem/ProductItem';

const SearchResults = () => {
  const location = useLocation();
  const { filteredProducts } = location.state || { filteredProducts: [] };

  return (
    <div className="search-results-page">
      <h2>Resultados de la Búsqueda</h2>
      {filteredProducts.length > 0 ? (
        <ListGroup>
          {filteredProducts.map((product, index) => (
            <React.Fragment key={index}>
              <ListGroup.Item>
                <ProductItem
                  id={product.id}
                  nombre={product.nombre}
                  descripcion={product.descripcion}
                  precio={product.precio}
                  imageFileName={product.imageFileName}
                  stock={product.stock}
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
  );
};

export default SearchResults;