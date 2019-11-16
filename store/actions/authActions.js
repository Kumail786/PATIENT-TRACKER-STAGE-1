import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import ActionsTypes from './ActionsTypes'
import AsyncStorage from '@react-native-community/async-storage';

export const SignUp = (data)=>{
    console.log(data)
    try{
 return async(dispatch)=>{
   await AsyncStorage.setItem('doctor',JSON.stringify(data))
   const doctor =JSON.parse(await AsyncStorage.getItem('doctor'))
   console.log(doctor)
Actions.login()
   dispatch({
       type : ActionsTypes.SIGNUP_SUCCESS,
       payload : doctor

   })
}
}catch{
    return async(dispatch)=>{
     
        dispatch({
            type : ActionsTypes.SIGNUP_FAILED,
            payload : data.authError
     
        })
     }
}
}


export const SignIn = (data)=>{
    try{
return async(dispatch)=>{
   const name =JSON.parse(await AsyncStorage.getItem('doctor'))
   if(data.email != name.email){
       console.log("email not found")
   }
  else if(data.password != name.password){
       console.log("invalid password")
   }
   else{
       Actions.loggedIn()
        dispatch({
            type : ActionsTypes.SIGNIN_SUCCESS,
            payload : name
        })
        
        
    }}
}
catch{
    dispatch({
        type : ActionsTypes.SIGNIN_FAILED,
        payload : data.authError
    })
}}

export const logOut=()=>{
    Actions.login()
    return (dispatch)=>{
        console.log("loggingout")
        dispatch({
            type : ActionsTypes.LOGGED_OUT,
        })
    }
}

export const idGetter = (id)=>{
    console.log(id)
    return (dispatch)=>{
        dispatch({
            type : ActionsTypes.ID,
            payload : id
        })
    }
}