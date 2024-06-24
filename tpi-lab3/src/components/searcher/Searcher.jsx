import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Searcher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      // Si el término de búsqueda está vacío, no hacer nada
      return;
    }

    navigate('/search-results', { state: { searchTerm } });
  };

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
