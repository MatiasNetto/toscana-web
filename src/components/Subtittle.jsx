import React from 'react';

import './styles/Subtittle.css'

const Subtittle = (props) => {
    return ( 
        <>
            <h4 className='subtittle'>{props.text}</h4>
            <hr />
        </>
     );
}
 
export default Subtittle;