import React from 'react'

// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

// Icons
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Avatar from '@material-ui/core/Avatar';
//Mui stuff

import { connect } from 'react-redux';
import {logoutUser, getUsers} from '../redux/actions/userActions';
import {firestore} from 'firebase'
//

function Profile(props) {
   
    const {user:{credentials:{FirstName, LastName, Email, Handle, createdAt},loading, authenticated}} = props;
    
    
    const handleLogout = () => {
    firestore().collection('/users').doc(Handle).update({isConnected:false})  
      props.logoutUser();
        
       
  }   
    
    
    
    
    return  (
        <>
        <Button style={{color:'red',textTransform:'none'}}  onClick={handleLogout}>
        <KeyboardReturn  color="error" />LogOut
      </Button>
        <Paper className="profile-container" style={{padding:20}} >
          <div>
           
          <Avatar alt={FirstName} src="/static/images/avatar/1.jpg"  style={{height:60,width:60}}  />
            <hr />
            <div className="profile-details">
              <MuiLink
               
                to={`/users/${Handle}`}
                color="primary"
                variant="h5"
              >
                @{Handle}
              </MuiLink>
              <hr />
               <Typography variant="body2"></Typography>
              <hr />
             
               
               <AccountCircleIcon color="primary" /> <span>First Name:{FirstName}</span>
                  <hr />

                <AccountCircleIcon color="primary" /> <span>Last Name:{LastName}</span>
                  <hr />
             
              
               
                  <EmailIcon color="primary" /><span> {Email}</span>
                 
                 
                  <hr />
                  
                <small>Created: {createdAt}</small>
              </div>
            </div>
         
        </Paper>
      </>
    )  
}
 const mapStateToProps = (state) => ({
     user: state.user
     
 })

const mapActionsToProps = {
    logoutUser,getUsers
}


export default connect(mapStateToProps, mapActionsToProps)( Profile)
