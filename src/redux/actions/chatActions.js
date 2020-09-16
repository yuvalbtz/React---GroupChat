import {SET_MESSAGES} from '../types'
import {firestore} from 'firebase'

export const getRealtimeConversations = () => {
    return async dispatch => {
        const messages =[]
        const db = firestore();
        db.collection('messages')
        .orderBy('createdAt','asc')
        .onSnapshot(snapshot =>{ 
            let changes = snapshot.docChanges();
             
             changes.forEach(change =>{
                if(change.type === 'added'){
                    messages.push({
                        msgId:change.doc.id,
                       sender:change.doc.data().sender,
                       message:change.doc.data().message,
                       createdAt:change.doc.data().createdAt
                   }); 
                   
                }
              
            })
            
            
        })
            dispatch({
                type: SET_MESSAGES,
                payload:{messages:messages} 
            })
              
            
    }}
