import * as React from 'react';
import { Text, View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';
import * as firebase from 'firebase';

import * as LocalAuthentication from 'expo-local-authentication';
import { firebaseConfig } from '../config'


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'viveksai26@gmail.com',
      password: 'saivivek',
      compatible: false,
      fingerprints: false,
      result: '',
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Authentication',
      headerRight: (
        <Button
          onPress={navigation.getParam('signOut')}
          title="LogOut"
          color="#fff"
        />
      ),
    };
  };

  componentDidMount = async () => {
    this.props.navigation.setParams({ signOut: this.signOut });
    LocalAuthentication.authenticateAsync({promptMessage:"login to continue   "})
      .then(resp => {
        console.log(resp)
      })
      .catch(error => {
        console.log(resp)
      });
  };



  signUp = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.username,
          this.state.password
        );
      this.props.navigation.navigate('App');
    } catch (e) {
      console.log(e);

    }
  };

  login = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.username, this.state.password).then((resp) => console.log(resp)
        )
      firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        console.log(idToken,"TokenID")
      }).catch(function (error) {
        console.log(error);

      });
      // this.props.navigation.navigate('App');
    } catch (e) {
      console.log(e);
      
    }
  };



  verify = async () => {
    await  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    
  })
    // this.props.navigation.navigate('App');
  }
  

  signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then((resp) => console.log(resp,"signout"))
      .catch(function (error) {
        console.log(error,"error");
        
      });
  };

  handleClick = (event, name) => {
    this.setState({
      [name]: event.nativeEvent.text,
    });
  };

  render = () => {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                onChange={event => {
                  this.handleClick(event, 'username');
                }}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChange={event => {
                  this.handleClick(event, 'password');
                }}
              />
            </Item>
          </Form>
          <Button style={{ marginTop: 15 }} block primary onPress={this.signUp}>
            <Text style={{ color: 'white' }}> SignUp </Text>
          </Button>
          <Button style={{ marginTop: 15 }} block primary onPress={this.login}>
            <Text style={{ color: 'white' }}> Login </Text>
          </Button>
          <Button
            style={{ marginTop: 15 }} 
            block
            primary
            onPress={this.signOut}>
            <Text style={{ color: 'white' }}> signOut </Text>
          </Button>
          <Button
            style={{ marginTop: 15 }} 
            block
            primary
            onPress={this.verify}>
            <Text style={{ color: 'white' }}> verift token </Text>
          </Button>
          <Text>H  u          i</Text>
          <Text>{this.state.compatible}</Text>
          <Text>{this.state.fingerprints}</Text>
        </Content>
      </Container>
    );
  };
}
