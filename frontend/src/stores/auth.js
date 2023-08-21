import axios from "axios";
import { REGISTER_FAIL } from "./types/types";
import { REGISTER_SUCCESS } from "./types/types";
import { LOGIN_SUCCESS } from "./types/types";
import { LOGIN_FAIL } from "./types/types";
export const  UserRegister= (data)=>{
    return async (dispatch) => {
     
        try {

            const response = await axios.post('/api/messenger/register',data);
      
        localStorage.setItem('AuthToken',response.data.token);

        dispatch({
            type: REGISTER_SUCCESS,
            payload:{
                successMessage: response.data.success,
                token: response.data.token

            }
            })
        } catch (error) {
            dispatch({
                type:REGISTER_FAIL,
                payload:{
                    error:error.response.data.error.errorMessage
                }

            });
        }
    }
}
export const  UserLogin= (data)=>{
    return async (dispatch) => {
     
        try {

            const response = await axios.post('/api/messenger/login',data);
        
        localStorage.setItem('AuthToken',response.data.token);

        dispatch({
            type: LOGIN_SUCCESS,
            payload:{
                successMessage: response.data.success,
                token: response.data.token

            }
            })
        } catch (error) {
            dispatch({
                type:LOGIN_FAIL,
                payload:{
                    error:error.response.data.error.errorMessage
                }

            });
        }
    }
}

export const userLogout = ()=>async(dispatch)=>{
    try {
        const response = await axios.post('/api/messenger/user-logout');
   if(response.data.success){
    localStorage.removeItem('AuthToken');
    dispatch({
        type:'LOGOUT_SUCCESS'
    })
   }
    } catch (error) {
        
    }
    
}