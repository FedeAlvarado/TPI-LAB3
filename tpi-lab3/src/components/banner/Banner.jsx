import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import './banner.css';

const Banner = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [buttonText, setButtonText] = useState('SUSCRIBIRME');
  const [buttonVariant, setButtonVariant] = useState('success');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setButtonText('¡SUSCRIBIDO!');
    setButtonVariant('primary');
    setEmail(''); 

    setTimeout(() => {
      setShowAlert(false);
      setButtonText('SUSCRIBIRME');
      setButtonVariant('success');
    }, 3000);
  };

  return (
    <Container fluid className="subscription-banner text-white w-100">
      <Row className="align-items-center">
        <Col md={6}>
          <h2>RECIBÍ LAS MEJORES OFERTAS</h2>
          <p>¡Y entérate de las novedades del día!</p>
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
              <Button type="submit" variant={buttonVariant}>
                {buttonText}
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
