import { SET_USER,SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types';

const initialstate = {
    authenticated: false,
    credentials: {}
    
 
}


export default function(state = initialstate, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialstate;
       
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                ...action.payload,
               
            }
      
            

    
        default:
            return state;
    }
}