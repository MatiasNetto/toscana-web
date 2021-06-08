import React, { useEffect, useState } from 'react';
import {storage, storageBucket} from '../components/Firebase'

const TestComponent = () => {
    const [imgURL, setImgURL] = useState(null)

    useEffect(()=>{
        const request = async(e) => {
            const gsRef = storage.refFromURL(storageBucket)
            console.log('gsRef',gsRef);
            const url = await gsRef.child('test_folder/slider_1.jpg').getDownloadURL()
            console.log('url',url);
            setImgURL(url)
        }
        request()


    },[])


    return ( 
        <>
            {imgURL == null ? <p>cargando...</p> : 
                (<img src={imgURL} alt="" />)
            }
        </>
     )
}
 
export default TestComponent;