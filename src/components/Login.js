import React, {useState} from 'react'
import Sea from '../bg-video/Sea720.mp4'
import Button from '@material-ui/core/Button';
import {FormGroup, Label, Input, FormFeedback, Spinner} from 'reactstrap';
import '../App.css'

//redux stuff
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions'
import {getRealtimeConversations} from '../redux/actions/chatActions'

function Login(props) {
  
const [Email, setEmail] = useState('')
const [Password, setPassword] = useState('')


   
   const handleloginuser =(event) => {
     event.preventDefault() 
 
     const userData ={
       Email:Email,
       Password:Password
     };     
     props.loginUser(userData, props.history);
     props.getRealtimeConversations() 
    }
    
    const {UI:{loading, errors}} = props;
      return (
        <div className="login-container">
          <h2 className="login-text" >Login</h2>  
        <form onSubmit={handleloginuser} className="login-form"  noValidate >
        
      <FormGroup>
       <Label style={{color:'white', float:"left"}} for="exampleEmail">Email</Label>
        <Input invalid={errors.email || errors.error ? true : false} style={{background:'transparent', color:'white'}} type="email" name="Email" value={Email} onChange={e => setEmail(e.target.value) } id="exampleEmail" placeholder="Email" />
     <FormFeedback>{errors.email}{errors.error}</FormFeedback>
       
       <Label style={{color:'white', float:"left", marginTop:'20px'}} for="examplePassword">Password</Label>
        <Input invalid={errors.password ? true : false} style={{background:'transparent', color:'white'}}   type="password" name="Password" value={Password} onChange={e => setPassword(e.target.value)} id="examplePassword" placeholder="Password" />
        <FormFeedback >{errors.password}</FormFeedback>
      </FormGroup>
          
    <p className="general-error-text">{errors.general}</p>
         
        {loading ? <Spinner color="primary" /> :  <Button type='submit' variant="contained" color="primary" style={{textTransform:'none'}}>
        Login
        </Button>}
         </form>


       <video className="video" autoPlay loop muted>
           <source src={Sea} type="video/mp4" />
       </video>
       <div className="bg-overlay">
        </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser,getRealtimeConversations
}

export default connect(mapStateToProps, mapActionsToProps)(Login) 
