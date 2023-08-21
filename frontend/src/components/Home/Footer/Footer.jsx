import React from 'react'
import "./footer.scss"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='Footer'>
        <div className='logo'>
            <Link to="/" className="link">Chatomatic</Link>
            

          
        </div>
        <div className='links'>
        <ul> Our Links
  <li><a href='https://youtube-to-mp-3-converter.onrender.com/'>mp3 converter</a></li>
  <li ><a href='https://imaginative-sopapillas-521a08.netlify.app/'>map pin</a></li>
</ul>
        </div>
        <div className='copywrite'>
            <span>Copyright © {new Date().getFullYear() } Chatomatic</span>
        </div>
    </div>
  )
}

export default Footer