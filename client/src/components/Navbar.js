import React, { useState } from 'react';
import './nav.css'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import Login from './login';
    const Navbar = () => {
        const [menuOpen, setMenuOpen] = useState(false);
        const [showLogin, setShowLogin] = useState(false);

        const openLogin = () => setShowLogin(true);
        const closeLogin = () => setShowLogin(false);
        useGSAP(()=>{
            gsap.from('.nav-links',{
                y:20,
                opacity:0,
                delay:1.2
            }
            )})

    return (
        <>
        <nav className="nav">
            <div className="logo">
                <a href="#home">MyLogo</a>
            </div>
           
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <li><a href="/">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="/Search">Search</a></li>
                <li><a href="#contact">Contact Us</a></li>
            </ul>
            <div onClick={openLogin} className={`contact`}>
                
                <a href="#contact" >LogIn/SignUp</a>
            </div>
            <div 
                className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </nav>
        <Login show={showLogin} onClose={closeLogin} />
        </>
    );
};

export default Navbar;
    

 