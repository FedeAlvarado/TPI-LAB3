import React from 'react'
import { Button } from 'react-bootstrap'
import { FcConferenceCall, FcRules } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthenticationContext } from '../../services/authentication/authentication.context';



const Superadmin = () => {
  const navigate = useNavigate();
  const { userType } = useContext(AuthenticationContext);


  return (
    <div className="d-grid gap-2">
      {userType === "super" && (
        <Button variant="danger" size="lg" onClick={() => navigate('/users')}>
        <FcConferenceCall fontSize={"100px"} />
        {" "}
        Administrar Usuarios
      </Button>)}

      <Button variant="danger" size="lg" onClick={() => navigate('/products')}>
        <FcRules fontSize={'100px'} />
        {' '}
        Adminsitrar Productos
      </Button>
    </div>
  )
}

export default Superadmin