import { useState } from 'react'
import React from 'react'
import { Button, Card,Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import UpdateUser from '../updateUser/UpdateUser';

const UserItem = ({ id, firstName, email, password, role, lastName, onDeleteUser,onUpdateUser }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  // const navigate = useNavigate();

  const handleDelete = () => {
    onDeleteUser(id);
    setShowDelete(false);
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Usuario: {lastName}, {firstName}</Card.Title>
          <Card.Title>Correo Electronico: {email}</Card.Title>
          <Card.Title>Contraseña: {password}</Card.Title>
          <Card.Subtitle>Tipo de usuario: '{role}'</Card.Subtitle>

        </Card.Body>
        <Button size='lg' variant='warning' onClick={() => setShowUpdate(true)}>EDITAR</Button>
        <span className="mx-2"></span> 
        <Button size='lg' variant='danger' onClick={() => setShowDelete(true)}>ELIMINAR</Button>
      </Card>
      <Modal show={showDelete} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar al {role} - {lastName}, {firstName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <UpdateUser
        show={showUpdate}
        handleClose={() => setShowUpdate(false)}
        user={{ id, firstName, lastName, email, password, role }}
        onUpdateUser={onUpdateUser}
      />

    </div>
  )
};

UserItem.PropTypes = {
  firstName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDeleteUser: PropTypes.func.isRequired
};

export default UserItem