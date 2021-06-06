import React, {useState}from 'react';

import './styles/NewProductForm.css'

const NewProductForm = ({uploadNewProduct}) => {
    const dataLayout = {
        order : '',
        model : '',
        description : '',
        price : '',
        imgs : '',
        new : true
    }
    const [productData, setProductData] = useState(dataLayout)
    const [category, setCategory] = useState('test_1')

    //use effect cada vez que cambia el productData que se actualice el preview, llamando a una funcion llamada por props

    const resetForm = (element) => {
        //resetea los datos tanto del form como del state
        setProductData(dataLayout)
        element.reset()
    }

    const handleInputChange = (e) => {
        //guarda los campos del formulario en el estado
        let {name,value} = e.target //desturcturacion de la data del evento
        setProductData({...productData, [name] : value}) //modifica los campos de newProductData especificados por name
    }

    const handleSubmit = (e) => {
        //que va a realizar al darle a submit
        e.preventDefault()
        uploadNewProduct(productData,category) //funcion pasada por props
        resetForm(e.target)
    }

    return ( 
        <>
            <select onChange={(e)=>{setCategory(e.target.value)}} name="category">
                <option value="test_1">Test_1</option>
                <option value="test_2">Test_2</option>
                <option value="anillos">Anillos</option>
                <option value="aros">Aros</option>
                <option value="collares">Collares</option>
                <option value="pulseras">Pulseras</option>
            </select>
           <form  onSubmit={handleSubmit}className='form-container' action="">
               <label htmlFor="order">Order</label>
                <input onChange={handleInputChange}type="number" name='order'/>
                <label htmlFor="model">Model</label>
                <input onChange={handleInputChange} type="text" name='model' />
                <label htmlFor="description">Description</label>
                <input onChange={handleInputChange} type="text-area" name='description' />
                <label htmlFor="price">Price</label>
                <input onChange={handleInputChange} type="number" name='price'/>
                <label htmlFor="imgs">IMGS</label>
                <input type="file" name='imgs'/>
                <label htmlFor="new">New</label>
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