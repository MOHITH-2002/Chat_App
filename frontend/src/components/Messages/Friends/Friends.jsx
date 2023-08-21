import React from 'react'
import "./friends.scss"
import moment from "moment"
import {Image} from 'cloudinary-react';
import {CheckCheck,BellRing} from 'lucide-react';
const Friends = ({friend,activeUser,myInformation}) => {///prop from messages component
// console.log(friend.messageInfo.status);
  return (
    <div className='friend'>
    <div className='friend-image'>
        <div className='image'>
        <a href={friend.friendInfo.image}>
        <Image cloudName ={process.env.REACT_APP_USER_ID} publicId ={friend.friendInfo.image}/></a>
        {
          activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === friend.friendInfo._id) ? <div className='active-icon'></div> :''
        }
        
        </div>
    </div>

    <div className='friend-name-seen'>
         <div className='friend-name'>
            <p className='Fd_name'>{friend.friendInfo.userName}</p>
            <div className='friend-msg-time'>
              {
                friend.messageInfo && friend.messageInfo?.senderId === myInformation.id ? <span className='friend-span'>you : </span> :<span>{friend.friendInfo.userName} : </span>
              }
              {
                friend.messageInfo && friend.messageInfo.message.text ?
                <span>{friend.messageInfo.message.text.slice(0,10)}</span> : 
                 friend.messageInfo && friend.messageInfo.message.image ?
                 <span>Sent a image</span> :<span>''</span>
              }
              <span style={{marginLeft:'20px'}} >{friend.messageInfo ? moment(friend.messageInfo.createdAt).startOf('minute').fromNow()
              :
              moment(friend.friendInfo.createdAt).startOf('minute').fromNow()
              }</span>
            </div>
         </div>
         {
          friend.messageInfo && myInformation.id === friend.messageInfo?.senderId ? 
            friend.messageInfo.status === 'seen' ? 
         <div className='seen-unseen-icon'>
     
         <CheckCheck size={28} strokeWidth={1.75}  color="#17dade"/>
        
         </div> : 
         friend.messageInfo.status === 'delivered' ?
         <div className="seen-unseen-icon">
    
         <CheckCheck size={28} strokeWidth={1.75}  />
        
              </div> :''
        :
           friend.messageInfo?.status !== undefined && friend.messageInfo?.status !== 'seen'? <BellRing/> : ''
        }

    </div>

</div>  
  )
}

export default Friends