import React, { useState, useEffect } from "react";
import UserItem from '../userItem/UserItem';
import { Button } from 'react-bootstrap';
import UpdateUser from '../updateUser/UpdateUser';

const Users = () => {
  const [users, setUser] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

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

  const createUsers = async (createUser) => {
    try {
      const response = await fetch('http://localhost:7054/User/create', {
        method: 'POST',
        headers: {
          'accept':' */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createUser)
      });
  
      if (response.ok) {
        console.log("Register new user");
        alert("Usuario registrado exitosamente");
        fetchUsers();
      } else if (response.status==409){
        setErrors(true);
        setErrorMsg("El usuario ya se encuentra registrado.");
        return;
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
        return;
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error creating user:', error);
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
    <div>
      <Button onClick={() => setShowUpdate(true)}>AGREGAR USUARIO</Button>
        {users.length > 0 ? (
            users.map((user) => (
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
            
            ))
        ) : (
          <p>NO SE HAN ENCONTRADO USUARIOS</p>
        )}
      
      
      <UpdateUser
        show={showUpdate}
        handleClose={() => setShowUpdate(false)}
        user={""}
        onUpdateUser={updateUser}
        onCreateUser={createUsers}
      />

    </div>
  )
}


export default Users;
