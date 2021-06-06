import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';

import {db} from '../components/Firebase'

//components
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import Subtittle from '../components/Subtittle';

const CartegoryPage = () => {
    const [products,setProducts] = useState(null)
    const params = useParams()

    useEffect(()=>{
        const getProductList = async () =>{
            //trae los productos desde la categoria indicada por parametros y los almacena en productsFragment
            let productsFragment = []
            const productsRequest = await db.collection(params.category).get();
            await productsRequest.forEach((product)=>{
                productsFragment = [...productsFragment,product.data()]
            });
            setProducts(productsFragment) //setea a products como productsFragment para no andar actualizando todo el tiempo el state
        }
        getProductList()
    },[])


    return ( 
        <>
            <NavBar/>
            <Subtittle text={params.category}/>
            <div>
                {
                    products == null ? <p>Cargando...</p> : (products.map((e)=>{
                        return (
                            <ProductCard key={e.model} img={e.imgs[1]} model={e.model} price={e.price}/>
                        )
                    }))
                }
            </div>
        </>
     );
}
 
export default CartegoryPage;