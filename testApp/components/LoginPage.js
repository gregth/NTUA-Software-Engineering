import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Button, SearchBar, Input } from 'react-native-elements'

class LoginPage extends Component{
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <Text>Username</Text>
        <Text>Password</Text>
        <Button
            title="Login"
        />
      </View>
    );
  }
}
export default LoginPage;
