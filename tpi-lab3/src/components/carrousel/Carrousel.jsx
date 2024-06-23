import{ React} from "react";
import PropTypes from "prop-types";
import { Carousel, Container } from "react-bootstrap";
import Banner from "../banner/Banner";
import { carrouselImages } from "../../data/Data";
import "./carrousel.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";


const Carrousel = ({ listProducts }) => {

const { userType } = useContext(AuthenticationContext);

  return (
    <div>
      <div className="carrousel-container">
        <Carousel interval={4000} >
          {carrouselImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image.imageFileName}
                alt={`Carrousel ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="carrousel-products">
        <Carousel fade interval={2000} data-bs-theme="dark">
          {listProducts.map((product, index) => (
            <Carousel.Item key={index}>
              <a href={`/products/${product.id}`}>
                <img
                  className="d-block w-100"
                  src={product.imageFileName}
                  alt={product.nombre}
                />
              </a>
            </Carousel.Item>
          ))}
        </Carousel>
        </div>
        {userType.role === "user" && ( <Banner/>)}
      </div>
  );
};

Carrousel.propTypes = {
  carrouselImages: PropTypes.array.isRequired,
  listProducts: PropTypes.array.isRequired,
};

export default Carrousel;
