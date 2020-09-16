import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import {FormGroup, Label, Input, FormFeedback,Spinner } from 'reactstrap';
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'
import {getRealtimeConversations} from '../redux/actions/chatActions'

function SignUp(props) {

const [NickName, setNickName] = useState('')
const [FirstName, setFirstName] = useState('') 
const [LastName, setLastName] = useState('')  
const [Email, setEmail] = useState('')
const [Password, setPassword] = useState('')

  

const handlesignupuser =(event) => {
  event.preventDefault() 
 
  const userData ={
    FirstName: FirstName,
    LastName: LastName,
    Email:Email,
    Password:Password,
    Handle: NickName
  };     
   
  props.signupUser(userData)
  props.getRealtimeConversations()  
      
 }
  
  
         const {UI:{loading, errors}} = props;
  return (
        <div className="signup-container">
            <h2 className="signup-text">SignUp</h2>  
            <div className="bg-overlay"></div>
        <form onSubmit={handlesignupuser} className="signup-form"  noValidate >
       
        
      
      <FormGroup>
        <Label style={{color:'white', float:"left"}} for="exampleNickName">Nick Name</Label>
        <Input  invalid={errors.handle || errors.Handle ? true : false} style={{background:'none', color:'white'}} type="text" name="NickName" value={NickName} onChange={e => setNickName(e.target.value)} id="exampleNickName" placeholder="Nick Name" />
       <FormFeedback>{errors.handle}{errors.Handle}</FormFeedback>
        
        <Label style={{color:'white', float:"left"}} for="exampleFirstNmae">First Name</Label>
        <Input  invalid={errors.FirstName? true : false} style={{background:'none', color:'white'}} type="text" name="FirstName" value={FirstName} onChange={e => setFirstName(e.target.value)} id="FirstName" placeholder="First Name" />
        <FormFeedback >{errors.FirstName}</FormFeedback>
        
        <Label style={{color:'white', float:"left"}} for="exampleLastName">Last Name</Label>
        <Input  invalid={errors.LastName ? true : false} style={{background:'none', color:'white'}} type="text" name="LastName" value={LastName} onChange={e => setLastName(e.target.value)} id="LastName" placeholder="Last Name" />
        <FormFeedback >{errors.LastName}</FormFeedback>
      
        <Label style={{color:'white', float:"left"}} for="exampleEmail">Email</Label>
        <Input invalid={errors.Email || errors.error || errors.email ? true : false} style={{background:'none', color:'white',}} type="email" name="Email" value={Email} onChange={e => setEmail(e.target.value)} id="exampleEmail" placeholder="Email" />
       <FormFeedback>{errors.Email}{errors.error}{errors.email}</FormFeedback>
      
      
        <Label style={{color:'white', float:"left"}} for="examplePassword">Password</Label>
        <Input invalid={errors.password ? true : false} style={{background:'none', color:'white'}}   type="password" name="Password" value={Password} onChange={e => setPassword(e.target.value)} id="examplePassword" placeholder="Password" />
        <FormFeedback >{errors.password}</FormFeedback>
      </FormGroup>
      
       
      <p className="general-error-text">{errors.general}</p>
         
         {loading ? <Spinner color="primary" /> :  <Button type='submit' variant="contained" color="primary" style={{textTransform:'none'}}>
         SignUp !
         </Button>}
         </form>
        
        
        </div>
    )
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
 signupUser,getRealtimeConversations
}


export default connect(mapStateToProps, mapActionsToProps)(SignUp) 
