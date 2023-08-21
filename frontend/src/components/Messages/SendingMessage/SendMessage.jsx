import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import "./Send.scss"
import {SendHorizonal} from 'lucide-react';
const SendMessage = (props) => {
     const {msgHandle,newMsg,sendMsg,sendEmojis,setImages,uploadFile} = props;
    
     const emojis = [
          '😀', '😃', '😄', '😁', '😆',
          '😅', '😂', '🤣', '😊', '😇',
          '🙂', '🙃', '😉', '😌', '😍',
          '😘', '😗', '😙', '😚', '😋',
          '😛', '😝', '😜', '🤪', '🤨',
          '🧐', '🤓', '😎', '🤩', '🥳',
          '😏', '😒', '😞', '😔', '😟',
          '😕', '🙁', '☹️', '😣', '😖',
          '😫', '😩', '🥺', '😢', '😭',
          '😤', '😠', '😡', '🤬', '🤯',
          '😳', '🥵', '🥶', '😱', '😨',
          '😰', '😥', '😓', '🤗', '🤔',
          '🤭', '🤫', '🤥', '😶', '😐',
          "🙋‍♂️", "🙋‍♀️","👋","👍", "👍🏻", 
          "👍🏼","👎", "👎🏻", "👎🏼","👏",
          "✌️", "✌🏻", "✌🏼", "✌🏽","👌",
           "👌🏻","✊", "✊🏻", "✊🏼", "🤘"
          ]
     
          
          
return (

   <div className='message-send-section'>
        <input type="checkbox" id='emoji' />
        
        <div className='file hover-image'>
             
             <input onChange={(event)=>{setImages(event.target.files[0])}} type='file' id='pic' className='form-control'></input>
             <button onClick={uploadFile}>submit</button>
             <label htmlFor='pic'><i class="fa-solid fa-file"></i></label>
          
        </div>
        

   <div className='message-type'>
        <input type="text" onChange={msgHandle} value={newMsg} name='message'  autoComplete="off"  id='message' placeholder='Send me a message...' className='form-control'/>
     {
          newMsg  ? <div onClick={sendMsg} className='file hover-gift'>
             
             <SendHorizonal className='sendHorizontal' />
        </div> :''
     }
        
   </div>

   <div className='file'>
   <label htmlFor='emoji'>   <i class="fa-solid fa-face-smile"></i> </label>

   </div>

   <div className='emoji-section'>
        <div className='emoji'>
             {
                  emojis.map(e =>  <span onClick={()=>sendEmojis(e)}>{e}</span>)
             }
           
               {/* <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={onEmojiClick} /> */}
        </div>

   </div>


   </div>

)
};


export default SendMessage