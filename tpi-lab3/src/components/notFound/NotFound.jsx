import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TbError404Off } from "react-icons/tb";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <TbError404Off
        style={{ fontSize: "400px"}}
        fluid
      />

      <div style={{ margin: "40px" }}>
        <h2>¡Página no encontrada!</h2>
      </div>

      <Button onClick={handleClick}>Volver al inicio</Button>
    </>
  );
};

export default NotFound;
