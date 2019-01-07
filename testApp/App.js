import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginPage,
    Register: RegisterPage
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(RootStack);
