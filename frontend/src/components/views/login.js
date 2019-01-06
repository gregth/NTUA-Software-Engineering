/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faKey, faHome, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies';
import { Input, InputGroupAddon, Button, Form, InputGroup, FormGroup, Label, Col } from 'reactstrap';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {isOpen: false, show: true, username: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homepage = this.homepage.bind(this);
        this.register = this.register.bind(this);
        this.showPassword = this.showPassword.bind(this);
    }
    
    homepage() {
        browserHistory.push('/');
    }
    
    register() {
        browserHistory.push('/register');
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const us = document.getElementById('username').value;
        const pass = document.getElementById('pwd').value;

        this.setState(() => ({ username: us, password: pass}));   
        if (us === '' || pass === '') {
            document.getElementById("message").innerHTML = "Συμπληρώστε όλα τα πεδία";
        }
        else {
            document.getElementById("message").innerHTML = "";
        }

        cookie.save('username', us, {path: '/'});
        fetch('http://localhost:3002/products', {
                 method: 'GET',
                 headers: {
                     Accept: 'application/json',
                     token: 1234
                 }
            })
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                 console.log(responseJson);
             })
             .catch((error) => {
                 console.error(error);
             });
         browserHistory.push('/search');
    }
    
    showPassword(event) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        var s = document.getElementById("pwd");
        
        if (s.type === "password") {
            s.type = "text";
             this.setState(() => ({ show: false}));
        } else {
            s.type = "password";
            this.setState(() => ({ show: true}));
        }
    }
  
    render() {
        return(
            <div>
                <button className="homepage" type="submit" onClick={() => this.homepage()}><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon> Αρχική Σελίδα </button>

                <Form id="login" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">
                            <FontAwesomeIcon icon={faUser} /> {' '}
                            Username:
                        </Label>
                        <div className="login">
                            <Input bsSize="sm" id="username" type="text" name="username" title="only letters, numbers and underscore" pattern="[A-Za-z0-9_]+" type="text" required/>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label for="pwd">
                            <FontAwesomeIcon icon={faKey} />{' '}
                            Password:
                        </Label>
                            <InputGroup>
                            <div className="login">
                                <Input title="8-16 no special characters" type="password" name="password" pattern="[A-Za-z0-9]{8,16}" id="pwd" required></Input>
                            </div>
                            <InputGroupAddon addonType="append">
                                <button type="eye" id="eye" onClick={this.showPassword}>
                                    { this.state.show
                                    ? <FontAwesomeIcon icon={faEye} />
                                    : <FontAwesomeIcon icon={faEyeSlash} />
                                    }
                                </button> 
                            </InputGroupAddon>
                            </InputGroup>
                    </FormGroup>
                    <span id="message"/><br/>
                    <Button type="submit" id="button1">Σύνδεση</Button>
                    <Button id="button2" onClick={() => this.register()}>Εγγραφή</Button>
               </Form>
               
           </div>
        );
  }
}

export default Login;
