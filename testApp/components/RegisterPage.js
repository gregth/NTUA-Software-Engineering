import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Button, SearchBar, Input } from 'react-native-elements'

class RegisterPage extends Component{
  static navigationOptions = {
    title: 'Εγγραφή',
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <Text>E-mail</Text>
        <Text>Username</Text>
        <Text>Κωδικός Πρόσβασης</Text>
        <Text>Επιβεβαίωση Κωδικού Πρόσβασης</Text>	
        <Button
            title="Εγγραφή"
        />
      </View>
    );
  }
}
export default RegisterPage;
