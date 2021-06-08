import React from 'react';
import NewProductForm from '../../components/admin/NewProductForma';
import {db} from '../../components/Firebase'


const AdminHomePage = () => {

    //Agrega un nuevo producto a la categoria seleccionada
    const uploadNewProduct = async(productData,category) => {
        let id = productData.model.replace(/ /g, "-").toLowerCase() //set id como modelo, en minusculas y con "-" en vez de espacios
        productData.id = id //add id a la data del producto

        await db.collection(category).doc(id).set(productData)
        alert('tarea Nueva agregada')
    }

    return ( 
        <>
            <h1>ashe</h1>
            <NewProductForm uploadNewProduct={uploadNewProduct}/>
        </>
     );
}
 
export default AdminHomePage;