import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { AppLoading } from 'expo';
import * as LocalAuthentication from 'expo-local-authentication';
import { firebaseConfig } from '../config'
import * as firebase from 'firebase';





if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      
    }
  }

  async componentDidMount() {

    try{
      this.verifyLogin()
    }catch(e){
      console.log(e)
    }
  }

  
  verifyLogin = async() => {
    try{
      console.log("verify login function");
      const userStatus = await this.checkUser()
      console.log(this.state.loggedIn)
        if(this.state.loggedIn){
          const resp = await this.fPLoginFunc()
          console.log(resp);
          if(resp.success){
            console.log("auth sucess");
            this.props.navigation.navigate('App')
          }else{
            console.log("auth fail");
            LocalAuthentication.cancelAuthenticate()
            this.props.navigation.navigate('Auth')
          }
        }else{
          this.props.navigation.navigate('Auth')
        }
         
        }catch(e){console.log(e);
        }}

  checkUser=async()=>{
    let unsubscribe = await firebase.auth().onAuthStateChanged((user)=>{
      if(user!=null){
        this.setState({
          loggedIn:true
        })
      }else{
        this.setState({
          loggedIn:false
        })
      }
      })
      unsubscribe()
  }
  fPLoginFunc =async()=>{
    let resp = await LocalAuthentication.authenticateAsync({promptMessage:"login"})
    return resp
  }

  render() 
  {
    return <AppLoading />; 
  } 
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 50,
    top: 0,
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

