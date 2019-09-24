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
  Left,
  Right,
  Icon,
  Body,
  Title,

} from 'native-base';
import * as firebase from 'firebase';


export default class Authentication extends React.Component {
  static navigationOptions = {
    header: null,
  };
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

  signUp = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.username,
          this.state.password
        );
      this.props.navigation.navigate('App');
    } catch (error) {
      console.log(error);
      Alert.alert("Error",error.message)

    }
  };

  login = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.username, this.state.password)
      this.props.navigation.navigate('AuthLoading');
    } catch (error) {
      console.log(error.message);
      
      Alert.alert('error',error.message)

    }
  };

  handleClick = (event, name) => {
    this.setState({
      [name]: event.nativeEvent.text,
    });
  };

  render = () => {
    return (
      <Container>
        <Header  style={{paddingTop:20}}>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
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
            <Text style={{ color: "white" }}>signUp</Text>
          </Button>
          <Button style={{ marginTop: 15 }} block primary onPress={this.login}>
            <Text style={{ color: "white" }}>Login</Text>
          </Button>


        </Content>
      </Container>
    );
  };
}
