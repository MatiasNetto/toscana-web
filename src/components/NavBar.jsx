import React from 'react'
import HamburgerMenu from './HamburgerMenu';
import "./styles/NavBar.css"
const NavBar = () => {
    return ( 
        <>
        <div className="rectangule">
            <h1>Toscana</h1>
            <HamburgerMenu/>
        </div>
        </>
     );
}
export default NavBar;