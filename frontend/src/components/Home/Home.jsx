import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Home.scss"
import {useSelector } from 'react-redux';
import Logo from "../Register/logo.png"
import MessageContents from './contents/messageContents.jsx'
import Contents2 from './contents2/contentstwo';
import Footer from './Footer/Footer';
const Home = () => {
    const [menuOpen,setmenu] = useState(false);

    const navigate = useNavigate()
    const{Authenticate} = useSelector(state => state.auth); /// auth is from in.js its a main reducer for all

    useEffect(() =>{
        if(Authenticate){
            navigate('/user-api-messenger-single');
        }

    }, []);

    return (

    

        <div className="home">
            <div className="container">
                <div className={"navbar " +(menuOpen && "active")}>
                <div className="logo">

                    <p>Chatomatic</p>
                </div>
                <div className="assest">
                    <Link className="Link">Product</Link>
                    <Link className="Link">Service</Link>
                    <Link className="Link">Contact</Link>
                    <Link to ='/message/login' className="Link">Login</Link>
                    <Link to ='/message/Register' className="Link last">Try it Free</Link>

                </div>
                <div className="hamburger" onClick={()=>setmenu(!menuOpen)}>
         <span className="line1"></span>
         <span className="line2"></span>
         <span className="line3"></span>
             </div>
                </div>
                <div className="contents-container">

                <div className={"menu " +(menuOpen && "active")}>
                <Link className="Link">Product</Link>
                    <Link className="Link">Service</Link>
                    <Link className="Link">Contact</Link>
                    <Link to ='/message/login' className="Link">Login</Link>
                    <Link to ='/message/Register' className="Link last">Try it Free</Link>

                 </div>

                <div className="contents">
                <div className="contents-body1">
                <h2>
                Have Your <br></br>Best Chat.
                </h2> 
                <p>Fast, easy & unlimited chat. </p>
                </div>
                <div className="contents-body2">
                <Link to ='/message/Register' className='link2'>Try It Free</Link>
                <Link to ='/message/login' className='link2 overwrite'>Get A Demo</Link>
                </div>
              
                </div>
                <div className="contents-img">
                
                <div className='left'>
        <div className="left-svg">

                <svg id="10015.io" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="84" height="84" patternUnits="userSpaceOnUse" patternTransform="translate(61, 61) rotate(51) skewX(0)"><svg width="30" height="30" viewBox="0 0 100 100"><g fill="#47d3ff" opacity="0.95"><circle cx="50" cy="50" r="50"></circle></g></svg></pattern></defs><rect x="0" y="0"  fill="#474bff"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>
                <svg id="10015.io" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="84" height="84" patternUnits="userSpaceOnUse" patternTransform="translate(61, 61) rotate(51) skewX(0)"><svg width="30" height="30" viewBox="0 0 100 100"><g fill="#47d3ff" opacity="0.95"><circle cx="50" cy="50" r="50"></circle></g></svg></pattern></defs><rect x="0" y="0"  fill="#474bff"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>
                <img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*u85vztJN8TmKJDM2eJR6vg.jpeg"></img>
        </div>  <div className='left-content'>

                <span>How are You</span>
                    <img className='sendingmsg' src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
        </div>

                
                </div>
                <div className='right'>
                <img className='sendmsg' src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*u85vztJN8TmKJDM2eJR6vg.jpeg"></img>
                <span>I'm fine </span>
                <svg id="10015.io" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="84" height="84" patternUnits="userSpaceOnUse" patternTransform="translate(61, 61) rotate(51) skewX(0)"><svg width="30" height="30" viewBox="0 0 100 100"><g fill="#47d3ff" opacity="0.95"><circle cx="50" cy="50" r="50"></circle></g></svg></pattern></defs><rect x="0" y="0"  fill="#474bff"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>
                <svg id="10015.io" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="svg-pattern" x="0" y="0" width="84" height="84" patternUnits="userSpaceOnUse" patternTransform="translate(61, 61) rotate(51) skewX(0)"><svg width="30" height="30" viewBox="0 0 100 100"><g fill="#47d3ff" opacity="0.95"><circle cx="50" cy="50" r="50"></circle></g></svg></pattern></defs><rect x="0" y="0"  fill="#474bff"></rect><rect x="0" y="0" width="100%" height="100%" fill="url(#svg-pattern)"></rect></svg>
                <img  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
                

                </div>

                </div>
                </div>
                
            </div>
            <MessageContents/>
            <Contents2/>
            <Footer/>
        </div>

   
    )
}

export default Home;