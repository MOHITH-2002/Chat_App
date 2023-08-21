import React, { useEffect,useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {LogOut,PenSquare,Search} from "lucide-react"
import Friends from "./Friends/Friends"
import {useSelector } from 'react-redux';
import toast,{Toaster} from 'react-hot-toast';
import "./messanger.scss"
import {Image} from 'cloudinary-react';
import "./grid.scss"

import Rightside from './Rightside';
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { GetFriends,sendMessage,getMessages,sendImageMessage,seenMessage,updateMessage} from '../../stores/MessagesAction';
import { userLogout} from '../../stores/auth';
import  {storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useSound from 'use-sound';
import sendingSoundAlert from "../../sounds/sendtone.mp3"
import notificationSoundAlert from "../../sounds/notification.mp3"
const Messanger = () => {

     const [sendingPlaySound] = useSound(sendingSoundAlert);
     const [notificationPlaySound] = useSound(notificationSoundAlert);
     const scrollRef = useRef();
     const socket = useRef();
     const{Authenticate,myInformation} = useSelector(state => state.auth); /// auth is from in.js its a main reducer for all
     const {friends,message,sendMessagesSuccess,message_get_success} = useSelector(state => state.messenger);
     // socket
    
     const[curFriend,setCurFriend] = useState('');
     const[newMsg,setNewMsg] = useState('');
     const [typingmsg,settypingmsg]=useState('');
  
     useEffect(()=>{
          socket.current= io('http://localhost:8000');
          },[])
     useEffect(()=>{
          socket.current.emit('addUser',myInformation.id,myInformation);
     },[])
     const [socketmsg,setSocketmsg]= useState('')
     useEffect(()=>{
          
          socket.current.on("getMessageFromSocket",(data)=>{
               setSocketmsg(data);

     })
     socket.current.on("typingmsgformsocket",(data)=>{
          settypingmsg(data);
     })

     socket.current.on("seenMessageResponse",(msg)=>{
          dispatch({
               type:"SEEN_MSG_RESPONSE",
               payload:{
                    messageInfo:msg
               }
          })
     })
     socket.current.on("deliveredMessageResponse",(msg)=>{
          dispatch({
               type:"DELIVERED_MSG_RESPONSE",
               payload:{
                    messageInfo:msg
               }
          })
     })
     socket.current.on("seenALL",(data)=>{
          dispatch({
               type:"SEEN_ALL",
               payload:data
          })
     })
     },[])
    
     
    
     useEffect(()=>{
          
          if(socketmsg && curFriend){
               if(socketmsg.senderId=== curFriend._id && socketmsg.receiverId=== myInformation.id){

                    dispatch({
                         type:'SOCKET_SEND_MSG',
                         payload:{
                              message:socketmsg,
                         }
                    })
                    dispatch(seenMessage(socketmsg));
                    socket.current.emit("seenMessage",socketmsg);
                    dispatch({
                         type:'UPDATE_FRIEND_MSG',
                         payload:{
                              messageInfo:socketmsg,
                              status:'seen'
                         }
                    })
                    setSocketmsg('')
                   
               }
          }
     },[socketmsg])

     useEffect(()=>{
          if(socketmsg.senderId!== curFriend._id && socketmsg.receiverId=== myInformation.id){
               toast.success('Hi '+socketmsg.senderName+' Sent a New Message ')
          
          notificationPlaySound();
          dispatch(updateMessage(socketmsg));
          socket.current.emit('deliveredMessage',socketmsg);
          dispatch({
               type: 'UPDATE_FRIEND_MESSAGE',
               payload : {
                    msgInfo : socketmsg,
                    status:'delivered'
               }
          })
     }
     },[socketmsg])
     const [activeUser,setActiveUser] = useState([])
     useEffect(() => {
          socket.current.on('getUser',(users)=>{
               const userfilter = users.filter(u => u.userId !== myInformation.id)
               setActiveUser(userfilter)
          })
     }, []);
    const navigate = useNavigate();
    
   


    
    

    const msgHandle = (e)=>{
     setNewMsg(e.target.value);
     
     socket.current.emit("typingmsg",{
          senderId:myInformation.id,
          receiverId:curFriend._id,
          message:e.target.value
     })

}


    const sendMsg = (e)=>{
     e.preventDefault();
     sendingPlaySound();
   
     const data = {
          senderName:myInformation.userName,
          receiverId:curFriend._id,
          message:newMsg ? newMsg: ' ',
     }

    
     socket.current.emit("typingmsg",{
          senderId:myInformation.id,
          receiverId:curFriend._id,
          message:''
     })
     dispatch(sendMessage(data));
   
     setNewMsg('');
    }

    useEffect(() =>{
     if(sendMessagesSuccess){
          socket.current.emit("sendMessage",message[message.length-1]);
          dispatch({
               type:'UPDATE_FRIEND_MSG',
               payload:{
                    messageInfo:message[message.length-1]
               }
          })
          dispatch({
               type: 'MESSAGE_SEND_SUCCESS_CLEAR'
          })
     }
     

    }, [sendMessagesSuccess]);


    useEffect(() => {
     scrollRef.current?.scrollIntoView({behavior: 'smooth'}) 
 },[ message]);
 


     const sendEmojis = (emoji)=>{
          
     setNewMsg(prevInput => prevInput + emoji)
     socket.current.emit("typingmsg",{
          senderId:myInformation.id,
          receiverId:curFriend._id,
          message:emoji
     })
     
    }

    





const [images, setImages] = useState([]);

  const uploadFile = () => {
    if (!images) return;
    sendingPlaySound();
    const imageRef = ref(storage, `images/${images.name}`);

    uploadBytes(imageRef, images).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
          
        const data={
          senderName:myInformation.userName,
          receiverId:curFriend._id,
          imageFilePath: url
         }
         socket.current.emit("sendMessage",{
          senderId:myInformation.id,
          receiverId:curFriend._id,
          senderName:myInformation.userName,
          reciverName:curFriend.userName,
          message:{
               text:'',
               image:url,
          },
          time: new Date()
     })
         dispatch(sendImageMessage(data))
      });
    });



  };



   




             





    /// get friends
    const dispatch = useDispatch();

    useEffect(()=>{
    dispatch(GetFriends);
    
    },[]);

    useEffect(() => {
     dispatch(getMessages(curFriend._id));
     

 },[ curFriend?._id]);


 useEffect(() => {
     if(message.length > 0){
          if(message[message.length -1].senderId !== myInformation.id && message[message.length -1].status !== 'seen'){
               dispatch({
                    type:"UPDATE_BELL",
                    payload:{
                         id:curFriend._id
                    }
               })
               
               socket.current.emit('seen', { senderId: curFriend._id, receiverId: myInformation.id })
               dispatch(seenMessage({ _id: message[message.length -1]._id }))
         }
     }
     dispatch ({
          type: 'MESSAGE_GET_SUCCESS_CLEAR'
     })

},[ message_get_success]);

     const searchFriend = (e)=>{
          const getFriendClass = document.getElementsByClassName('hover-friend');
          const frienNameClass = document.getElementsByClassName('Fd_name');
          for (var i = 0; i < getFriendClass.length, i < frienNameClass.length; i++) {
              let text = frienNameClass[i].innerText.toLowerCase();
              if (text.indexOf(e.target.value.toLowerCase()) > -1) {
                  getFriendClass[i].style.display = '';
              } else {
                  getFriendClass[i].style.display = 'none';
              }
          }
     }


     const logout = ()=>{
        
      dispatch(userLogout())
      navigate('/');
     socket.current.emit('logout',myInformation.id);
     
         
        
          
             
     }

     useEffect(() =>{
          if(!Authenticate){
            navigate('/');
          }
    
      }, []);
     
  return (
     <div className='messenger'>
     <Toaster
  position="top-right"
  reverseOrder={false}
/>
    <div className='row'>
         <div className='col-3'>
              <div className='left-side'>
                   <div className='top'>
                        <div className='image-name'>
                            <div className='image'>
                              <a href={myInformation.image}>
                           <Image cloudName ={process.env.REACT_APP_USER_ID} publicId ={myInformation.image}/>
                           </a>
                            
                           
                            </div>
                            <div className='name'>
                           
                            <h3>{myInformation.userName}</h3>
                            </div>
                            </div>
    
                           <div className='icons'>
                                <div className='icon'>
                                <PenSquare size={20} strokeWidth={2.25} />
                                </div>
                                <div  className='icon'>
                                <LogOut onClick={logout} size={20} strokeWidth={2.5} />
                                </div>
                           </div>
                   </div>
    
                   <div className='friend-search'>
                        <div className='search'>
                        <button><Search size={20} strokeWidth={2.25} /></button>
                        <input onChange={searchFriend} type="text" placeholder='Search' className='form-control' />
                        </div>
                  </div>
                  
              


              <div className='friends'>

               {
                    friends && friends.length>0 ? friends.map((fri)=>
                     <div  key={fri.friendInfo._id} onClick={()=>setCurFriend(fri.friendInfo)} className={curFriend._id === fri.friendInfo._id ? 'hover-friend active' :'hover-friend'}>
                    <Friends friend={fri} activeUser={activeUser} curFriend={curFriend} myInformation={myInformation}/>
                    </div>)
                    :"no friends"
               }


                   
                                  


               </div>
    
              </div>
    
                    </div>
                    {
                         curFriend ?<Rightside curFriend={curFriend}
                                             msgHandle={msgHandle}
                                             newMsg={newMsg}
                                             sendMsg={sendMsg}
                                             scrollRef= {scrollRef}
                                             sendEmojis={sendEmojis}
                                             setImages={setImages}
                                             uploadFile={uploadFile}
                                             activeUser={activeUser}
                                             typingmsg={typingmsg}
                                             friends={friends}
                                            
                                          
                                            
                         />
                         :"Select a chat and start messaging"
                    }
               </div>
     
          </div>
     )
}

export default Messanger;