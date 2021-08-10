import React from 'react';
import styled from 'styled-components';

//assets
import arosImage from '../assets/categorys/Aros.jpeg';
import anillosImage from '../assets/categorys/Anillo.png';
import collaresImage from '../assets/categorys/Collar.jpeg';
import pulserasImage from '../assets/categorys/Pulsera.jpeg';
import relojesImage from '../assets/categorys/Reloj.jpeg';

//components
import CategoryCard from '../components/CategoryCard';

/*################*/
/*#### STYLES ####*/
/*################*/
import { colorBrown, desktopMediaQuery, Subtittle } from '../components/Styles';
import HomePageSlider from '../components/HomePageSlider';

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;

  ${desktopMediaQuery} {
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 10vh;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Article = styled.article`
  font-size: ${({ size }) => (size ? size : `1.1em`)};
  padding: 10px 5vw;
  text-align: ${({ align }) => align};
`;

const Li1 = styled.ul`
  position: relative;
  margin-top: 30px;
  margin-left: 10px;
  list-style: none;

  &:before {
    content: '';
    height: 0.4em;
    width: 0.4em;
    top: 0.4em;
    left: -0.7em;
    background: #000;
    /* border-radius: 100%; */

    position: absolute;
  }
`;

const Li2 = styled.li`
  position: relative;
  margin-left: 30px;
  list-style: none;
  margin-top: 10px;

  &:before {
    content: '';
    height: 0.4em;
    width: 0.4em;
    top: 0.4em;
    left: -0.7em;
    background: #000;
    border-radius: 100%;

    position: absolute;
  }
`;

const Li2Numbered = styled.li`
  position: relative;
  margin-left: 30px;
  list-style: none;
  margin-top: 10px;

  &:before {
    content: ${(props) => JSON.stringify(props.number)};
    top: 0em;
    left: -1em;
    background: transparent;

    position: absolute;
  }
`;

const Li3 = styled.li`
  position: relative;
  margin-left: 40px;
  list-style: none;
  margin-top: 10px;

  &:before {
    content: '';
    height: 0.1em;
    width: 0.4em;
    top: 0.55em;
    left: -0.7em;
    background: #000;
    /* border-radius: 100%; */

    position: absolute;
  }
`;

const ArticleTittle = styled.p`
  display: inline;
  font-size: 1.5em;
  margin-bottom: 30px;
  /* border-bottom: 2px solid #000; */
  text-decoration: underline;
  text-decoration-thickness: 2px;
`;

const Table = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 20px 0;
`;

const Th = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1em;
  font-weight: 200;
  border: 1px solid #000;
  /* padding: 0 10px; */
`;

const Hr = styled.hr`
  width: 90%;
  color: ${colorBrown};
  background: ${colorBrown};
  margin: 25px 0 0px 0;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

function HomePage() {
  return (
    <>
      <HomePageSlider />
      <div id="products">
        <Subtittle>Categorias</Subtittle>
        <Categories>
          {/* <CategoryCard text="Test Category" category="testcategory" img={testImage} align="left" /> */}
          <CategoryCard text="Anillos" category="anillos" img={anillosImage} align="left" />
          <CategoryCard text="Aros" category="aros" img={arosImage} align="right" />
          <CategoryCard text="Pulseras" category="pulseras" img={pulserasImage} align="left" />
          <CategoryCard text="Collares" category="collares" img={collaresImage} align="right" />
          <CategoryCard text="Relojes" category="relojes" img={relojesImage} align="right" />
        </Categories>

        <Hr id="nosotros" />

        <Section>
          <Subtittle>NOSOTROS</Subtittle>
          <Article align="center">
            <p>
              Toscana Accesorios es el resultado del sueño de dos hermanos que buscaban ayudar a su familia e
              independizarse. En 2019, yo Giuliana, le propuse esta atrevida idea de comenzar con este proyecto a Nacho,
              mi hermano y co-fundador.
            </p>
            <br />
            <p>
              Desde el primer momento, pusimos manos a la obra, y establecimos nuestro objetivo principal: hacer llegar
              accesorios de diseño y excelentísima calidad (para cualquier tipo de piel) a todos, con un precio
              sumamente accesible.
            </p>
            <br />
            <p>
              Comenzamos con un círculo de venta entre nuestros conocidos, y poco a poco, con muchísimo esfuerzo,
              dedicación, tropezones y alegrías ¡Comenzamos a expandirnos!, por eso hoy les decimos:
            </p>
            <br />
            <h3>¡BIENVENIDOS A NUESTRA PAGINA WEB!</h3>
          </Article>

          <Hr id="materiales" />

          <Article align="left">
            <Subtittle size="1.8em">MATERIALES</Subtittle>
            <br />
            <p>Todos nuestros productos están hechos de: </p>
            <Li1>
              Acero quirurgo 316L, un material:
              <Li2>Hipoalergénico (por lo que no produce ningún tipo de alergia a la piel).</Li2>
              <Li2>No se oscurece.</Li2>
              <Li2>No se oxida.</Li2>
              <Li2>Es sumamente resistente y perdurable.</Li2>
            </Li1>
            <Li1>
              Acero quirúrgico blanco, un material:
              <Li2>Hipoalergénico (por lo que no produce ningún tipo de alergia a la piel)</Li2>
              <Li2>No se oxida</Li2>
              <Li2>
                Son de acero quirúrgico con baño en plata (y níquel o cobre para lograr adherir la plata al acero)
              </Li2>
              <Li2>
                Ya que es un baño, el color blanco puede irse yendo con el uso (dejando ver el color del acero
                quirúrgico) <strong>si no se lo cuida apropiadamente</strong>, por eso te recomendamos PARA CONSERVAR SU
                BIRLLO Y COLOR POR MAS TIEMPO:
                <ul>
                  <Li3>
                    No exponerlo a cremas, agua oxigenada, productos de limpieza, agua con cloro, alcohol en gel, etc.{' '}
                  </Li3>
                </ul>
              </Li2>
              <Li2>
                Al guardarlos te recomendarnos ponerlos en una bolsita de plástico, un alhajero, etc para que
                <ul>
                  <Li3>No se rayen.</Li3>
                  <Li3>No se ensucien, ya que es posible que se le adhieran residuos. </Li3>
                </ul>
              </Li2>
              <Li2>En el caso de que tu joya no la hayas guardado podes limpiarla con ¡un simple paño!</Li2>
            </Li1>
            <p style={{ marginTop: '15px' }}>¡Muchísimas gracias!</p>
          </Article>

          <Hr id="politica-de-cambio" />

          <Article>
            <Subtittle size="1.5em">POLITICA DE CAMBIO</Subtittle>
            <p>
              Los accesorios tienen un periodo de cambio de 15 días posteriores a la comprar, por todo defecto o vicio
              previo a la entrega del mismo y que afecte la identidad del producto.
            </p>
            <br />
            <p>
              <strong style={{ textDecoration: 'underline', textDecorationThickness: '2px', marginBottom: '0' }}>
                No se realizan cambios
              </strong>{' '}
              por cualquier defecto o vicio producto de:
            </p>
            <Li2>Su uso indebido, incorrecto o inoportuno.</Li2>
            <Li2>
              No seguir las recomendaciones para su cuidado (debidamente consignadas en la presente página, en el
              apartado “Materiales”)
            </Li2>
            <Li2>
              Cualquier otro daño o desperfecto ostensible, que no concurría al momento de la entrega del producto,
              tales como ralladuras, manchas, roturas, etc.{' '}
            </Li2>
            <p style={{ marginTop: '15px' }}>¡Muchísimas gracias!</p>
          </Article>

          <Hr id="medi-tu-anillo" />

          <Article>
            <Subtittle size="1.6em">MEDI TU ANILLO</Subtittle>
            <br />
            <p>¿Querés comprarte un anillo, pero no sabes cuál es tu medida? </p>
            <p>Toscana Accesorios te muestra la mejor forma para saberlo, ¡en 3 simples pasos!</p>
            <br />
            <ArticleTittle>Paso 1</ArticleTittle>
            <p>
              Toma un anillo tuyo, el más circular posible (ya que el material es maleable y todos los anillos suelen
              alterar su forma circular y toman la de nuestro dedo por el uso constante) y un regla o centímetro que
              encuentres.
            </p>
            <br />
            <ArticleTittle>Paso 2</ArticleTittle>
            <p>
              Medí con tu regla o centímetro el diámetro (circulo interno) de tu anillo justo por el medio y anota los
              centímetros.
            </p>
            <br />
            <ArticleTittle>Paso 3</ArticleTittle>
            <p>Coteja los centímetros de tu anillo con la siguiente tabla y listo, tenes tu medida de anillo:</p>
            <Table>
              <Th>1,5 CM</Th>
              <Th>1,6 CM</Th>
              <Th>1,7 CM</Th>
              <Th>1,8 CM</Th>
              <Th>1,9 CM</Th>
              <Th>2,0 CM</Th>
              <Th>NRO. 15</Th>
              <Th>NRO. 16</Th>
              <Th>NRO. 17</Th>
              <Th>NRO. 18</Th>
              <Th>NRO. 19</Th>
              <Th>NRO. 20</Th>
              <Th>NRO. 5</Th>
              <Th>NRO. 6</Th>
              <Th>NRO. 7</Th>
              <Th>NRO. 8</Th>
              <Th>NRO. 9</Th>
              <Th>NRO. 10</Th>
            </Table>
            <p>
              <strong>ACLARACION: </strong>Siempre tené en cuenta que hay anillos con hormas más grandes, otros con
              horma más chicas; algunos son regulable y otros que no lo son, por lo que la medida puede variar según el
              anillo y el dedo en que quiera usarse
            </p>
            <p style={{ marginTop: '15px' }}>¡Muchísimas gracias!</p>
          </Article>

          <Hr id="como-comprar" />

          <Article>
            <Subtittle size="1.6em">COMO COMPRAR</Subtittle>
            <br />
            <p>¡Te contamos como comprar en nuestra página! </p>
            <Li2Numbered number="1.">
              Vas al menú principal de la izquierda, en el apartado que dice “Productos” y haciendo “click” en ella, te
              va a aparecer en pantalla todas las categorías de productos: anillos, pulseras, collares, aros y relojes.
            </Li2Numbered>
            <Li2Numbered number="2.">
              Seleccionando en cualquiera de las categorías que te interese, te va a aparecer todos los modelos de dicha
              categoría y su valor (consignando los más nuevos, más comprados, aquellos en stock y aquellos que no)
            </Li2Numbered>
            <Li2Numbered number="3.">
              Si algún accesorios (o algunos) te intereso y deseas adquirirlo, selecciona sobre él, y te va a aparecer
              un botón en verde que consigna “Comprar”, al apretarlo te va a llevar instantáneamente a nuestro Whatsapp,
              donde vas a por hacernos cualquier tipo de consulta, y por donde coordinaremos la entrega y los medios de
              pago!
            </Li2Numbered>
            <p style={{ marginTop: '15px' }}>¡Muchísimas gracias!</p>
          </Article>

          <Hr id="envios-y-entregas" />

          <Article>
            <Subtittle size="1.3em">ENVIOS Y ENTREGAS</Subtittle>
            <br />
            <p>En Toscana accesorios realizamos: </p>
            <Li1>Envíos a TODO EL PAIS, utilizando:</Li1>
            <Li2>
              Moto mensajería UNICAMENTE para aquellas zonas adyacentes o aledañas a Avellaneda, prov. De Buenos Aires.{' '}
            </Li2>
            <Li2>
              Correo argentino A SUCURSAL (excepto que el cliente en específico solicite que se envié a su domicilio), a
              CUALQUIER localidad, en cualquier provincia de Argentina.
            </Li2>
            <Li1>Entregas GRATUITAS en los siguientes puntos de encuentro: </Li1>
            <Li2>Plaza Alsina. Localidad: Avellaneda, prov. Bs As. Dirección: Av. Mitre altura 700.</Li2>
            <Li2>
              Shopping Alto Avellaneda. Localidad: Avellaneda/Crucecita, prov. Bs As. Dirección: Gral. Güemes 897.
            </Li2>
            <Li2>Av. Mitre 3.300 (Supermercado Coto). Localidad: Sarandí, prov. Bs As. Dirección: Av. Mitre 3.300</Li2>
            <Li2>Parque dominico. Localidad: Villa Dominico, prov. Bs As. Dirección: Av. Mitre 4.700.</Li2>
            <p style={{ marginTop: '15px' }}>¡Muchísimas gracias!</p>
          </Article>
        </Section>
        <footer>footer</footer>
      </div>
    </>
  );
}

export default HomePage;
