import React, { useState,useEffect } from 'react'
import {Link,useNavigate} from "react-router-dom";
import Logo from "../Register/logo.png"
import "./Login.scss"
import {UserLogin} from "../../stores/auth";
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  
<ToastContainer
position="top-right"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
const Login = () => {

  const navigate = useNavigate();
  const{loading,Authenticate,error,success, myInformation} = useSelector(state => state.auth); /// auth is from in.js its a main reducer for all

  const dispatch = useDispatch();

  const [state,setState] = useState({
    email:'',
    password:''
  });

  const loginHandle= (e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }

  const login = (e)=>{
    e.preventDefault();

    dispatch(UserLogin(state));

    
  }
  useEffect(() => {
    if(Authenticate){
      navigate('/user-api-messenger-single');
    }
    if(success)
    toast.success(success);
    if(error){
      error.map(err => toast.error(err));  
    }
    if(error){
      error.map(err => toast.error(err.text));  
    }

      
  
  }, [success,error]);
  return (
    <div className="login">
    <div className="navbar">
      <img className="box"src={Logo} alt=""></img>
    </div>
    <div className="container">
    <div className="imgsource">

<iframe className="iframe" src="https://embed.lottiefiles.com/animation/27649"></iframe>
<iframe className="phonembed" src="https://embed.lottiefiles.com/animation/72842"></iframe>
</div>
<form onSubmit={login}>
      <div className="login-form">
      <div className="sign-up">
        <button className='signupbtn'>Login</button>
        <Link className="btn-link" to="/message/register">Sign up</Link>
      </div>
      
      <div className="form-group">
      <label htmlFor="email">Email*</label>
      <input type="Email" className="form-control" id="email" autoComplete='off' placeholder='Email' name='email' onChange={loginHandle} value={state.email}/>
        
      </div>
      <div className="form-group">
      <label htmlFor="password">Password*</label>
      <input type="password" className="form-control" id="password" placeholder='Password' name='password' onChange={loginHandle} value={state.password}/>
        
      </div>  

      <div>
        <button type="submit" className="btn btn-primary">Login</button>
      </div>

      </div>
    </form>
    </div>
    <ToastContainer />
  </div>

  )
}

export default Login;