import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';
import { firebaseConfig } from '../config'
import * as firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default class AuthLoadingScreen extends React.Component {
  constructor(){
    super()
    this.state={ 
      loggedIn:false
    }
  }
  
  componentDidMount() {
    this.verifyLogin()
    if(this.loggedIn){
      LocalAuthentication.authenticateAsync({promptMessage:"login to continue   "})
      .then(resp => {
        console.log(resp)
      })
      .catch(error => {
        console.log(resp)
      });
    }else{
      this.props.navigation.navigate('Auth')
    }
  }

  verifyLogin = async () => {
    await  firebase.auth().onAuthStateChanged(user => {
      if(user){this.setState({loggedIn:true})}
      })
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

