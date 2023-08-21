import { useNavigate } from "react-router-dom";
import { REGISTER_FAIL, REGISTER_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS } from "../types/types";
import deCodeToken from "jwt-decode";

const authState ={
    loading:true,
    Authenticate :false,
    error:'',
    success:'',
    myInformation:''
} 
const tokenDecode = (token) =>{
    const tokenDecoded = deCodeToken(token);
    const expTime = new Date(tokenDecoded.exp*1000);
    if(new Date() > expTime){
        return null;
    }
    return tokenDecoded;

}
//// if there is no user is login  we store the previous login info to db 

const getToken = localStorage.getItem('AuthToken');
if(getToken){
    const getMyinfo = tokenDecode(getToken);
    if(getMyinfo){
        authState.loading=false;
        authState.Authenticate =true;
        authState.myInformation=getMyinfo;

    }
}

export const Authreducer = (state=authState,action) =>{

    const {type,payload} = action;
    if(type===REGISTER_FAIL || type===LOGIN_FAIL){
        return {
            ...state,
            loading:true,
        Authenticate :false,
        error:payload.error,
        myInformation:''
        
        }

    }
    if(type === REGISTER_SUCCESS || type === LOGIN_SUCCESS){
        const myInfo = tokenDecode(payload.token);
        return {
            ...state,
            loading:false,
            Authenticate :true,
            success:payload.successMessage,
            myInformation:myInfo
        
        }
    }
    if(type==='LOGOUT_SUCCESS'){

      return{  ...state,
        Authenticate:false,
        myInformation:'',
        
      
    }
}
    return state;
}
