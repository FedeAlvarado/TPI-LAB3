import{ React, useState, useEffect} from "react";
import { Carousel } from "react-bootstrap";
import Banner from "../banner/Banner";
import { carrouselImages } from "../../data/Data";
import "./carrousel.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";


const Carrousel = () => {
  const [productsApi, setProductsApi] = useState([]);

  const { userType } = useContext(AuthenticationContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:7054/Product', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setProductsApi(data);
        console.log("Se reciben los productos de la api");
      } else {
        setErrors(true);
        setErrorMsg(`Error: ${response.status}`);
      }
    } catch (error) {
      setErrors(true);
      setErrorMsg("Error al conectar con el servidor.");
      console.error('Error fetching products:', error);
    }
  };

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
          {productsApi.map((product, index) => (
            <Carousel.Item key={index}>
              <a href={`/products`}>
                <img
                  className="d-block w-100"
                  src={product.image}
                  alt={product.nombre}
                />
              </a>
            </Carousel.Item>
          ))}
        </Carousel>
        </div>
        {userType !== "admin" || userType !== "super" && ( <Banner/>)}
      </div>
  );
};

export default Carrousel;
