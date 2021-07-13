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
  // const [image, setImage] = useState('');

  // Se puede cambiar este codigo y agregarlo directamnete en la pagina de administradores cuando se crea un nuevo producto, es dicir que cuando se crea directamente ya se genere la url hacia la imagen, asi no es necesario que el usuario espere a dos peticiones. Esto hay que ver bien si funcona luego con el tema de las restricciones a la base de datos o que salte algun problema raro, de momento asi funciona, pero queda pendiente de ver esto

  // useEffect(() => {
  //   const request = async (e) => {
  //     const gsRef = storage.refFromURL(storageBucket);
  //     console.log('gsRef', gsRef);
  //     const url = await gsRef.child(props.imgs[0]).getDownloadURL();
  //     console.log('url', url);
  //     setImage(url);
  //   };
  //   request();
  // }, []);

  const toLinkUrl = window.location.pathname + '/' + props.id; //la url a la que es direccionado al hacer click en el producto
  return (
    <>
      {/* en caso de contener una funcion de callback el componente se mostrara como div y se asigna el callback correspondiente */}
      <CardLink
        as={props.onClickCallback ? 'div' : null}
        onClick={props.onClickCallback ? props.onClickCallback : null}
        to={toLinkUrl}
      >
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
