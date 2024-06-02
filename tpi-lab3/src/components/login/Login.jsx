import { Button, Col, Form, Row, Card, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from 'react';
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const Login = () => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    exist: false,
    apiError: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthenticationContext);

  const changeEmailHandler = (e) => {
    setErrors({ ...errors, email: false });
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setErrors({ ...errors, password: false });
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      setErrorMsg("Debe completar el campo mail");
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/;
    if (!isValidEmail.test(email)) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      setErrorMsg("Ingresa un correo electrónico válido");
      return;
    };

    if (!password) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      setErrorMsg("Debe completar el campo password");
      return;
    }

    setErrors({ ...errors, exist: false });

    try {
      const response = await fetch('http://localhost:7054/api/Api', {
        method: 'POST',
        headers: {
          'accept':' */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        handleLogin(email);
        navigate('/');
      } else {
        setErrors({ ...errors, apiError: false });
        setErrorMsg("Credenciales incorrectas.");
      }
    } catch (error) {
      setErrors({ ...errors, apiError: false });
      setErrorMsg("Error al conectar con el servidor.");
    }
  };

  return (
    <>
      <Alert show={show}>
        <Card border="primary">
          <Form>
            <h3>INICIE SESIÓN</h3>
            <br />
            <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formPlaintextEmail">
              <Form.Label column sm="12">
                Email
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  type="text"
                  placeholder="Mail"
                  required
                  onChange={changeEmailHandler}
                  ref={emailRef}
                  value={email} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Password
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={changePasswordHandler}
                  value={password}
                  ref={passwordRef} />
              </Col>
            </Form.Group>
          </Form>
          {(errors.email || errors.password) && (
            <div className="mt-1 mb-3">
              <Alert variant="danger">{errorMsg}</Alert>
            </div>
          )}
          <br />
          <Button onClick={loginHandler}>Iniciar sesión</Button>
          <br />
          <a onClick={() => setShow(!true)} href="#">Crea tu cuenta.</a>
        </Card>
      </Alert>

      <Alert show={!show} >
        <Card border="primary">
          <Form>
            <h3>REGISTRESE</h3>
            <br />
            <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formNewName">
              <Form.Label column sm="12">
                Nombre completo
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  type="text"
                  placeholder="Full Name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formNewEmail">
              <Form.Label column sm="12">
                Email
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  type="text"
                  placeholder="Mail" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 d-flex flex-column align-items-center" controlId="formNewPassword">
              <Form.Label column sm="12">
                Password
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  type="password"
                  placeholder="Password" />
              </Col>
            </Form.Group>
          </Form>
          <br />
          <Button onClick={loginHandler}>Crear cuenta</Button>
        </Card>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(!false)}>
            Volver
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default Login;