import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import userReducer from './reducer/usereducer';
/* import {autoRehydrate} from 'redux-persist' */
import uireducer from './reducer/uireducer'
import userreducer from './reducer/usersreducer'
import messagesreducer from './reducer/messagesreducer'
/* import {persistStore} from 'redux-persist'
import {persistReducer} from 'redux-persist' */
/* import storage from 'redux-persist/lib/storage' */
/* import createEncryptor from 'redux-persist-transform-encrypt' */
const initialstate ={};


const middleware = [thunk];

/* const encryptor = createEncryptor({
    secretKey: 'root',
    onError: error => {
      // Handle the error
    }
  }) */



/* export const persistConfig = {
    key: 'root',
    storage,
    whitelist:['users'],
    transforms: [encryptor],
   
    
} */

const reducers = combineReducers({
    user: userReducer,
    UI: uireducer,
    users:userreducer,
    messages:messagesreducer 
});



//const persistedReducer =  persistReducer(persistConfig, reducers);

const store  = createStore(reducers, initialstate, composeWithDevTools(applyMiddleware(...middleware)),);

 //const persistor = persistStore(store)
 
 

 export default store;