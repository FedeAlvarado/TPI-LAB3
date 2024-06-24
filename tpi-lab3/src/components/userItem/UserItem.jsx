import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { FcDebt, FcReadingEbook, FcServices } from "react-icons/fc";
import UpdateUser from "../updateUser/UpdateUser";
import { RxValueNone } from "react-icons/rx";
import "./UserItem.css";

const UserItem = ({
  id,
  name,
  email,
  password,
  type,
  lastName,
  onDeleteUser,
  onUpdateUser,
  profile,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleDelete = () => {
    onDeleteUser(id);
    setShowDelete(false);
  };

  let userTypeIcon;
  if (type === "user") {
    userTypeIcon = <FcDebt fontSize={"80px"} />;
  } else if (type === "admin") {
    userTypeIcon = <FcReadingEbook fontSize={"80px"} />;
  } else if (type === "super") {
    userTypeIcon = <FcServices fontSize={"80px"} />;
  } else {
    userTypeIcon = <RxValueNone fontSize={"80px"} />;
  }

  return (
    <div>
      <Card className="user-card">
        <Card.Body>
          <div className="user-icon">{userTypeIcon}</div>
          <div className="user-information">
            <p>
              <strong>Usuario:</strong> {lastName}, {name}
            </p>
            <p>
              <strong>Correo Electronico:</strong> {email}
            </p>
            <p>
              <strong>Contraseña:</strong> {password}
            </p>
            <p>
              <strong>Tipo de usuario:</strong> '{type}'
            </p>
          </div>
        </Card.Body>

        {profile ? null : (
          <>
            <div>
              <Button variant="warning" onClick={() => setShowUpdate(true)}>
                Editar
              </Button>
              <span className="mx-2"></span>
              {(type !== "super") && (
              <Button variant="danger" onClick={() => setShowDelete(true)}>
                Eliminar
              </Button>)}
            </div>
          </>
        )}
      </Card>
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar al {type} - {lastName}, {name}?
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
        user={{ id, name, lastName, email, password, type }}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
};

UserItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["user", "admin", "super"]).isRequired,
  lastName: PropTypes.string.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  profile: PropTypes.bool,
};

export default UserItem;
