import React, { Component } from "react";
import { Alert, View, Text, TextInput } from 'react-native';
import { Button, SearchBar, Input } from 'react-native-elements'
import PasswordInputText from 'react-native-hide-show-password-input';

class RegisterPage extends Component{
    static navigationOptions = {
        title: 'Εγγραφή',
    };

    constructor(props) {
        super(props);

        this.state = {
            FirstName: "",
            LastName: "",
            email: "",
            Username: "",
            password: "",
            verPassword: "",
            BirthDate: "",
            phone: ""
        };
    }

    validateLengths() {
        if( this.state.FirstName.length == 0 ||
            this.state.LastName.length == 0 ||
            this.state.email.length == 0 ||
            this.state.Username.length == 0 ||
            this.state.password.length == 0 ||
            this.state.verPassword.length == 0 ||
            this.state.BirthDate.length == 0 ||
            this.state.phone.length == 0 ) return false;
        return true
    }

    validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    }

    validatePhone() {
        return /^\d+$/.test(this.state.phone);
    }

    validateForm() {
        return this.validateEmail() && this.validatePhone();
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
        title: 'Register',
    };

    onRegister() {
        const { FirstName, LastName, email, Username, password, verPassword, BirthDate, phone } = this.state;

        Alert.alert( 'Handled a register event with firstname: ' + FirstName + ' and lastname: ' + LastName );
    }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'stretch'}}> 
            <TextInput
            value={this.state.FirstName}
            onChangeText={(FirstName) => this.setState({ FirstName })}    
            placeholder={'Όνομα'}
            />
            <TextInput
            value={this.state.LastName}
            onChangeText={(LastName) => this.setState({ LastName })}    
            placeholder={'Επώνυμο'}
            />
            <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}    
            placeholder={'Διεύθυνση e-mail'}
            />
            <TextInput
            value={this.state.Username}
            onChangeText={(Username) => this.setState({ Username })}    
            placeholder={'username'}
            />
            <PasswordInputText
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}    
            placeholder={'Κωδικός πρόσβασης'}
            />
            <PasswordInputText
            value={this.state.verPassword}
            onChangeText={(verPassword) => this.setState({ verPassword })}    
            placeholder={'Επιβεβαίωση Κωδικού πρόσβασης'}
            />
            <TextInput
            value={this.state.birthDate}
            onChangeText={(birthDate) => this.setState({ birthDate })}    
            placeholder={'Ημερομηνία γέννησης'}
            />
            <TextInput
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}    
            placeholder={'Κινητό/Σταθερό τηλέφωνο'}
            />
            <Button
            title="Εγγραφή"
            disabled={!this.validateForm()}
            onPress={this.onRegister.bind(this)}
            />
            </View>
        );
    }
}
export default RegisterPage;
