import React from "react";
import UserItem from "../userItem/UserItem";
import { useState } from "react";
import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const Profile = () => {
  const { userObject, handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [showOut, setShowOut] = useState(false);

  const handleOut = () => {
    setShowOut(false);
    navigate("/");
    handleLogout();
  };

  return (
    <>
      <UserItem
        id={userObject.id}
        name={userObject.name}
        lastName={userObject.lastName}
        email={userObject.email}
        password={userObject.password}
        type={userObject.type}
        profile={true}
      />
      <br />
      <div className="d-grid gap-2">
        <Button variant="danger" onClick={() => setShowOut(true)} to="/">
          Cerrar sesión
        </Button>
      </div>

      <Modal show={showOut} onHide={() => setShowOut(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOut(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleOut}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
