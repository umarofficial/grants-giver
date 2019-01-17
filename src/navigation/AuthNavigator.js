import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import ForgotId from '../screens/ForgotId';

export default (AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  ForgotId
}));
