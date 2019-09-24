import React from 'react'
import  {View, Text, StyleSheet} from 'react-native'
import firebase from 'firebase'
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
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
  }

  signOut = async () => {
    console.log("signout pressed");
    
    await firebase
      .auth()
      .signOut()
      .then((resp) => {this.props.navigation.navigate('AuthLoading')})
      .catch(function (error) {
        console.log(error,"error");
        
      });
  };

  render(){
    return (
      <Container>
         <Header style={{marginTop:27, paddingBottom:10}}>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button onPress={this.signOut}>
              <Text style={{color:"white"}}>signOut</Text>
            </Button>
          </Right>
        </Header>
      <Content>
        <Text>SomeText  SomeText  SomeText  SomeText  SomeText  SomeText  SomeText  SomeText  </Text>
        <Button onPress={()=>{this.props.navigation.navigate('Other')}}>
              <Text style={{color:"white"}}>Other</Text>
            </Button>


      </Content>
    </Container>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
