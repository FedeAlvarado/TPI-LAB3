import { Button, Col, Form, Row, Card, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from 'react';
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import NewUser from '../newUser/NewUser';
import RecoverUser from '../recoverUser/RecoverUser';

const Login = () => {
  const [formType, setFormType] = useState("login");
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
      const response = await fetch('http://localhost:7054/User/validate', {
        method: 'POST',
        headers: {
          'accept': ' */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        handleLogin(data, email, data.type);
        navigate('/');
      } else {
        setErrors({ ...errors, apiError: true });
        setErrorMsg("Credenciales incorrectas.");
        return;
      }
    } catch (error) {
      setErrors({ ...errors, apiError: true });
      setErrorMsg("Error al conectar con el servidor.");
      return;
    }
  };

  const cleanForm = () => {
    setEmail("");
    setPassword("");
    setErrors({
      email: false,
      password: false,
      exist: false,
      apiError: false,
    });
  };

  return (
    <>
      <Alert show={true}>
        <Card border="primary">
          {formType === "login" && (
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

              {(errors.email || errors.password || errors.apiError) && (
                <div className="mt-1 mb-3">
                  <Alert variant="danger">{errorMsg}</Alert>
                </div>
              )}
              <br />
              <br />
              <Button onClick={loginHandler}>Iniciar sesión</Button>
              <br />
              <br />
              <a onClick={() => { setFormType("register"); cleanForm(); }} href="#">Crea tu cuenta</a>
              <br />
              <br />
              <a onClick={() => { setFormType("recover"); cleanForm(); }} href="#">Recuperar usuario</a>
            </Form>

          )}

          {formType === "register" && (
            <>
              <NewUser setForm={setFormType} />
              <br />
              <a onClick={() => setFormType("login")} href="#">Volver a iniciar sesión</a>
            </>
          )}

          {formType === "recover" && (
            <>
              <RecoverUser />
              <br />
              <a onClick={() => setFormType("login")} href="#">Volver a iniciar sesión</a>
            </>
          )}
        </Card>
      </Alert>
    </>
  );
};

export default Login;
