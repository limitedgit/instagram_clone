
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack"
import Landing from "./components/auth/Landing"
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./redux/reducers"
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk));

import Main from './components/Main';
import Add from './components/main/Add';

// TODO: remove variables and use environmental
const firebaseConfig = {
  apiKey: "AIzaSyC4B_FLPiE6sBAkS1_7fHQEyYnb6goHoag",
  authDomain: "instagram-clone-da9d4.firebaseapp.com",
  projectId: "instagram-clone-da9d4",
  storageBucket: "instagram-clone-da9d4.appspot.com",
  messagingSenderId: "321782520322",
  appId: "1:321782520322:web:be4e65f56646de091be51b",
  measurementId: "G-81EQKB2248"
};




if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const stack = createStackNavigator();


export class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }
      else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const {
      loggedIn,
      loaded,
    } = this.state

    if (!loaded){
      return (
        <View style = {{
          flex: 1,
          justifyContent: 'center',
      }}>
          <Text>
            Loading...
          </Text>
        </View>
      )
    }

    if (!loggedIn) {
    return (
      <NavigationContainer>
      <stack.Navigator initialRouteName="Landing">
        <stack.Screen 
        name="Landing"
        component = {Landing}
        options = {{headerShown: false}}
        />
        <stack.Screen 
        name="Register"
        component = {Register}
        options = {{headerShown: false}}
        />
        <stack.Screen 
        name="Login"
        component = {Login}
        options = {{headerShown: false}}
        />
      </stack.Navigator>
        
    </NavigationContainer>
    )
    }

    return (
      <Provider store = {store}>
        <NavigationContainer>
      <stack.Navigator initialRouteName="Main">
        <stack.Screen 
        name="Main"
        component = {Main}
        options = {{headerShown: false}}
        />
        <stack.Screen 
        name="Add"
        component = {Add}
        />
      </stack.Navigator>
        
    </NavigationContainer>
      </Provider>
 
    )
  }
}

export default App


