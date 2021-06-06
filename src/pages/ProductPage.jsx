import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../components/Firebase';

//components
import NavBar from '../components/NavBar'

const ProductPage = () => {
    const [productData, setProductData] = useState(null)
    const params = useParams()

    useEffect(()=>{
        const getData = async (category,proudctId)=>{
            //trae los datos del producto solicitado
            const productRequest = await db.collection(category).doc(proudctId).get()
            setProductData(productRequest.data())
        }
        getData(params.category,params.productId)
    },[])


    return ( 
        <>
            <NavBar/>
            {productData === undefined ? //condicion

            //si el producto no existe:
            (<h1>No se encontro el producto</h1>) :

            //si encuentra el producto: 
            (

                <h4>{productData === null ? 'cargando...' : productData.model}</h4>

            )}

        </>
     );
}
 
export default ProductPage;