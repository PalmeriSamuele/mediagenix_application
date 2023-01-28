import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBurger, faEarthEurope, faGear, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Header = () => {
    return (
        <header className=' d-flex align-items-center justify-content-between bg-dark text-light'>
            <div className='header-container d-flex gap-3 align-items-center justify-content-start'>
                <div className='burger-menu  d-flex align-items-center'>
                    <FontAwesomeIcon icon={faBurger} className='burger'/>
                    
                </div>
                <h1 className='logo-name fs-4 d-flex align-self-center  justify-content-center m-0'>WHATS'ON</h1>
                <nav className='d-flex gap-2 text-light align-items-center '>
                    <a className=' nav-link d-flex align-items-center' href="">Content</a>
                    <a className=' nav-link d-flex align-items-center' href="">Curator</a>
                    <a className=' nav-active nav-link d-flex align-items-center' href="">Strategic & Planning</a>
                    <a className=' nav-link d-flex align-items-center' href="">Schedule Gallery</a>
                </nav>
            </div>

            <div className='icons d-flex gap-2 '>
                <FontAwesomeIcon icon={faGear} />
                <FontAwesomeIcon icon={faEarthEurope} />
                <FontAwesomeIcon icon={faUser} />      
                <FontAwesomeIcon icon={faShare} />          

            </div>
        </header>
    );
};

export default Header;