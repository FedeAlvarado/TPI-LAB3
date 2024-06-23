import React, { useState, useEffect } from "react";
import UserItem from '../userItem/UserItem';
import { Button, Container, Row, Col } from 'react-bootstrap';
import NewUser from '../newUser/NewUser';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:7054/User', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        console.log("Usuarios recibidos de la API");
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error al obtener usuarios:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:7054/User/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log("Usuario eliminado exitosamente");
        alert("Usuario eliminado exitosamente");
        fetchUsers();
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error al eliminar usuario:', error);
    }
  };

  const updateUser = async (id, updateUser) => {
    try {
      const response = await fetch('http://localhost:7054/User/updateUser', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUser),
      });

      if (response.ok) {
        console.log("Usuario actualizado exitosamente");
        alert("Usuario actualizado exitosamente");
        fetchUsers();
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error al actualizar usuario:', error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await fetch('http://localhost:7054/User/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("Usuario registrado exitosamente");
        alert("Usuario registrado exitosamente");
        setShowNewUserForm(false);
        fetchUsers();
      } else if (response.status === 409) {
        setErrorMsg("El usuario ya se encuentra registrado.");
      } else {
        setErrorMsg("No se pudo registrar el usuario.");
      }
    } catch (error) {
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error al agregar usuario:', error);
    }
  };

  return (
    <div className="users-container">
      <div className="d-grid gap-2 mb-3">
        <Button variant="success" size="lg" onClick={() => setShowNewUserForm(!showNewUserForm)}>
          AGREGAR USUARIO
        </Button>
      </div>

      {showNewUserForm ? (
        <NewUser setForm={setShowNewUserForm} onAddUser={addUser} />
      ) : (
        users.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-5">
            {users.map((user, index) => (
              <Col key={index}>
                <UserItem
                  id={user.id}
                  name={user.name}
                  lastName={user.lastName}
                  email={user.email}
                  password={user.password}
                  type={user.type}
                  onDeleteUser={deleteUser}
                  onUpdateUser={updateUser}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p>NO SE HAN ENCONTRADO USUARIOS</p>
        )
      )}

      {errors && <div className="alert alert-danger">{errorMsg}</div>}
    </div>
  );
};

export default Users;
