import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


//redux-persistor
import {PersistGate} from 'redux-persist/integration/react'



//redux
import {Provider} from 'react-redux';
import store from './redux/store';

import {SET_AUTHENTICATED} from './redux/types';
import { logoutUser, getUserData,getUsers} from './redux/actions/userActions';
import {getRealtimeConversations} from './redux/actions/chatActions'

//pages
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Nav from './components/Nav';

//Router
import {
  BrowserRouter as Router,
  Switch,
  Route
 
} from "react-router-dom";


import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyByudaYbTm1uMU3j6DGtJsQ5A2zOMLNZEM", 
  authDomain: "website-react-app.firebaseapp.com",
  databaseURL: "https://website-react-app.firebaseio.com",
  projectId: "website-react-app",
  storageBucket: "website-react-app.appspot.com",
  messagingSenderId: "367944063143",
  appId: "1:367944063143:web:97139d0a65542733b72382",
  measurementId: "G-Z540TWZZJK"
};


firebase.initializeApp(firebaseConfig);

axios.defaults.baseURL='https://europe-west3-website-react-app.cloudfunctions.net/api';


let authenticated;
const token = localStorage.FBIdToken;
if(token){
const decodedToken = jwtDecode(token);
if (decodedToken.exp * 1000 < Date.now()){
  store.dispatch(logoutUser());  
  
  window.location.href = '/login'
  
  
  authenticated = false;
}else{
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common['Authorization'] = token;
  store.dispatch(getUserData());
  store.dispatch(getRealtimeConversations())
  store.dispatch(getUsers())
}

}

function App() {
  
  return (
   
    <Provider store={store}>
    <Router>
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path='/' component={Home} />
        <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
        <AuthRoute exact path="/signup" component={SignUp} authenticated={authenticated} />
      </Switch>
      </div>
      </Router>
      </Provider>
      
      
     
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  users:state.users
})




export default App;
