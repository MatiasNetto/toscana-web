import { useState, useEffect } from 'react';
import { db } from '../components/Firebase';

const useGetProductsCollection = (category, pendingDefault, hidden) => {
  const [collection, setCollection] = useState(JSON.parse(sessionStorage.getItem(category)));
  const [isPending, setIsPending] = useState(pendingDefault);
  const [err, setErr] = useState({ error: false, code: '' });

  useEffect(() => {
    let _isMounted = true;
    setIsPending(true);
    setCollection([]);
    const getData = async () => {
      //trae los productos desde la categoria indicada por parametros y los almacena en productsFragment
      let productsFragment = [];
      let productsRequest = '';

      try {
        //productos que son tendencia y nuevos
        productsRequest = await db
          .collection(category)
          .where('trending', '==', true)
          .where('new', '==', true)
          .where('hidden', '==', false)
          .get();
        productsRequest.forEach((product) => {
          //Recorre la data traida y agrega los productos a productsFragment
          productsFragment = [...productsFragment, product.data()];
        });

        //productos que son tendencia
        productsRequest = await db
          .collection(category)
          .where('trending', '==', true)
          .where('new', '==', false)
          .where('hidden', '==', false)
          .get();
        productsRequest.forEach((product) => {
          //Recorre la data traida y agrega los productos a productsFragment
          productsFragment = [...productsFragment, product.data()];
        });

        //productos que son nuevos
        productsRequest = await db
          .collection(category)
          .where('new', '==', true)
          .where('trending', '==', false)
          .where('hidden', '==', false)
          .get();
        productsRequest.forEach((product) => {
          //Recorre la data traida y agrega los productos a productsFragment
          productsFragment = [...productsFragment, product.data()];
        });

        //productos que hay stock
        productsRequest = await db
          .collection(category)
          .where('trending', '==', false)
          .where('new', '==', false)
          .where('outOfStock', '==', false)
          .where('hidden', '==', false)
          .get();

        let productsToSort = [];
        //recorre la peticion y guarda los datos ya interpretados en productsToSort para posteriormente ser ordenados
        productsRequest.forEach((product) => {
          productsToSort = [...productsToSort, product.data()];
        });
        productsToSort.sort((a, b) => a.order - b.order); //ordena los elelemntos segun el numero de orden del objeto

        //recorre finalmente la data ordenada y la agrega a el productsFragment
        productsToSort.forEach((product) => {
          //Recorre la data traida y agrega los productos a productsFragment
          productsFragment = [...productsFragment, product];
        });

        //productos que no hay stock
        productsRequest = await db
          .collection(category)
          .where('outOfStock', '==', true)
          .where('hidden', '==', false)
          .get();
        productsRequest.forEach((product) => {
          //Recorre la data traida y agrega los productos a productsFragment
          productsFragment = [...productsFragment, product.data()];
        });

        //si esta especificada la prop hidden se muestra todos los productos ocultos
        if (hidden === true) {
          productsRequest = await db.collection(category).where('hidden', '==', true).get();
          productsRequest.forEach((product) => {
            //Recorre la data traida y agrega los productos a productsFragment
            productsFragment = [...productsFragment, product.data()];
          });
        }

        if (productsFragment.length === 0) {
          //si la categoria no existe devuelve una longitud de cero
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

    //comprueva, si la informacion no esta guardada en el session storage hace la peticion, si esta guardada la devuelve
    if (sessionStorage.getItem(category) === null) {
      getData(); //Llama la funcion asincrona
    } else {
      setCollection(JSON.parse(sessionStorage.getItem(category)));
      setErr({ error: false });
      setIsPending(false);
    }

    //Cuando el componente se desmonte, cancela toda actualizacion de estado
    return () => {
      _isMounted = false;
    };
  }, [category]);

  return { collection, isPending, err };
};

export { useGetProductsCollection };
