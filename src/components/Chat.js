import React, { useState, useEffect, useRef } from 'react'
import SendIcon from '@material-ui/icons/Send';
import {connect} from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { firestore } from 'firebase';
import ScrollToBottom from  'react-scroll-to-bottom';
import axios from 'axios'
import { parse } from 'graphql';
function Chat(props) {
    
 
    const {messages} = props;
    const [msg, setMsg] = useState('')
    const [messagesData, setMessagesData] = useState([])
    const [time, setTime] = useState('')
   
    const {user:{credentials:{FirstName, LastName, Email, Handle, createdAt, userId},loading, authenticated}} = props;
    
   


    useEffect(() => {
        setMessagesData(messages.messages)
        firestore().collection('/messages').orderBy('createdAt','asc').onSnapshot(snapshot =>{
        setMessagesData(snapshot.docs.map( doc => doc.data())); 
        
    })
  
   
   
    },[])  

   const getTime = () => {
      fetch('https://worldtimeapi.org/api/timezone/Asia/Jerusalem')
        .then(response => response.json())
        .then(data => setTime(data.datetime));
       
   }


  const handleSubmit = (e) =>{
        e.preventDefault()
        const ID = uuidv4();
        const newMessage = {
             sender: Handle,
             message: msg,
             createdAt: firestore.FieldValue.serverTimestamp(),
             msgId: ID 
            }
             
            if(newMessage.message === '') return
            firestore().collection('/messages').doc(ID).set(newMessage)
            setMsg('')
            
            }
    
     
   



    return (
        <div>
        <div className="chat-container">
        <h2 className="group-chat-title">Group - Chat</h2>
        <ScrollToBottom className="messages-container">
                <h4 style={{textAlign:'center', marginBottom:'30px'}} >Start To Chat... </h4> 
               {messagesData.map(msg =>
                    <div key={msg.msgId} className={Handle !== msg.sender ? 'yours messages' : "mine messages"}>
                    <div className="message last">
                      <strong style={{display:'block'}}>{ Handle !== msg.sender ? msg.sender: ""}</strong>
                   {msg.message}
               <small style={{display:'block', marginTop:'3px'}}></small>
                   </div>
            </div> )}
                
            </ScrollToBottom>
            
        <div className="form-container">
        <form  onSubmit={handleSubmit}>
            <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="type a message..." className="text-input"  /> <button type="submit" style={{outline:'none', borderRadius:'50%', border:'none'}} ><SendIcon style={{height:25, width:25}} className="send-icon" /></button> 
        </form>
        </div>
        </div>
        </div>  
    )
}

const mapStateToProps = state => ({
    messages: state.messages,
    user: state.user
})





export default connect(mapStateToProps)(Chat)
