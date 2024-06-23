import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import './Banner.css'; // Asegúrate de crear e importar el archivo CSS

const Banner = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del email
  };

  return (
    <Container fluid className="subscription-banner text-white w-100">
      <Row className="align-items-center">
        <Col md={6}>
          <h2>RECIBÍ LAS MEJORES OFERTAS</h2>
          <p>¡Y enterate las novedades del día!</p>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" variant="success">SUSCRIBIME</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
