import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UpdateUser = ({ show, handleClose, user, onUpdateUser, onCreateUser }) => {
    const navigate = useNavigate();
    const isNewUser = !user || !user.id;
    const [formData, setFormData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        password: user?.password || '',
        type: user?.type || '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                type: user.type,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isNewUser) {
            const newUser = {
                name: formData.name,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                type: formData.type,
            };
            onCreateUser(newUser);
            setFormData({
                id: "", name: "", lastName: "",
                email: "", password: "", type: ""
            });
        } else {
            onUpdateUser(user.id, formData);
            handleClose();
            if (user.id === formData.id && formData.type !== 'super') {
                
                navigate('/');
                return;
            }
        }

        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isNewUser ? 'Crear Usuario' : 'Actualizar Usuario'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Ingrese el nombre"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Ingrese el apellido"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Ingrese el e-mail"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Ingrese la contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                        <Form.Label>Rol de usuario: </Form.Label>
                        <Form.Control 
                            as="select"
                            type="text"
                            name="type"
                            placeholder="Ingrese el rol"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="super">Super</option>
                        </Form.Control>
                    </Form.Group>
                    <span className="mx-2"></span>
                    <div className="d-grid gap-2">
                        <Button variant="success" type="submit">
                            {isNewUser ? 'Crear' : 'Actualizar'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

UpdateUser.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        type: PropTypes.string,
    }),
    onUpdateUser: PropTypes.func.isRequired,
    onCreateUser: PropTypes.func.isRequired,
};

UpdateUser.defaultProps = {
    user: {},
};

export default UpdateUser;

