import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../components/homeScreen'
import OtherScreen from '../components/otherScreen'
import Authentication from './authentication'
import AuthLoading from './authLoading'
const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: Authentication });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);