import React, { useState,useRef, useEffect } from 'react'
import "./Register.scss"
import { Link, useNavigate } from 'react-router-dom';
import Logo from './logo.png';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { UserRegister } from '../../stores/auth';



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





///#173FBC
///010909
const Register = () => {



    const navigate = useNavigate();

  
  /// to get all data from reducer we use useselector
  const{loading,Authenticate,error,success, myInformation} = useSelector(state => state.auth); /// auth is from in.js its a main reducer for all

  const dispatch = useDispatch();
  const [state,isState]=useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image:''

  })
  const [loadimg,isLoadingimg]=useState('');         //// loading image to label
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const imageRef = useRef();



    
  const registerHandle= (e)=>{
    isState({
      ...state,
      [e.target.name]:e.target.value
    })

  }
  
  const fileupload = async (e) =>{
    if(e.target.files.length !==0){

       

              

      isState({



        ...state,
        [e.target.name]:e.target.files[0]})
        
      }
      const reader = new FileReader();
      reader.onload = () => {
          isLoadingimg(reader.result);
      }
      reader.readAsDataURL(e.target.files[0]);

    }


    const registersubmit = async (e)  =>{
    e.preventDefault();
  
    const {userName,email,password,confirmPassword,image} = state;
    
    if(image){
    
    const formData = new FormData();
              formData.append("file",image);
              formData.append("upload_preset","izhshkj6");
              const res =await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_USER_ID}/image/upload`,formData)
    

    const data = {
      userName:userName,
      email:email,
      password:password,
      confirmPassword:confirmPassword,
      image:res.data.secure_url
    }
    dispatch(UserRegister(data));

  }else{
    const data = {
      userName:userName,
      email:email,
      password:password,
      confirmPassword:confirmPassword,
      image:''
    }
    dispatch(UserRegister(data));
  }

                           //////////Any one we can choose
  //   const newUser = {
  //     userName:nameRef.current.value,
  //     email:emailRef.current.value,
  //     password:passwordRef.current.value,
  //     confirmPassword:confirmPasswordRef.current.value,
  //     image:imageRef.current.value
  // }
  //   const response = axios.post('/api/messenger/register',newUser);
  //   console.log(response);
    

      


  }




  useEffect(() => {
    if(Authenticate){
      navigate('/user-api-messenger-single');
    }else{
    if(success)
    toast.success(success);
    if(error){
      error.map(err => toast.error(err));  
    }
    if(error){
      error.map(err => toast.error(err.text));  
    }
  }
      
  
  }, [success,error]);
  
  return (
    <div className="register">
    
      <div className="navbar">
        <img className="box"src={Logo} alt=""></img>
      </div>
      <div className="container">
        <div className="imgsource">

        <iframe className="iframe" src="https://embed.lottiefiles.com/animation/27649"></iframe>
        <iframe className="phonembed" src="https://embed.lottiefiles.com/animation/72842"></iframe>
        </div>

            <form onSubmit={registersubmit} method='POST'>

      
        <div className="register-form">
        <div className="sign-up">
          <button className='signupbtn'>Sign Up</button>
          <Link className="btn-link" to="/message/login">Login</Link>
        </div>
        <div className="form-group">
        <label htmlFor="username">Username*</label>
        <input type="text" className="form-control" id="username" placeholder='Username' name='userName' onChange={registerHandle} value={state.userName} ref={nameRef}/>
          
        </div>
        <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input type="Email" className="form-control" id="email" placeholder='Email' name='email' onChange={registerHandle} value={state.email} ref={emailRef} />
          
        </div>
        <div className="form-group">
        <label htmlFor="password">Password*</label>
        <input type="password" className="form-control" id="password" placeholder='Password' name='password' onChange={registerHandle} value={state.password}  ref={passwordRef}/>
          
        </div>
        <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password*</label>
        <input type="password" className="form-control" id="confirmPassword" placeholder='Confirm Password' name='confirmPassword' onChange={registerHandle} value={state.confirmPassword} ref={confirmPasswordRef}/>
          
        </div>

<div className='form-group'>
                  <div className='file-image'>
                         <div className='image'>
{loadimg ? <img src={loadimg} alt=""/>:''}
                         </div>
               <div className='file'>
               <label htmlFor='image'>Select Image</label>
               
               <input type="file" className="form-control" id="image" name='image' onChange={fileupload}  ref={imageRef} /> 

               </div>

             </div>
               </div>
        <div>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>

        </div>
      </form>
      </div>
      <ToastContainer />
</div>

  
  )
}

export default Register