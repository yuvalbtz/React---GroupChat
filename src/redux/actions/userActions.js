import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,SET_UNAUTHENTICATED, SET_USERS} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
       dispatch({type:LOADING_UI})
        axios({method:'post', url:'/login', data:userData})
     .then(res =>{
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem('FBIdToken',FBIdToken)
      axios.defaults.headers.common['Authorization'] = FBIdToken;
     dispatch(getUserData())
     dispatch(getUsers())
     
     dispatch({type: CLEAR_ERRORS}) 
     })
     
     .catch(err => {
     dispatch({
         type:SET_ERRORS,
         payload:err.response.data
     })
      })
    }    


    export const signupUser = (userData) => (dispatch) => {
        dispatch({ type: LOADING_UI });
        axios({method:'post', url:'/signup', data:userData})
        .then(res =>{
          console.log(res.data);
          const FBIdToken = `Bearer ${res.data.token}`;
          localStorage.setItem('FBIdToken',FBIdToken)
         axios.defaults.headers.common['Authorization'] = FBIdToken;
         dispatch(getUserData())
         dispatch(getUsers())
         
         dispatch({type:CLEAR_ERRORS})
        })
        .catch(err => {
          dispatch({
              type:SET_ERRORS,
              payload: err.response.data
        })
          console.log(userData) 
         console.error(err.response.data)
         })
      };







    export const logoutUser = () => (dispatch) => {
        localStorage.removeItem('FBIdToken');
        delete axios.defaults.headers.common['Authorization'];
        dispatch({ type: SET_UNAUTHENTICATED });
         
    };


    
     export const getUserData = () => (dispatch) =>{
        axios.get('/user')
         .then(res => {
             
            dispatch({
                 type: SET_USER,
                 payload: res.data
             })
         })
     
           .catch(err => console.log(err))
        }

      
    export const getUsers = () => (dispatch) => {
        axios.get('/users')
        .then(res => {
            dispatch({
                type: SET_USERS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
    }
