import Carousel from 'react-bootstrap/Carousel';
import React from 'react'
import './Carousel.css'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {SlPlane } from 'react-icons/sl'

const Carousle = () => {
  useGSAP(()=>{
    gsap.from('.flight',{
      x:-500,
    scale:0,
      delay:0,
      duration:10
    })
  })

  return (
    <section className='main-pg'>
      <div className='carousel'>
      <div  className='Item'>
        <img className='flight'
          src="https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpiha1N-2GTJeOkZSEahSVbtWz84D7E1hewAdChLx7Pl8B3h1UhdkvQxI0ikXG9Nz_qjaF9CUgmKGiyRvdBCNxtxKd7DuXZUjWmQ=w1920-h868-rw-v1"
          alt="image 1"
        />
      </div>
      <div className='main-txt'>
        <h1  className='KL'><span style={{color:"rgb(1 97 159)"}}>F</span>IND And BOO<span style={{color:"rgb(1 97 159)"}}>K</span> </h1>
        <h3>A Great Experince</h3>
      </div>
    </div>
    <div className='main-pg-2'>
          <div className='main-pg-2-div-1'>
            <h1><span style={{color:"rgb(1 97 159)"}}>G</span>oing<br/>Some<span style={{color:"rgb(1 97 159)"}}>W</span>here? </h1>
            <h2 ><span style={{paddingLeft:"2rem",color:'rgb(1 97 159)'}}>Fly with</span> us . . . .</h2>
            {/* <div className='main-div1-div'> */}
            <div className="rBooking main-div1-div">
                <div className="text">
                    <div className="toF">
                        <div className="left">NYC</div>
                        <div className="middle"><SlPlane /></div>
                        <div className="right">DELHI</div>
                    </div>
                    <div className="additional">
                        <div className="box1"></div>
                        <div className="sep"></div>
                        <div className="sep2"></div>
                    </div>
                    <a class="button-9" href='/Search' >Search</a>
                </div>
                <div className="image">
                    <img className="img" src="https://i.pinimg.com/564x/85/44/a2/8544a20b8f16e6708da05b0637261522.jpg" alt="Animated Element" />
                </div>
            </div>
              

            {/* </div> */}
          </div>
          <div className='main-pg-2-div-2'>
            <img 
            src='https://img.freepik.com/free-vector/dotted-world-map_23-2147519952.jpg?t=st=1717865621~exp=1717869221~hmac=f20cf58eb023b6c023e5330913691d683d78ac6dec7cd075a7c8f18e91a1ce49&w=740'></img>
          </div>
    </div>
    </section>
  )
}

export default Carousle
