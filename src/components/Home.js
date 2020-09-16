import React from 'react'
import Profile from './Profile'
import Login from '../components/Login'
import Contacts from './Contacts'
import Chat from './Chat'
import { connect } from 'react-redux';
import Tabs from './Tabs'
function Home(props) {
   
  const { authenticated } = props;
 
 
  return (
        <div>
         
        
         {authenticated ? <>
          <Tabs/>  <div className="without-tabs"> <Contacts/><Chat/><Profile/></div> </>
             : <Login/>  }
         </div>
    )
}


const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});


export default connect(mapStateToProps)(Home);
