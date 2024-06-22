import React from 'react'
import { Container,Row,Col,Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    
    const handleClick = (e) => {
        e.preventDefault();
    
        const url = e.target.getAttribute('to');
        navigate(url);
      };
      
    return (
        <Container fluid className="subscription-banner text-white fixed-bottom w-100">
        <Row className="align-items-center">
          <Col >
            <h2>CUIT: 30-54808315-6 - Nombre comercial: FERRETOTAL - Paysandú 1842 CABA. Correo electrónico de servicio de atención al consumidor: info@ferretotal.com.ar.</h2>
            <p>¡Y enterate las novedades del día!</p>
          </Col>
        </Row>
      </Container>
        
    )
}

export default Footer