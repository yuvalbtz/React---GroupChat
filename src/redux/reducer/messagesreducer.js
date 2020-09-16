import {SET_MESSAGES} from '../types'


const initialState = {
    messages:[]
}



export default function(state = initialState, action){
    
       switch(action.type){
        case SET_MESSAGES:
            return {
                ...state,
               ...action.payload
            }
            
        
        default:
               return state;
       }    
    


}




