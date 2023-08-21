import {React,useState}  from 'react'
import "./Rightside.scss"
import Messages from './MessageBody/Messages'
import SendMessage from './SendingMessage/SendMessage'
import AboutFriend from "./FriendInfo/Fri.jsx"
import {Image} from 'cloudinary-react';
const Rightside = (props) => {

     const {curFriend,msgHandle,newMsg,sendMsg,scrollRef,sendEmojis,setImages,uploadFile,activeUser,typingmsg,friends} = props;
     const [isChecked, setIsChecked] = useState(true);

     return (
       <div className='col-9'>
         <div className='right-side'>
           <input type='checkbox' id='dot' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
           <div className='row'>
             <div className='col-8'>
          <div className='message-send-show'>
               <div className='header'>
                    <div className='image-name'>
                         <div className='image'>
                         
                         <Image cloudName ={process.env.REACT_APP_USER_ID} publicId ={curFriend.image}/>

                         </div>
                         <div className='name'>
                              <h3> {curFriend.userName}</h3>
                         </div>
                    </div>

          <div className='icons'>
     <div className='icon'>
     <i class="fa-solid fa-phone"></i>
     </div>

     <div className='icon'>
     <i class="fa-solid fa-video"></i>
     </div>

     <div className="icon hover-image">
     <label htmlFor='dot' >
     

     <i class="fa-solid fa-address-card"></i>
     </label>
     </div>

    </div>
         </div>

         <Messages 
          curFriend = {curFriend}
          scrollRef = {scrollRef}
          typingmsg={typingmsg}
         />
         <SendMessage msgHandle={msgHandle} 
          newMsg = {newMsg}
          sendMsg={sendMsg}
          setImages={setImages}
          sendEmojis={sendEmojis}
          uploadFile={uploadFile}
     
         />
         
             </div>
                    </div> 
                    <div className={`col-4 ${isChecked ? "":"hide"}`}>
                   
                          <AboutFriend curFriend={curFriend} activeUser={activeUser} />
                         
                   
           
          </div>
              
             

                </div>
           </div>
     </div>
     
  )
}

export default Rightside
