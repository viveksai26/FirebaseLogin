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
import { Card } from 'react-native-paper';
import * as LocalAuthentication from 'expo-local-authentication';
import {firebaseConfig} from '../config'


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
    // if(LocalAuthentication.isEnrolledAsync()){
    //   Alert.alert('true')
    // }
    LocalAuthentication.authenticateAsync('login')
      .then(resp => {
        Alert.alert(JSON.stringify(resp));
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error));
      });
  };

  showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor and press scan.',
      [
        {
          text: 'Scan',
          onPress: () => {
            this.scanFingerprint();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
      ]
    );
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
      Alert.alert('Sign Up Error', JSON.stringify(e));
    }
  };

  login = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.username, this.state.password)
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  // Send token to your backend via HTTPS
  // ...
  Alert.alert(JSON.stringify(idToken))
}).catch(function(error) {
  // Handle error
});
      this.props.navigation.navigate('App');
    } catch (e) {
      Alert.alert('Login In Error', JSON.stringify(e));
    }
  };

  signOut = async () => {
    firebase
      .auth()
      .signOut()
      .then(resp => Alert.alert(JSON.stringify(resp)))
      .catch(function(error) {
        Alert.alert(JSON.stringify(error));
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
          <Text>Hui</Text>
          <Text>{this.state.compatible}</Text>
          <Text>{this.state.fingerprints}</Text>
        </Content>
      </Container>
    );
  };
}
