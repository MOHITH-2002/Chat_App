import React from 'react';
import { FaCaretSquareDown,FaEdit,FaSistrix } from "react-icons/fa";
import "./Fri.scss"
import {Image, Video, Transformation} from 'cloudinary-react';
import { useSelector } from 'react-redux';

const FriendInfo = (props) => {
     const {curFriend,activeUser} = props;

     const {friends,message,sendMessagesSuccess,message_get_success} = useSelector(state => state.messenger);
 
     
  return (
       <div className='friend-info'>
            <input type="checkbox" id='gallery' />
            <div className='image-name'>
                 <div className='image'>
                <Image cloudName ={process.env.REACT_APP_USER_ID} publicId ={curFriend.image}/>
  
                   

                 </div>
                 {
                    activeUser && activeUser.length>0 && activeUser.some(u => u.userId === curFriend._id) ?
                 <div className='active-user'>Online</div> : <div className='active_user-offline'>Offline</div>
                 }

     <div className='name'>
          <h4>{curFriend.userName}</h4>
     </div>
            </div>


     <div className='others'>
     <div className='custom-chat'>
          <h3>Coustomise Chat </h3>
          <FaCaretSquareDown/>
     </div>

     <div className='privacy'>
          <h3>Privacy and Support </h3>
          <FaCaretSquareDown/>
     </div>

     <div className='media'>
          <h3>Shared Media </h3>
        <label htmlFor='gallery'> <FaCaretSquareDown/> </label> 
     </div>
     </div>

     <div className='gallery'>
    {
     message && message.length>0 ? message.map((m,index)=>m.message.image &&   <a key={index} href={m.message.image}>
                                  <img src={m.message.image}></img>
                              </a>) : ''     
          
        }  
     
   
     </div> 

       </div>
  )
}

export default FriendInfo;