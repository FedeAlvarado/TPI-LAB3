import React from 'react'
import { Card,Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ProductItem = ({nombre,descripcion,precio,imageFileName}) => {
  return (
    <div>
        <Card>
            <Card.Img 
            src={imageFileName !== "" ? imageFileName : "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"}
            style={{maxWidth: '100px', maxHeight: '100px'}}
            />
            <Card.Body>
            <Card.Title>{nombre}</Card.Title>
            <Card.Subtitle>{descripcion}</Card.Subtitle>
            <Card.Subtitle>{`$${precio}`}</Card.Subtitle>
            <Button
              size="sm"
              style={{ marginTop: '10px' }}>AGREGAR AL CARRITO</Button>
            </Card.Body>
        </Card>
    </div>
  )
};

ProductItem.propTypes = {
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    precio: PropTypes.number,
    imageFileName: PropTypes.string
};

export default ProductItem