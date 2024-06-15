import './Login.css';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function Login({ show, onClose }) {
  const loginRef = useRef();
  const backdropRef = useRef();

  useEffect(() => {
    if (show) {
      gsap.fromTo(
        loginRef.current,
        { x: 500 },
        { x: 0, duration: 0.5 }
      );
    } else {
      gsap.to(loginRef.current, { x: 500, duration: 0.5 });
    }
  }, [show]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <div ref={backdropRef} className="backdrop" onClick={handleBackdropClick}>
          <div ref={loginRef} className="login">
            <button className="close-button" onClick={onClose}>
              ×
            </button>
            <h2 className="login-title">Login to Your Account</h2>
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit" className="submit-button">Login</button>
            </form>
            <div className="social-login">
              <button className="social-button google">Login with Google</button>
              <button className="social-button facebook">Login with Facebook</button>
              <button className="social-button twitter">Login with Twitter</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}