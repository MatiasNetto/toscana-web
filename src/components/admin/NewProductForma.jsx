import React, {useState,useEffect}from 'react';

import './styles/NewProductForm.css'

const NewProductForm = (props) => {
    const dataLayout = {
        order : '47',
        model : '',
        description : '',
        price : '',
        imgs : '',
        new : true
    }
    const [newProductData, setNewProductData] = useState(dataLayout)
    const [category, setCategory] = useState('anillos')

    //guarda los campos del formulario en el estado
    const handleInputChange = (e) => {
        let {name,value} = e.target //desturcturacion de la data del evento
        setNewProductData({...newProductData, [name] : value}) //modifica los campos de newProductData especificados por name
    }

    //que va a realizar al darle a submit
    const handleSubmit = (e) => {
        e.preventDefault()
        props.uploadNewProduct(newProductData,category)
        //reset state
        setNewProductData(dataLayout)
    }

    return ( 
        <>
            <select onChange={(e)=>{setCategory(e.target.value)}} name="category">
                <option value="anillos">Anillos</option>
                <option value="aros">Aros</option>
                <option value="collares">Collares</option>
                <option value="pulseras">Pulseras</option>
            </select>
           <form  onSubmit={handleSubmit}className='form-container' action="">
               <label htmlFor="">Order</label>
                <input onChange={handleInputChange}type="number" name='order'/>
                <label htmlFor="">Model</label>
                <input onChange={handleInputChange} type="text" name='model' />
                <label htmlFor="">Description</label>
                <input onChange={handleInputChange} type="text-area" name='description' />
                <label htmlFor="">Price</label>
                <input onChange={handleInputChange} type="number" name='price'/>
                <label htmlFor="">IMGS</label>
                <input type="file" />
                <label htmlFor="">New</label>
                <select onChange={handleInputChange} name="new" >
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                </select>
                <input type="submit" value='Add product'/>
            </form> 
        </>
     );
}
 
export default NewProductForm;