import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ProductsGirid from '../components/ProductsGrid';

import {db} from '../components/Firebase'

import './styles/CategoryPage.css'

//components
import NavBar from '../components/NavBar';
import Subtittle from '../components/Subtittle';

const CartegoryPage = () => {
    const [products,setProducts] = useState(null)
    const params = useParams()

    useEffect(()=>{
        const getProductList = async () =>{
            //trae los productos desde la categoria indicada por parametros y los almacena en productsFragment
            let productsFragment = []
            const productsRequest = await db.collection(params.category).get();
            productsRequest.forEach((product)=>{
                console.log(product.data().imgs);
                productsFragment = [...productsFragment,product.data()]
            });
            setProducts(productsFragment) //setea a products como productsFragment para no andar actualizando todo el tiempo el state

        }
        getProductList()
    },[])

    return ( 
        <>
            <NavBar/>
            <div className="content">
            <Subtittle text={params.category.toUpperCase()}/>
            <ProductsGirid products={products}/>
            </div>
        </>
     );
}
 
export default CartegoryPage;