import { useState, useEffect } from 'react';
import { db } from '../components/Firebase';

const useGetProductData = (category, productId, pendingDefault) => {
  const [data, setData] = useState(JSON.parse(sessionStorage.getItem(`${category}/${productId}`)));
  const [isPending, setIsPending] = useState(pendingDefault);
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

    if (sessionStorage.getItem(`${category}/${productId}`) === null) {
      getData(category, productId);
    } else {
      setData(JSON.parse(sessionStorage.getItem(`${category}/${productId}`)));
      setErr({ error: false });
      setIsPending(false);
    }

    //cuando el componente se desmonte cancelar todo cambio de estado para evitar memory leak
    return () => {
      _isMounted = false;
    };
  }, []);

  return { data, isPending, err };
};

export default useGetProductData;
