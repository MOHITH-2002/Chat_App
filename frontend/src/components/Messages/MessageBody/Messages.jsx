import React from 'react'
import moment from 'moment'
import {useSelector } from 'react-redux';
import {Image} from 'cloudinary-react';
import Lottie from "lottie-react";
import {CheckCheck,Check} from "lucide-react"
import sayhello from './hello.json'
import "./Messages.scss"
const Messages = ({curFriend,scrollRef,typingmsg}) => {
     const{myInformation} = useSelector(state => state.auth); /// auth is from in.js its a main reducer for all
     const {message} = useSelector(state => state.messenger);
   
  return (
     <>
    <div className='message-show'>

    {
     message && message.length > 0 ? (message.map((m,index)=> 
                    m.senderId === myInformation.id ? <div key={m._id} ref={scrollRef} className='my-message'>
                    <div className='image-message' >
                         <div className='my-text'>
                              <p className='message-text' > {
                                   
                              m.message.text === '' ? 
                                 
                             
                              <a href={m.message.image}>
                                  <img src={m.message.image}></img>
                              </a>
                              
                              :
                              m.message.text} </p>
                              {
                                   index === message.length -1 && m.senderId === myInformation.id ? m.status === 'seen' ? 
                                   <CheckCheck size={16} color="#17dade" strokeWidth={1.25} /> : 
                                   m.status === 'delivared' ?  <CheckCheck size={16} strokeWidth={1.25} />:<Check size={16} color="#0d0d0d" strokeWidth={1.25} /> : ''
                              }
                         </div>
                    </div>
                    <div className='time'>
                        {moment(m.createdAt).startOf('mini').fromNow()}                   
                    </div>
                    </div>
          :  <div key={m._id} ref={scrollRef} className='fd-message'>
           <div className='image-message-time'>
      
           <Image cloudName ={process.env.REACT_APP_USER_ID} publicId ={curFriend.image}/>

           <div className='message-time'>
                <div className='fd-text'>
                <p className='message-text'> 
               {
          m.message.text === '' ? 
   

          <a href={m.message.image}>
    <img src={m.message.image}></img>
</a>

:
m.message.text} </p>
               </div>
               <div className='time'>
                 {moment(m.createdAt).startOf('mini').fromNow()}           
                </div>
           </div>
           </div>
      </div>
      )):(<div>
      <Lottie animationData={sayhello} loop={true} />
          </div>
)
    }

    
    





</div>


{
     typingmsg && typingmsg.message && typingmsg.senderId === curFriend._id ?
     <div className='image-message-time'>
      
      <Image cloudName ={process.env.REACT_APP_USER_ID} publicId ={curFriend.image}/>
 <div className='message-time'>
                <div className='fd-text'>
                <p style={{color:'lightblue'}} >Typing...</p>
               </div>
              
           </div>
           </div> :''
}

</>
  )
}

export default Messages