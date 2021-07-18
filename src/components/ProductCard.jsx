import { Link } from 'react-router-dom';
import styled from 'styled-components';

/*################*/
/*#### STYLES ####*/
/*################*/

const CardLink = styled(Link)`
  height: 40vh;
  width: 97%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2% 0;
  background-color: whitesmoke;
  box-shadow: 0px 3px 4px #0003;
  border-radius: 10px;
  text-decoration: none;
  overflow: hidden;
`;

const Image = styled.div`
  height: 75%;
  width: 100%;
  background: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const ProductInfo = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Model = styled.h3`
  text-align: center;
`;

const Price = styled.p``;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const ProductCard = (props) => {
  // const toLinkUrl = '/' + 'category/' + props.category + '/' + props.id; //la url a la que es direccionado al hacer click en el producto
  const toLinkUrl = `/category/${props.category}/${props.id}`;
  return (
    <>
      <CardLink
        as={props.customClick === true ? 'div' : Link}
        onClick={props.customClick ? props.onClickCallback : null}
        to={toLinkUrl}
      >
        {/* agregar loading en cada imagen, se crea un componente con la animacion de carga y con styledComponents localmente lo posicionas en el centro de la imagen */}
        <Image image={props.imgsURL[0]} alt="" />
        <ProductInfo>
          <Model>{props.model}</Model>
          <Price>${props.price}</Price>
        </ProductInfo>
      </CardLink>
    </>
  );
};

export default ProductCard;
