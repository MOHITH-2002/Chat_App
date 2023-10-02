import { GET_FRIENDS_SUCCESS,GET_MESSAGES_SUCCESS,SEND_MESSAGES_SUCCESS,SOCKET_SEND_MSG } from './types/messageTypes';
import axios from 'axios';

export  const GetFriends = async (dispatch)=>{
        try {
            const response = await axios.get("https://chat-backend-u63j.onrender.com/api/messenger/get-friends");
        
            dispatch({
                type: GET_FRIENDS_SUCCESS,
                payload: response.data.friends
            })
            
            
        } catch (error) {
            console.log(error);
        }   

    }
export const sendMessage = (data) => async (dispatch) =>{
    try {
       
        const response = await axios.post("https://chat-backend-u63j.onrender.com/api/messenger/messages-sending",data);
       
        dispatch({
            type: SEND_MESSAGES_SUCCESS,
            payload : {
                message : response.data.message
           }
        })
    } catch (error) {
        console.log("Error from messageActions");
    }

}

export const getMessages =  (id)=>{
    return async (dispatch)=>{

        try {
            const response = await axios.get(`https://chat-backend-u63j.onrender.com/api/messenger/get-message/${id}`,id);
           
            dispatch({
                type: GET_MESSAGES_SUCCESS,
                payload : {
                    message : response.data.message
               }
            })
        } catch (error) {
            
        }
     
    }
}


export const sendImageMessage =  (data)=> async (dispatch)=>{
  
    try {
        const response = await axios.post(`https://chat-backend-u63j.onrender.com/api/messenger/send-image`,data);
        dispatch({
            type: SEND_MESSAGES_SUCCESS,
            payload : {
                message : response.data.message
           }
        })
    } catch (error) {
        console.log("Error from messageActions,sendimagemessage");
    }
}

export const seenMessage = (message)=> async (dispatch)=> {
    try {
        const response = await axios.post('https://chat-backend-u63j.onrender.com/api/messenger/seen-Message',message);
       
    } catch (error) {
        console.log(error);
    }
}
export const updateMessage = (message)=> async (dispatch)=> {
    try {
        const response = await axios.post('https://chat-backend-u63j.onrender.com/api/messenger/delivered',message);
       
    } catch (error) {
        console.log(error);
    }
}
