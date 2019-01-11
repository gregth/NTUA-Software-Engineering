import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Button, SearchBar, Input } from 'react-native-elements'

class LoginPage extends Component{
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <Text>Username</Text>
        <TextInput/>
        <Text>Password</Text>
        <TextInput/>
        <Button
            title="Login"
        />
      </View>
    );
  }
}
export default LoginPage;
