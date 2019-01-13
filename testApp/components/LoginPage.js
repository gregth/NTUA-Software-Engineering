import React, { Component } from "react";
import { Alert,View, Text, TextInput } from 'react-native';
import { Button, SearchBar, Input } from 'react-native-elements'
import PasswordInputText from 'react-native-hide-show-password-input';

class LoginPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            Username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.Username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    static navigationOptions = {
        title: 'Login',
    };

    onLogin() {
        const { Username, password } = this.state;

        Alert.alert('Credentials', `${Username} + ${password}`);
    }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'stretch'}}>
            <TextInput
            value={this.state.Username}
            onChangeText={(Username) => this.setState({ Username })}    
            placeholder={'Username'}
            />
            <PasswordInputText 
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            />
            <Button
            title="Login"
            disabled={!this.validateForm()}
            onPress={this.onLogin.bind(this)}
            />
            </View>
        );
    }
}
export default LoginPage;
