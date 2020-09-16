import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem} from '@material-ui/core';
import {connect} from 'react-redux'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {firestore} from 'firebase'

function Contacts(props) {
   
    
    const {users} = props;
    const {user:{credentials:{FirstName, LastName, Email, Handle, createdAt, userId},loading, authenticated}} = props;
    
    const [usersData, setUsersData] = useState([])
    
    useEffect(() => {
     firestore().collection('/users').orderBy('createdAt','asc').onSnapshot(snapshot =>{
        setUsersData(snapshot.docs.map(doc => doc.data())); 
          
      })
         
        
        },[])
  
     
    const green = '#44b700'
      const red = 'red'
    const StyledBadge = withStyles((theme) => ({
        badge: {
          
          backgroundColor:red,
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }))(Badge);
      
     
      
      const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          textAlign:'center',
          '& > *': {
            margin: theme.spacing(1),
          }
         
        },
      }));
      
      
        const classes = useStyles();
      
       


        return (
          <>
        
          <Paper className="contacts-container" >
          <div className={classes.root}>
            <List aria-label="contacts">
            {usersData.map(user =>  Handle !== user.Handle ?  <div key={user.userId} > <ListItem    className={classes.root}>
             <StyledBadge
             
             overlap="circle"
             
              
            >
             <Avatar alt={user.FirstName} src="/static/images/avatar/1.jpg" />
             <FiberManualRecordIcon  style={{fontSize:'13', color:user.isConnected ? '#44b700' : 'red', position:'absolute', bottom:-4,right:2}} />
             
              </StyledBadge>
            <Typography >{user.FirstName} {user.LastName}</Typography>
              </ListItem>
              <hr/>
              </div>
              : <></>)}
            
            

             </List>
            </div>
            </Paper>
        </>
            );
}

const mapStateToProps = (state) => ({
    user: state.user,
    users: state.users
})


export default connect(mapStateToProps)(Contacts) 
