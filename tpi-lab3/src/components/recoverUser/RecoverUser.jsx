import React, { useState, useRef } from 'react';
import { Button, Col, Form, Row, Alert } from 'react-bootstrap';

const RecoverUser = () => {
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const emailRef = useRef(null);

  const isValidEmail = /\S+@\S+\.\S+/;

  const recoverHandler = (e) => {
    e.preventDefault();

    if (!isValidEmail.test(email)) {
      setErrorMsg("Ingresa un correo electrónico válido");
      emailRef.current.focus();
      return;
    }

    // Aquí iría la lógica para enviar el correo de recuperación
    // Supongamos que se ha enviado exitosamente
    console.log("Recover user");
    setShowSuccessMessage(true);

    setEmail("");
  };

  return (
    <Form>
      <h3>RECUPERA TU USUARIO</h3>
      <br />
      <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formPlaintextEmail">
        <Form.Label column sm="12">
          Email
        </Form.Label>
        <Col sm="12">
          <Form.Control
            type="text"
            placeholder="Ingrese su e-mail"
            required
            onChange={changeEmailHandler}
            value={email}
            ref={emailRef} />
        </Col>
      </Form.Group>

      {(errorMsg && !showSuccessMessage) && (
        <div className="mt-1 mb-3">
          <Alert variant="danger">{errorMsg}</Alert>
        </div>
      )}

      {showSuccessMessage && (
        <div className="mt-1 mb-3">
          <Alert variant="success">El correo de recuperación ha sido enviado exitosamente.</Alert>
        </div>
      )}

      <Button onClick={recoverHandler}>Recuperar</Button>
    </Form>
  );
};

export default RecoverUser;
