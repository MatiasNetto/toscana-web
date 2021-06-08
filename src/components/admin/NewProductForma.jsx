import React, {useState}from 'react';
import {storage} from '../Firebase'

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
    const [category, setCategory] = useState('testcategory')

    //use effect cada vez que cambia el productData que se actualice el preview, llamando a una funcion pasada por props

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

    const handleFilesChange = async(e) => {
        let file = e.target.files[0]
        let ref = storage.ref('test_folder/' + file.name) //la ruta de referencia en el sercidor para subir el archivo
        await ref.put(file) //subida del archivo al servidor
        let imgPath = ref.fullPath //guarda la ubicacion del archivo en variable
        setProductData({...productData,'imgs' : imgPath}) //guarda la ubicacion de la imgen en el estado
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
                <option value="testcategory">Test Category</option>
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
                <input onChange={handleFilesChange} type="file" multiple='multiple  ' name='imgsURI'/>
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