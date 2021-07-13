import { useState, useEffect } from 'react';
import { db } from '../components/Firebase';

const useGetProductsCollection = (category) => {
  const [products, setProducts] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

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

        //setea el state products como productsFragment para no andar actualizando todo el tiempo el state, previene memory leack
        if (_isMounted) {
          setProducts(productsFragment);
          setError({ error: false });
          setIsPending(false);
        }
      } catch (err) {
        console.log(err);
        setError({ error: true, code: err.code });
        setIsPending(false);
      }
    };
    getData(); //Llama la funcion asincrona

    //Cuando el componente se desmonte, cancela toda actualizacion de estado
    return () => {
      _isMounted = false;
    };
  }, [category]);

  console.log('data');
  console.log({ products, isPending, error });

  return { products, isPending, error };
};

export { useGetProductsCollection };
