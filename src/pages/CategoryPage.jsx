import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import CategoryGirid from '../components/CategoryGrid';

import {db} from '../components/Firebase'

//components
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import Subtittle from '../components/Subtittle';

const CartegoryPage = () => {
    const [products,setProducts] = useState(null)
    let params = useParams()
    console.log(params);

    useEffect(()=>{
        const getProductList = async () =>{
            let products = []
            const productsRequest = await db.collection(params.category).get();
            await productsRequest.forEach((product)=>{
                products = [...products,product.data()]
            });
            setProducts(products)
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
                            <ProductCard key={e.id} img={e.imgs[1]} model={e.model} price={e.price}/>
                        )
                    }))
                }
            </div>
        </>
     );
}
 
export default CartegoryPage;