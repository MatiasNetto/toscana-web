import { useState, useEffect } from 'react';
import { db } from '../components/Firebase';

const useGetProductData = (category, productId, admin) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState({ error: false });

  useEffect(() => {
    let _isMounted = true;
    const getData = async (category, proudctId) => {
      //trae los datos del producto solicitado
      try {
        //realiza la peticion del producto
        const request = await db.collection(category).doc(proudctId).get();

        if (request.data() === undefined) {
          //en caso de que la peticion sea vacia tira un error
          throw { code: 'Producto no encontrado' };
        } else if (_isMounted) {
          //si la peticion se realizo con exito se setea el estado con la data
          setData(request.data());
          setErr({ error: false });
          setIsPending(false);
        }
      } catch (err) {
        //en caso de ocurrir un error es actualizado el estado con los datos del error
        console.log(err);
        setErr({ error: true, code: err.code });
        setIsPending(false);
      }
    };

    if (admin && _isMounted) {
      //habilitar el acceso a admin en caso de que admin sea pasado como true
      getData(category, productId);
    } else if (category !== 'admin' && _isMounted && data === null) {
      //habilitar el acceso a todos las colecciones excepto a admin
      console.log('Hace la request');
      getData(category, productId);
    } else if (category === 'admin' && _isMounted) {
      //lanzar un error en caso de que no sea admin y solicite la infomacion de admin
      setIsPending(false);
      setErr({ error: true, code: 'No tienes el permiso para acceder a esta categoria' });
    }

    //cuando el componente se desmonte cancelar todo cambio de estado para evitar memory leak
    return () => {
      _isMounted = false;
    };
  }, []);

  return { data, isPending, err };
};

export default useGetProductData;
