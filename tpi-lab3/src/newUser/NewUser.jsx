import React, { useState, useRef } from 'react';
import { Button, Col, Form, Row, Card, Alert } from 'react-bootstrap';

const NewUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    emailExists: false,
  });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const changeFirstNameHandler = (e) => {
    setErrors({ ...errors, firstName: false });
    setFirstName(e.target.value);
  };

  const changeLastNameHandler = (e) => {
    setErrors({ ...errors, lastName: false });
    setLastName(e.target.value);
  };

  const changeEmailHandler = (e) => {
    setErrors({ ...errors, email: false, emailExists: false });
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setErrors({ ...errors, password: false });
    setPassword(e.target.value);
  };

  const changeConfirmPasswordHandler = (e) => {
    setErrors({ ...errors, confirmPassword: false });
    setConfirmPassword(e.target.value);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!firstName) {
      setErrors({ ...errors, firstName: true });
      setErrorMsg("Debe completar el campo nombre");
      firstNameRef.current.focus();
      return;
    }

    if (!lastName) {
      setErrors({ ...errors, lastName: true });
      setErrorMsg("Debe completar el campo apellido");
      lastNameRef.current.focus();
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/;
    if (!isValidEmail.test(email)) {
      setErrors({ ...errors, email: true });
      setErrorMsg("Ingrese un correo electrónico válido");
      emailRef.current.focus();
      return;
    }

    if (!password) {
      setErrors({ ...errors, password: true });
      setErrorMsg("Debe completar el campo contraseña");
      passwordRef.current.focus();
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: true });
      setErrorMsg("Las contraseñas no coinciden");
      confirmPasswordRef.current.focus();
      setConfirmPassword("");
      return;
    }

    try {
      // Implementar registracion
      console.log("Register new user");

    } catch (error) {
      setErrorMsg("Error al conectar con el servidor.");
    }
  };

  return (
    <Form>
      <h3>CREA TU CUENTA</h3>
      <br />
      <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formPlaintextFirstName">
        <Form.Label column sm="12">
          Nombre
        </Form.Label>
        <Col sm="12">
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            required
            onChange={changeFirstNameHandler}
            value={firstName}
            ref={firstNameRef} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formPlaintextLastName">
        <Form.Label column sm="12">
          Apellido
        </Form.Label>
        <Col sm="12">
          <Form.Control
            type="text"
            placeholder="Ingrese su apellido"
            required
            onChange={changeLastNameHandler}
            value={lastName}
            ref={lastNameRef} />
        </Col>
      </Form.Group>

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

      <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
          Contraseña
        </Form.Label>
        <Col sm="12">
          <Form.Control
            type="password"
            placeholder="Ingrese una contraseña"
            required
            onChange={changePasswordHandler}
            value={password}
            ref={passwordRef} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formPlaintextConfirmPassword">
        <Form.Label column sm="12">
          Repetir Contraseña
        </Form.Label>
        <Col sm="12">
          <Form.Control
            type="password"
            placeholder="Repetir contraseña"
            required
            onChange={changeConfirmPasswordHandler}
            value={confirmPassword}
            ref={confirmPasswordRef} />
        </Col>
      </Form.Group>

      {(errors.firstName || errors.lastName || errors.email || errors.password || errors.confirmPassword || errors.emailExists) && (
        <div className="mt-1 mb-3">
          <Alert variant="danger">{errorMsg}</Alert>
        </div>
      )}
      <br />
      <Button onClick={registerHandler}>Registrarse</Button>
    </Form>
  );
};

export default NewUser;
