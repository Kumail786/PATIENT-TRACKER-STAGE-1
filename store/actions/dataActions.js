import axios from 'axios'
import ActionTypes from './ActionsTypes'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'


export const getPatients = ()=>{
return async (dispatch)=>{
   const allpatients = JSON.parse(await AsyncStorage.getItem('patients'))
   Actions.patientsList()
if(allpatients){
    dispatch({
        type: ActionTypes.GET_PATIENTS,
        payload : allpatients
    })
}
else{
    dispatch({type : ActionTypes.GET_PATIENTS,payload:"No Patients Found"})
}
}
}
export const addpatient = (data)=>{
    try{

    return async(dispatch)=>{
      const patients =  await AsyncStorage.getItem('patients')
        const allpatients = patients ? JSON.parse(patients) : [];
        const id = allpatients.length
        
        console.log(allpatients)
        const patient = {
            name : data.name,
            dateOfArrival : data.dateOfArrival,
            disease : data.disease,
            id : id,
            doctorid : data.doctorid,
            history : data.history,



        }
        patient.history[0] = patient.id
        allpatients.push(patient)
        await (AsyncStorage.setItem('patients',JSON.stringify(allpatients)))
        console.log(allpatients)
dispatch({
    type : ActionTypes.ADD_PATIENT,
    payload : data
})
        
    
}
}

catch{
console.log("Error")
}
}



export const getHistory = (id)=>{
    return async(dispatch)=>{
        const patients =  JSON.parse(await AsyncStorage.getItem('patients'))
        patients && patients.map(patient=>{
            if(patient.id == id){
                const history = patient.history
                Actions.history()
                dispatch({
                    type : ActionTypes.GET_HISTORY,
                    payload : history
                })
            }
        })

    }
}

export const addrecord = (data,id)=>{
    console.log(data)
    return async(dispatch)=>{
        const patients =  JSON.parse(await AsyncStorage.getItem('patients'))
        console.log(patients)
        patients.map (async patient=>{
        console.log(patient.id)
        console.log(id)
        
            if(patient.id === id){
                console.log("ghussa")
                console.log(patient.history)
                const history = patient.history
                
                history.push(data)
               console.log(history)
                patient.history = history
                patients[id] = patient
                console.log(patient)
                console.log(history)
                const p = JSON.stringify(patients)
                
                await AsyncStorage.setItem('patients',p)
                
                const a = JSON.parse(await AsyncStorage.getItem('patients'))
                console.log(a)
            }
        })
    }
}