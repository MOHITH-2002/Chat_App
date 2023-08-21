import { GET_FRIENDS_SUCCESS,GET_MESSAGES_SUCCESS,SEND_MESSAGES_SUCCESS,SOCKET_SEND_MSG} from "../types/messageTypes";


const messengerState ={ 
    friends:[],message:[],sendMessagesSuccess:false, message_get_success : false
}

export const messageReducer = (state=messengerState,action)=>{
    const{type,payload} = action;
 
    if(type=== GET_FRIENDS_SUCCESS){
        return {
        ...state,
        friends : payload
    }
}
    if(type=== GET_MESSAGES_SUCCESS){
        return {
        ...state,
        message_get_success:true,
        message : payload.message
    }
}
    if(type=== SEND_MESSAGES_SUCCESS){
        return {
        ...state,
        sendMessagesSuccess:true,
        message : [...state.message, payload.message]
    }
    
}
if(type=== 'SOCKET_SEND_MSG'){
    return {
    ...state,
    message : [...state.message, payload.message]
}
}
if(type=== 'UPDATE_FRIEND_MSG'){
    const index = state.friends.findIndex(f=>f.friendInfo._id === payload.messageInfo.receiverId || f.friendInfo._id === payload.messageInfo.senderId);
    state.friends[index].messageInfo = payload.messageInfo;
    state.friends[index].messageInfo.state = payload.status;
    return state;
}
if(type=== 'MESSAGE_SEND_SUCCESS_CLEAR'){
    return{
        ...state,
        sendMessagesSuccess:false,
    }
}
if(type=== 'SEEN_MSG_RESPONSE'){
    const index = state.friends.findIndex(f=>f.friendInfo._id === payload.messageInfo.receiverId || f.friendInfo._id === payload.messageInfo.senderId);
    state.friends[index].messageInfo.status = 'seen';
    return {...state}
}
if(type=== 'DELIVERED_MSG_RESPONSE'){
    const index = state.friends.findIndex(f=>f.friendInfo._id === payload.messageInfo.receiverId || f.friendInfo._id === payload.messageInfo.senderId);
    state.friends[index].messageInfo.status = 'delivered';
    return {...state}
}
if(type=== 'UPDATE_BELL'){
    const index = state.friends.findIndex(f=>f.friendInfo._id === payload.id);
    if(state.friends[index].messageInfo){
    state.friends[index].messageInfo.status = 'seen';
    }
    return {...state}
}
if(type === 'MESSAGE_GET_SUCCESS_CLEAR'){
    return {
         ...state,
         message_get_success : false
    }
}
if(type === 'SEEN_ALL'){
    const index = state.friends.findIndex(f=>f.friendInfo._id === payload.receiverId);
    state.friends[index].messageInfo.status = 'seen';
    return {
         ...state
    }
}
if(type==='LOGOUT_SUCCESS'){

    return{  ...state,
        friends:[],message:[],sendMessagesSuccess:false, message_get_success : false
}
}
    return state;
}