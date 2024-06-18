import React from 'react'
import { Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    
    const handleClick = (e) => {
        e.preventDefault();
    
        const url = e.target.getAttribute('to');
        navigate(url);
      };
      
    return (
        <footer className="footer fixed-bottom w-100">
            
            <Container>
                <p>FerreTotal CUIT: 30-91234567-8 - WWW.FERRETOTAL.COM.AR - Av. Rivadavia 1234 de la Ciudad Autónoma de Buenos Aires. Correo electrónico de servicio de atención al consumidor: info@ferretotal.com.ar</p>
                <p>Defensa de las y los Consumidores. Para reclamos: <a onClick={handleClick} to="/contact" href="#">Ingrese aquí.</a></p>
            </Container>
        </footer>
    )
}

export default Footer