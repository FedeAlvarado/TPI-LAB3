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
    <TbError404Off fontSize={"500px"} fluid/>

      <div>
        <h1>Not found</h1>
        </div>

      <Button onClick={handleClick}>Volver al inicio</Button>
    </>
  );
};

export default NotFound;