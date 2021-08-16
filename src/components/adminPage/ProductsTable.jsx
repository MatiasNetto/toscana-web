import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGetProductsCollection } from '../../hooks/useGetProductsCollection';
import { db, storage } from '../Firebase';
import PageLoader from '../PageLoader';
import { colorBrown } from '../Styles';
import ProductRow from './ProductRow';

const Table = styled.table`
  border: 2px solid ${colorBrown};
  border-collapse: collapse;
`;

const Th = styled.th`
  font-size: 1.1em;
`;

const ProductsTable = ({ category, setDataToFill, setOpenForm }) => {
  const [products, setProducts] = useState(null);
  const [awaiting, setAwaiting] = useState(true); //establece con el valor default que establece la condicion anterior
  const [error, setError] = useState({ error: false });
  let dark = false;

  let { collection, isPending, err } = useGetProductsCollection(category, true, true);

  useEffect(() => {
    if (awaiting === true) {
      setProducts(collection);
      setError(err);
      setAwaiting(isPending);
    }
  }, [isPending]);

  useEffect(() => {
    setAwaiting(true);
    setProducts(null);
  }, [category]);

  const deleteProductIndex = (elementToDelete) => {
    let arrayToUpdate = products;

    //elimina el elemento selecionado
    arrayToUpdate.splice(products.indexOf(elementToDelete), 1);

    console.log(arrayToUpdate);

    setProducts([...arrayToUpdate]);
  };

  const handleDeleteProduct = async (elementToDelete) => {
    let ask = window.confirm('Estas seguro que deseas eliminar "' + elementToDelete.model + '"?');
    if (ask === true) {
      //borra las imagenes del storage de firebase
      elementToDelete.imgsPath.forEach((reference) => {
        storage.ref(reference).delete();
      });

      //elimina el producto de la base de datos
      await db.collection(elementToDelete.category).doc(elementToDelete.id).delete();
      sessionStorage.clear();
      alert('Producto borrado');

      deleteProductIndex(elementToDelete);
    }
  };

  return (
    <>
      {awaiting ? (
        <PageLoader />
      ) : (
        <Table table style={{ width: '100%' }}>
          <thead>
            <tr style={{ height: '5vh' }}>
              <Th style={{ width: '10%' }}>Image</Th>
              <Th style={{ width: '15%' }}>Model</Th>
              <Th style={{ width: '10%' }}>Price</Th>
              <Th style={{ width: '20%' }}>Description</Th>
              <Th style={{ width: '10%' }}>Relevance</Th>
              <Th style={{ width: '15%' }}>Tags</Th>
              <Th style={{ width: '20%' }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              dark = !dark;
              return (
                <ProductRow
                  deleteProduct={handleDeleteProduct}
                  setDataToFill={setDataToFill}
                  setOpenForm={setOpenForm}
                  data={product}
                  dark={dark}
                  key={product.id}
                />
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsTable;
