import {SET_USERS} from '../types'


const initialstate = {
    users:[]
}



export default function(state = initialstate, action){
    switch(action.type){
        case SET_USERS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;    
    }
}
