import { useState, useEffect } from 'react';
import { db } from '../components/Firebase';

const useGetProductsCollection = (category) => {
  const [collection, setCollection] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState({ error: false, code: '' });

  useEffect(() => {
    let _isMounted = true;
    const getData = async () => {
      //trae los productos desde la categoria indicada por parametros y los almacena en productsFragment
      let productsFragment = [];
      let productsRequest = '';

      try {
        productsRequest = await db.collection(category).get();

        productsRequest.forEach((product) => {
          //Recorre la data traida y agrega los productos a productsFragment
          productsFragment = [...productsFragment, product.data()];
        });

        if (productsFragment.length === 0) {
          //si el contenido regresado es vacio, erroja un error
          throw { code: 'La categoria deseada no se pudo encontrar' };
        } else if (_isMounted) {
          //actualiza todos los estados como es correspondido
          setCollection(productsFragment);
          setErr({ error: false });
          setIsPending(false);
        }
      } catch (err) {
        console.log(err);
        setErr({ error: true, code: err.code });
        setIsPending(false);
      }
    };
    getData(); //Llama la funcion asincrona

    //Cuando el componente se desmonte, cancela toda actualizacion de estado
    return () => {
      _isMounted = false;
    };
  }, [category]);

  console.log({ collection, isPending, err });

  return { collection, isPending, err };
};

export { useGetProductsCollection };
