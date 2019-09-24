import React from 'react'
import Authentication from './navigation/authentication'
import Navigator from './navigation/navigator'
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
export default class App extends React.Component {
state={
  isReady:false
}
  async componentDidMount(){
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ isReady: true });
  }
  render(){
      if (!this.state.isReady) {
        return <AppLoading />;
      }else{
        return <Navigator />
      }
  }
}
