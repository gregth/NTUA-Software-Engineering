import React, { Component } from "react";
import { View, Text, TextInput } from 'react-native';
import { Button, SearchBar, Input } from 'react-native-elements'

class RegisterPage extends Component{
  static navigationOptions = {
    title: 'Εγγραφή',
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <Text>E-mail</Text>
        <TextInput/>
        <Text>Username</Text>
        <TextInput/>
        <Text>Κωδικός Πρόσβασης</Text>
        <TextInput/>
        <Text>Επιβεβαίωση Κωδικού Πρόσβασης</Text>	
        <TextInput/>
        <Button
            title="Εγγραφή"
        />
      </View>
    );
  }
}
export default RegisterPage;
