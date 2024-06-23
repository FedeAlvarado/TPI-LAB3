import React, { useState, useEffect } from "react";
import UserItem from "../userItem/UserItem";
import { Button, Container } from "react-bootstrap";
import UpdateUser from "../updateUser/UpdateUser";

const Users = () => {
  const [users, setUser] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:7054/User", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log("Se reciben los usuarios de la api");
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error("Error fetching users:", error);
    }
  };

  const createUsers = async (createUser) => {
    try {
      const response = await fetch("http://localhost:7054/User/create", {
        method: "POST",
        headers: {
          accept: " */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUser),
      });

      if (response.ok) {
        console.log("Register new user");
        alert("Usuario registrado exitosamente");
        fetchUsers();
      } else if (response.status == 409) {
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
      console.error("Error creating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:7054/User/delete/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (id, updateUser) => {
    try {
      const response = await fetch("http://localhost:7054/User/updateUser", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowUpdate(true)}>AGREGAR USUARIO</Button>

      {users.length > 0 ? (
        <div className="product-grid">
          {users.map((user, index) => (
            <Container style={{ width: "1280px" }}>
              <UserItem
                key={index}
                id={user.id}
                name={user.name}
                lastName={user.lastName}
                email={user.email}
                password={user.password}
                type={user.type}
                onDeleteUser={deleteUser}
                onUpdateUser={updateUser}
              />
            </Container>
          ))}
        </div>
      ) : (
        <p>USUARIO NO ENCONTRADO</p>
      )}

      <UpdateUser
        show={showUpdate}
        handleClose={() => setShowUpdate(false)}
        user={""}
        onUpdateUser={updateUser}
        onCreateUser={createUsers}
      />
    </div>
  );
};

export default Users;
