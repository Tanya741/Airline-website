import React from 'react'
import './popular.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const Popular = () => {
  return (

    <div className='cards'>
      <h1> <span style={{color:"rgb(1 97 159)"}}>P</span>opular Pl<span style={{color:"rgb(1 97 159)"}}>a</span>ces</h1>
      <div className='popular-cards'>
        <div className="card">
            <div className="img">
            <img src='https://i.pinimg.com/564x/1b/1e/bd/1b1ebd8c4af439a4fb0e9be27139801a.jpg'/>
            </div>
            <div className="txt">
                <p className="place">Delhi</p>
                <p className="loc">INDIA</p>
                <p className="price">Rs500</p>
            </div>
        </div>
        <div className="card">
            <div className="img">
            <img src='https://i.pinimg.com/564x/c3/93/82/c39382c58356b0adf890bd78606a0668.jpg'/>
            </div>
            <div className="txt">
                <p className="place">Delhi</p>
                <p className="loc">INDIA</p>
                <p className="price">Rs500</p>
            </div>
        </div>
        <div className="card">
            <div className="img">
            <img src='https://i.pinimg.com/564x/0c/0f/e5/0c0fe57b3eae3c89c308d2c288f1067b.jpg'/>
            </div>
            <div className="txt">
                <p className="place">Delhi</p>
                <p className="loc">INDIA</p>
                <p className="price">Rs500</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Popular
