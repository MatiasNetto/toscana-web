import { Link } from 'react-router-dom';
import styled from 'styled-components';

/*################*/
/*#### STYLES ####*/
/*################*/

const CardLink = styled(Link)`
  height: 40vh;
  width: 97%;
  position: relative;
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

const Sticker = styled.div`
  height: 10vw;
  width: 10vw;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 100%;
  border: 2px dashed #000;
  color: #000;
  box-shadow: 3px 5px 8px #000a;
  transform: rotate(-25deg);
  padding: 24px;
`;

const New = styled.div`
  width: 13vw;
  height: 5vw;
  position: absolute;
  top: 10px;
  left: 8px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7d249;
  border-radius: 3px;
  font-size: 0.7em;
  font-weight: 600;
  letter-spacing: 1px;
  color: #000;
  box-shadow: -3px 5px 8px #0005;
`;

const Trending = styled.div`
  width: 29vw;
  height: 5vw;
  position: absolute;
  top: 10px;
  left: 8px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #a95cc3;
  border-radius: 3px;
  font-size: 0.7em;
  font-weight: 600;
  letter-spacing: 1px;
  color: #000;
  box-shadow: -3px 5px 8px #0005;
`;

const OutOfStock = styled.div`
  width: 100%;
  height: 75%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OutOfStockText = styled.p`
  padding: 3px 5px;
  font-size: 2em;
  color: #fff;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
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
        <Image
          style={props.outOfStock === true ? { filter: 'saturate(0%) brightness(80%)' } : {}}
          image={props.imgsURL[0]}
          alt=""
        />

        {/* MODIFIERS */}
        {/* OUT OF STOCK */}
        {props.outOfStock === true && (
          <OutOfStock>
            <OutOfStockText>AGOTADO</OutOfStockText>
          </OutOfStock>
        )}

        {/* NEW */}
        {props.new === true && <New>NEW!</New>}

        {/* TRENDING */}
        {props.trending === true && <Trending>MAS VENDIDO!</Trending>}
        {/* <Sticker>NEW</Sticker> */}

        <ProductInfo>
          <Model>{props.model}</Model>
          <Price>${props.price}</Price>
        </ProductInfo>
      </CardLink>
    </>
  );
};

export default ProductCard;
