import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <>
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </BootstrapSpinner>
    </>
  );
};

export default LoadingSpinner;
