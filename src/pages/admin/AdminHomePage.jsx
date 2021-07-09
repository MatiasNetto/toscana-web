import React from 'react';
import NewProductForm from '../../components/admin/NewProductForma';
import {db} from '../../components/Firebase'


const AdminHomePage = () => {

    //Agrega un nuevo producto a la categoria seleccionada
    const uploadNewProduct = async(productData) => {
        await db.collection(productData.category).doc(productData.id).set(productData)
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