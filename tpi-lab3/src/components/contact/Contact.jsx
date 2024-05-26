import { React, useState } from "react";
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Navbar2 from "../navbar/Navbar";


const Contact = () => {
  const navigate = useNavigate();
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredLandline, setEnteredLandline] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');
  const [enteredSubject, setEnteredSubject] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [enteredProvince, setEnteredProvince] = useState('');
  const [enteredComment, setEnteredComment] = useState('');

  const handleChangeName = (e) => setEnteredName(e.target.value);
  const handleChangeEmail = (e) => setEnteredEmail(e.target.value);
  const handleChangePhone = (e) => setEnteredPhone(e.target.value);
  const handleChangeLandline = (e) => setEnteredLandline(e.target.value);
  const handleChangeAddress = (e) => setEnteredAddress(e.target.value);
  const handleChangeSubject = (e) => setEnteredSubject(e.target.value);
  const handleChangeCity = (e) => setEnteredCity(e.target.value);
  const handleChangeProvince = (e) => setEnteredProvince(e.target.value);
  const handleChangeComment = (e) => setEnteredComment(e.target.value);

  const handleReturn = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      landline: enteredLandline,
      address: enteredAddress,
      subject: enteredSubject,
      city: enteredCity,
      province: enteredProvince,
      comment: enteredComment
    };
    console.log('Form Values:', formValues);

    //TODO: Hacer fetch a la api endpoint consulta

    setEnteredName('');
    setEnteredEmail('');
    setEnteredPhone('');
    setEnteredLandline('');
    setEnteredAddress('');
    setEnteredSubject('');
    setEnteredCity('');
    setEnteredProvince('');
    setEnteredComment('');
  };

  return (
    <div>
      <Navbar2></Navbar2>
      <Card border="primary">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre y apellido</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre y apellido"
                value={enteredName}
                onChange={handleChangeName}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={enteredEmail}
                onChange={handleChangeEmail}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Celular"
                value={enteredPhone}
                onChange={handleChangePhone}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLandline">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="landline"
                placeholder="Teléfono"
                value={enteredLandline}
                onChange={handleChangeLandline}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Dirección"
                value={enteredAddress}
                onChange={handleChangeAddress}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSubject">
              <Form.Label>Asunto</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                placeholder="Asunto"
                value={enteredSubject}
                onChange={handleChangeSubject}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Ciudad"
                value={enteredCity}
                onChange={handleChangeCity}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridProvince">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                name="province"
                placeholder="Provincia"
                value={enteredProvince}
                onChange={handleChangeProvince}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridComment">
              <Form.Label>Comentarios</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                rows={5}
                placeholder="Comentarios"
                value={enteredComment}
                onChange={handleChangeComment}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">Submit</Button>{' '}
          <Button onClick={handleReturn}>Volver al inicio</Button>
        </Form>
      </Card>
    </div>


  );
};

export default Contact;