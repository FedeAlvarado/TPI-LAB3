import React, { useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Searcher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []); // Dependencia vacía para que la función se memorice y no se recree en cada render

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      // Si el término de búsqueda está vacío, no hacer nada
      return;
    }

    navigate('/search-results', { state: { searchTerm } });
    setSearchTerm('');
  }, [searchTerm, navigate]); // Se vuelve a crear la función solo si searchTerm o navigate cambian

  return (
    <div className="searcher">
      <Form className="d-flex" onSubmit={handleSearchSubmit}>
        <Form.Control
          type="search"
          placeholder="Buscar por nombre de producto"
          className="me-2 custom-input"
          aria-label="Search"
          htmlSize="35"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="outline-light" type="submit">
          Buscar
        </Button>
      </Form>
    </div>
  );
};

export default Searcher;
