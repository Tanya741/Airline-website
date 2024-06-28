import React, { useEffect, useState } from 'react';

import './nav.css';

import gsap from 'gsap';

import Login from './login';

import NotificationModal from './notification.js';

import { CiBellOn } from "react-icons/ci";




const Navbar = () => {

  const [user, setUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);




  useEffect(() => {

    const loggedInUser = localStorage.getItem("email");

    if (loggedInUser) {

      setUser(loggedInUser);

    }

  }, []);




  const openLogin = () => setShowLogin(true);

  const closeLogin = () => setShowLogin(false);




  const openNotifications = () => setShowNotifications(true);

  const closeNotifications = () => setShowNotifications(false);




  const handleLogout = () => {

    localStorage.removeItem("email");

    setUser(null);

  };




  return (

    <>

      <nav className="nav">

        <div className="logo">
          <img src='https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbUtmY3bSJTwp8VXDDh-ijBwzXuvPO0o8uPip8rko1H-2czjuVNJg05yFihxmD493XUiGLNHbnZqO8UH51qmxSB3XQSekc8Dg=w1920-h970'/>
        </div>




        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>

          <li><a href="/">Home</a></li>

          <li><a href="#about">About</a></li>

          <li><a href="#services">Services</a></li>

          <li>{user ? (<a href="/search">Search</a>) : (<span onClick={openLogin}>Search</span>)}</li>

          <li>{user ? (<a href="/profile">Profile</a>) : (<span onClick={openLogin}></span>)}</li>

        </ul>




        <div className="navbar-icons">

          {user && (

            <div className="icon" onClick={openNotifications}>

              <CiBellOn size={24} />

            </div>

          )}


        </div>
          {user ? (

            <div className="contact" onClick={handleLogout}>

              <a href="#logout">Logout</a>

            </div>

          ) : (

            <div className="contact" onClick={openLogin}>

              <a href="#login">LogIn/SignUp</a>

            </div>

          )}




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

      <NotificationModal show={showNotifications} onClose={closeNotifications} />

    </>

  );

};




export default Navbar;