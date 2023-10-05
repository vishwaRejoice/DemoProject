  import React, { useState } from 'react'
  import image from "../../Assets/Images/unsplash_6anudmpILw4.png"
  import "./About.scss"
  const About = () => {
   
    
    return (
    <>
    <div className='image-container'>
      <img src={image}/>
      <div className='div-container'>
         <h3 className='div-heading'>About us</h3>
         <p className='div-description'>For more than 30 years we have been delivering world-class construction and we’ve built many lasting relationships along the way. <br></br><br></br>We’ve matured into an industry leader and trusted resource for those seeking quality, innovation and reliability when building in the U.S.</p>
         <button className='btn'>More on Our History</button>
      </div>
    </div>
   
    </>
    )
  }

  export default About
